import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import regStyles from "../styles/authStyle";
// import AuthInput from './AuthInput' ไม่ได้ใช้แล้ว
import { Card, Avatar, Title, Paragraph } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as AuthModel from "../../firebase/authModel";
import * as UserModel from "../../firebase/userModel";
import * as PostModel from "../../firebase/postModel";
import { addProfile } from "../../redux/authSlice";
import uuid from "react-native-uuid";
import Slideshow from "react-native-image-slider-show";
import ImageView from "react-native-image-view";
import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Fontisto,
} from "@expo/vector-icons";
// Import Upgrade Start
import MapView, { Marker, Callout } from "react-native-maps";
// Import Upgrade End
export const Inpost = ({ route, navigation }) => {
  // Var Upgrade Start
  const [myLatitude, setMyLatitude] = useState(13.121151);
  const [myLongtitude, setMyLongtitude] = useState(100.91723);
  // Var Upgrade End
  const dispatch = useDispatch();

  const Item = (props) => {
    const [user, setUser] = useState();

    const success = (doc) => {
      setUser(doc.data());
    };
    const unsuccess = (err) => {};
    useEffect(() => {
      UserModel.getUserByUsername(props.data.username, success, unsuccess);
    }, []);
    if (user) {
      return (
        <View style={styles.item}>
          <Card
            style={{
              elevation: 0,
              shadowColor: "rgba(0,0,0, .2)",
              shadowOffset: { height: 0, width: 0 },
              shadowOpacity: 5,
              shadowRadius: 20,
              width: 300,
            }}
          >
            <Card.Title
              style={{ paddingVertical: 20 }}
              title={user.firstname}
              left={() => (
                <Avatar.Image
                  size={50}
                  source={{
                    uri: user.userProfile,
                  }}
                />
              )}
            ></Card.Title>
            <Card.Content style={{ paddingTop: 10, paddingBottom: 20 }}>
              <Paragraph>{props.data.text}</Paragraph>
            </Card.Content>
          </Card>
        </View>
      );
    } else {
      return <Text>Loading</Text>;
    }
  };
  const HeaderComment = (props) => {
    const navigation = useNavigation();
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Comment");
          }}
        >
          <View
            style={{
              backgroundColor: "#3bba1e",
              width: 100,
              height: 140,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.41,
              shadowRadius: 9.11,
              elevation: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="comment-plus"
              size={50}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => <Item data={item} />;

  const RenderComment = (props) => {
    const [theArray, setTheArray] = useState([]);
    const arr_comment = [];

    useEffect(() => {
      for (const key in props.data) {
        setTheArray((prevArray) => [
          ...prevArray,
          { username: key, text: props.data[key] },
        ]);
      }
    }, []);
    return (
      <View>
        <FlatList
          data={theArray}
          renderItem={renderItem}
          keyExtractor={(item) => uuid.v4()}
          horizontal={true}
          initialNumToRender={1}
          ListHeaderComponent={HeaderComment}
          //ListFooterComponent={HeaderComment}
        />
      </View>
    );
  };
  // export const Inpost = ({ route, navigation }) => {
  const data = route.params.data.data;
  const img_arry = [];

  const [comment, setComment] = useState(data.comment);
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  data.img_name.forEach((element) => {
    img_arry.push({ url: element });
  });

  const success = (view) => {
    setViews(view);
  };
  const success_getviews = (views) => {
    setViews(views);
    PostModel.views_update(data.id, views, success);
  };
  const success_getlike = (likes) => {
    setLikes(likes);
  };
  useEffect(() => {
    PostModel.get_views(data.id, success_getviews);
    PostModel.get_likes(data.id, success_getlike);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, height: 500, borderWidth: 1 }}>
          <Slideshow dataSource={img_arry} height={500} />
        </View>
        <View
          style={{
            flex: 1,
            height: 150,

            paddingVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>
              {data.title}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ paddingHorizontal: 5 }}>
                <AntDesign name="star" size={30} color="#F9C609" />
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{likes}</Text>
              <Text
                style={{
                  paddingHorizontal: 5,
                  transform: [{ rotateY: "180deg" }],
                }}
              >
                <AntDesign name="enter" size={30} color="red" />
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{views}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ paddingHorizontal: 5 }}>
                {data.is_hot ? (
                  <FontAwesome name="sun-o" size={30} color="#EA6310" />
                ) : null}
              </Text>
              <Text style={{ paddingHorizontal: 5 }}>
                {data.is_rain ? (
                  <FontAwesome name="umbrella" size={30} color="#1C82E8" />
                ) : null}
              </Text>
              <Text style={{ paddingHorizontal: 5 }}>
                <FontAwesome name="snowflake-o" size={30} color="#33D7CD" />
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: "auto",
            width: "90%",

            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "white",
          }}
        >
          <Text style={{ padding: 20 }}>{data.details}</Text>
        </View>
        <View style={{ marginTop: 20, borderWidth: 0, flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 25, paddingLeft: 20 }}>
            ความคิดเห็น
          </Text>
          <View>
            <Fontisto name="commenting" size={20} color="black" />
          </View>
        </View>
        <RenderComment data={comment} />
        {/* Return Upgrade Start */}
        <View
          style={{
            marginTop: 20,
            borderWidth: 0,
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 25, paddingLeft: 20 }}>
            แผนที่
          </Text>
          <View>
            <MaterialCommunityIcons name="map" size={30} color="black" />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            borderWidth: 1,
            marginLeft: "auto",
            marginRight: "auto",
            width: "90%",
            height: 300,
          }}
        >
          <MapView
            style={{ width: "100%".width, height: "100%" }}
            region={{
              latitude: myLatitude,
              longitude: myLongtitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Marker
              coordinate={{ latitude: myLatitude, longitude: myLongtitude }}
            >
              <Callout>
                <Text>
                  {myLatitude} and {myLongtitude}
                </Text>
              </Callout>
            </Marker>
          </MapView>
        </View>
        <View style={{ height: 200 }}></View>
        {/* Return Upgrade End */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 10,
  },
});
