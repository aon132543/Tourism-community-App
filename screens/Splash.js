import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";
import React, { useEffect } from "react";
import * as AuthModel from "../firebase/authModel";
import { addPost } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import * as PostModel from "../firebase/postModel";
export const Splash = (props) => {
  const navigation = props.nav;
  const route = props.route;
  const BGIMG = {
    uri: "https://i.pinimg.com/originals/a3/3f/86/a33f86fcd8edba60c037318f43346c6d.jpg",
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = AuthModel.getCurrentUser();

    setTimeout(() => {
      if (!currentUser) {
        navigation.navigate("Login");
        // navigation.reset({ index: 0, routes: [{ name: "Login" }] });
      } else {
        navigation.navigate("MainDrawer");
        // navigation.reset({ index: 0, routes: [{ name: "Explore" }] });
      }
      const success = (doc) => {
        dispatch(
          addPost({
            id: doc.id,
            title: doc.data().title,
            tel: doc.data().tel,
            img_name: doc.data().img_name,
            facebook_con: doc.data().facebook_con,
            details: doc.data().details,
            is_cool: doc.data().is_cool,
            is_hot: doc.data().is_hot,
            is_rain: doc.data().is_rain,
            star: doc.data().star,
            comment: doc.data().comment,
            views: doc.data().views,
            postby:doc.data().postby,
            province:doc.data().province,
          })
        );
      };

      PostModel.queryPost(success);
    }, 1);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={BGIMG} resizeMode="cover" style={styles.welcome}>
        <View style={styles.logoBorder}>
          {/* <Image style={{ width: 150, height: 150 }} source={LOGO}></Image> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: "900",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  logoBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    top: -50,
    borderRadius: 100,
    backgroundColor: "yellow",
  },
});
