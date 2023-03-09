import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  RefreshControl,
  CheckBox,
  Platform,
} from "react-native";
//import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Avatar, Title, Paragraph } from "react-native-paper";
import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";
import * as PostModel from "../firebase/postModel";
import * as AuthModel from "../firebase/authModel";
import * as UserModel from "../firebase/userModel";
import { useNavigation } from "@react-navigation/native";

export const Explore = (props) => {
  const navigation = useNavigation();
  const route = props.route;
  const dispatch = useDispatch();

  const data = useSelector((state) => state.auths);
  const myid = data.profile.id;

  const [profile, setProfile] = useState({
    firstname: data.profile.firstname,
    lastname: data.profile.lastname,
    studentID: data.profile.studentID,
    username: data.profile.username,
  });

  const [post, setPost] = useState(data.post);
  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };
  const success = (msg) => {
    console.log(msg);
  };

  const goToSplash = () => {
    navigation.navigate("Splash");
  };

  const onSignoutPress = () => {
    console.log("Logout now");
    AuthModel.signOut(signoutSuccess, unsuccess);
  };
  const Header = () => {
    return (
      <View style={{ backgroundColor: "#1F69FF" }}>
        <View
          style={{
            height: 50,
            width: "100%",
            borderRadius: 100,
            backgroundColor: "#7ca6fc",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Post");
            }}
            style={{
              height: "100%",
              width: "100%",

              flexDirection: "row",
            }}
          >
            <View
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  marginBottom: "auto",
                  marginTop: "auto",
                }}
              >
                <Text style={{ color: "white" }}>โพสต์เนื้อหาใหม่ของคุณ</Text>
              </View>
              <View
                style={{
                  marginBottom: "auto",
                  marginTop: "auto",
                  marginLeft: 2,
                }}
              >
                <MaterialIcons name="library-add" size={24} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 10, backgroundColor: "#1F69FF" }}></View>
      </View>
    );
  };

  const footer = () => {
    return (
      <View style={{ flex: 1, height: 75, backgroundColor: "#1F69FF" }}></View>
    );
  };

  const Item = (props) => {
    const data = props.data;
    const [like, setLike] = useState(data.star.length);
    const [arrstar, setArrStar] = useState(data.star);
    const [my_like, setMy_like] = useState(data.star.includes(myid));
    //const imgs = data.img_name.map()

    const likeing = () => {
      if (arrstar.includes(myid)) {
        setMy_like(false);
      } else {
        setMy_like(true);
      }

      if (my_like) {
        setLike((e) => (e -= 1));
        setMy_like(false);
      } else {
        setLike((e) => (e += 1));
        setMy_like(true);
      }
    };
    const like_database_process = (id) => {
      let mes;
      mes = [...arrstar];

      if (arrstar.includes(myid)) {
        mes = mes.filter((e) => e != myid);
        setArrStar(mes);
      } else {
        if (mes.length == 0) {
          mes.push(myid);
          setArrStar(mes);
        }
        setArrStar([...mes, myid]);
      }
      PostModel.update_like(id, mes, likeing, unsuccess);
    };
    return (
      <View>
        <Card
          style={{
            // paddingTop: 20,
            elevation: 0,
            shadowColor: "rgba(0,0,0, .2)",
            shadowOffset: { height: 0, width: 0 },
            shadowOpacity: 5,
            shadowRadius: 20,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              console.log(data)
              navigation.navigate("Inpost", {
                data: { data },
              });
            }}
          >
            <Card.Cover
              source={{
                uri: data.img_name[0],
              }}
              style={{ flex: 1, aspectRatio: 1 }}
            ></Card.Cover>
          </TouchableOpacity>
          <Card.Title
            style={{ paddingVertical: 10 }}
            title={data.title}
            
          ></Card.Title>
          <Card.Content style={{ paddingTop: 10, paddingBottom: 20 }}>
            {/* <Title>{"My Frelicia"}</Title> */}
            <Paragraph>{data.details}</Paragraph>
          </Card.Content>
          <View
            style={{
              padding: 10,
              paddingBottom: 30,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{ flex: 2, paddingLeft: 5, flexDirection: "row" }}
              onPress={() => {
                like_database_process(data.id);
              }}
            >
              <Text style={{ paddingLeft: 5 }}>
                {my_like ? (
                  <AntDesign name="star" size={20} color="#F9C609" />
                ) : (
                  <AntDesign name="star" size={20} color="black" />
                )}
              </Text>

              <Text
                style={{
                  paddingLeft: 5,
                  top: 3,
                }}
              >
                {like}
              </Text>
            </TouchableOpacity>

            {data.is_hot ? (
              <Text style={{ textAlign: "right", paddingRight: 10 }}>
                <FontAwesome name="sun-o" size={20} color="#EA6310" />
              </Text>
            ) : (
              <Text style={{ textAlign: "right", paddingRight: 10 }}>
                <FontAwesome name="sun-o" size={20} color="black" />
              </Text>
            )}
            {data.is_rain ? (
              <Text style={{ textAlign: "right", paddingRight: 10 }}>
                <FontAwesome name="umbrella" size={20} color="#1C82E8" />
              </Text>
            ) : (
              <Text style={{ textAlign: "right", paddingRight: 10 }}>
                <FontAwesome name="umbrella" size={20} color="black" />
              </Text>
            )}
            {data.is_cool ? (
              <Text style={{ textAlign: "right", paddingRight: 10 }}>
                <FontAwesome name="snowflake-o" size={20} color="#33D7CD" />
              </Text>
            ) : (
              <Text style={{ textAlign: "right", paddingRight: 10 }}>
                <FontAwesome name="snowflake-o" size={20} color="black" />
              </Text>
            )}
          </View>
        </Card>
        <View style={{ flex: 1, height: 30 }}></View>
      </View>
    );
  };

  const renderItem = ({ item }) => <Item data={item} />;

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={post}
        renderItem={renderItem}
        keyExtractor={(item) => uuid.v4()}
        ListFooterComponent={footer}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Platform.OS === "ios" ? 0 : 20,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
