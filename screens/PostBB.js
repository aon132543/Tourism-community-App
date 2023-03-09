import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  ImagePickerIOS,
} from "react-native";
import { Checkbox } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Card, Avatar, Title, Paragraph } from "react-native-paper";
//import Slideshow from "react-native-slideshow";
import Slideshow from "react-native-image-slider-show";
import { useSelector, useDispatch } from "react-redux";
import * as AuthModel from "../firebase/authModel";
import * as UserModel from "../firebase/userModel";
import { addProfile } from "../redux/authSlice";
import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

//import ImagePicker from "react-native-image-crop-picker";

export const Post = (props) => {
  const navigation = props.nav;
  const route = props.route;
  //const LOGO = { uri: 'https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png'
  const LOGO = {
    uri: "https://freepikpsd.com/file/2020/04/travels-and-tours-png-3-logo-free.png",
  };
  const authList = useSelector((state) => state.auths);
  console.log(`authList = ${authList}`);
  const [isSummer, setIsSummer] = useState(false);
  const [isRain, setIsRain] = useState(false);
  const [isWinter, setIsWinter] = useState(false);
  const [credential, setCredential] = useState({ username: "", password: "" });
  const [images, setImages] = useState([]);
  const arr1 = [];

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);
    if (!result.cancelled) {
      setImages(result.uri ? [result.uri] : result.selected);
    }
  };

  useEffect(() => {
    const imgUri = images.map((image) => arr1.push({ uri: image.uri }));
    //images.map((image) => console.log(image.uri));
    console.log(arr1);
  }, [images]);

  const Item = ({ item }) => (
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
        <Card.Cover
          source={{
            uri: item.uri,
          }}
          style={{ flex: 1, aspectRatio: 1 }}
        ></Card.Cover>
      </Card>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.title} />;

  const dispatch = useDispatch();

  const [isSelected, setSelection] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#F9F9F9" }}>
        <View
          style={{
            paddingTop: 20,
            paddingLeft: 20,
            marginRight: "auto",
          }}
        >
          <Text style={{ fontSize: 20 }}>ชื่อสถานที่</Text>
        </View>
        <View style={[styles.postBorder, { height: 50, paddingTop: 7.5 }]}>
          <View style={styles.postTextBorder}>
            <TextInput
              style={{ fontSize: 25, paddingHorizontal: 20 }}
              placeholder={"ชื่อสถานที่"}
            ></TextInput>
          </View>
        </View>
        <View
          style={{
            paddingTop: 20,
            paddingLeft: 20,
            marginRight: "auto",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 20 }}>รูปภาพสถานที่</Text>
          <TouchableOpacity
            style={{
              alignItems: "flex-end",
              flex: 1,
              paddingRight: 20,
            }}
            onPress={pickImages}
          >
            <View
              style={{
                borderWidth: 0,
                paddingHorizontal: 10,

                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.39,
                shadowRadius: 8.3,

                elevation: 13,
                backgroundColor: "#00B74A",
                borderRadius: 50,
                flexDirection: "row",
              }}
            >
              <AntDesign name="picture" size={40} color="white" />
              <Text
                style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
              >
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {images.length === 0 ? (
          <View></View>
        ) : (
          <View style={{ paddingVertical: 20 }}>
            {/* <Slideshow dataSource={arr1} height={300} />
             */}
            <FlatList
              data={images}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Card
                    style={{
                      width: "100%",
                      height: 300,
                    }}
                  >
                    <Card.Cover
                      source={{
                        uri: item.uri,
                      }}
                      style={{ flex: 1, aspectRatio: 1 }}
                    ></Card.Cover>
                  </Card>
                </View>
              )}
              horizontal={true}
            />
          </View>
        )}

        <View
          style={{
            paddingTop: 20,
            paddingLeft: 20,
            marginRight: "auto",
          }}
        >
          <Text style={{ fontSize: 20 }}>ข้อความของสถานที่</Text>
        </View>
        <View style={styles.postBorder}>
          <View style={styles.postTextBorder}>
            <TextInput
              multiline
              style={{ fontSize: 25, paddingHorizontal: 20 }}
              placeholder={"อยากบอกอะไรเกี่ยวกับสถานที่"}
            ></TextInput>
          </View>
        </View>
        <View>
          <View
            style={{
              paddingVertical: 20,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 20 }}>เลือกฤดูกาล</Text>
          </View>
          <View style={styles.checkBoxBorder}>
            <View style={{ paddingLeft: 10, flexDirection: "row" }}>
              <View
                style={{
                  borderWidth: 1,
                  marginTop: "auto",
                  marginBottom: "auto",
                  backgroundColor: "white",
                }}
              >
                <Checkbox
                  status={isSummer ? "checked" : "unchecked"}
                  onPress={() => {
                    setIsSummer(!isSummer);
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  paddingLeft: 10,
                }}
              >
                {isSummer ? (
                  <FontAwesome name="sun-o" size={30} color="#EA6310" />
                ) : (
                  <FontAwesome name="sun-o" size={30} color="black" />
                )}
              </Text>
            </View>
            <View style={{ paddingLeft: 10, flexDirection: "row" }}>
              <View
                style={{
                  borderWidth: 1,
                  marginTop: "auto",
                  marginBottom: "auto",
                  backgroundColor: "white",
                }}
              >
                <Checkbox
                  status={isRain ? "checked" : "unchecked"}
                  onPress={() => {
                    setIsRain(!isRain);
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  paddingLeft: 10,
                }}
              >
                {isRain ? (
                  <FontAwesome name="umbrella" size={30} color="#1C82E8" />
                ) : (
                  <FontAwesome name="umbrella" size={30} color="black" />
                )}
              </Text>
            </View>
            <View style={{ paddingLeft: 10, flexDirection: "row" }}>
              <View
                style={{
                  borderWidth: 1,
                  marginTop: "auto",
                  marginBottom: "auto",
                  backgroundColor: "white",
                }}
              >
                <Checkbox
                  status={isWinter ? "checked" : "unchecked"}
                  onPress={() => {
                    setIsWinter(!isWinter);
                  }}
                />
              </View>
              <Text
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  paddingLeft: 10,
                }}
              >
                {isWinter ? (
                  <FontAwesome name="snowflake-o" size={30} color="#33D7CD" />
                ) : (
                  <FontAwesome name="snowflake-o" size={30} color="black" />
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* <FlatList
          data={images}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Card
                style={{
                  width: "100%",
                  height: 300,
                }}
              >
                <Card.Cover
                  source={{
                    uri: item.uri,
                  }}
                  style={{ flex: 1, aspectRatio: 1 }}
                ></Card.Cover>
              </Card>
            </View>
          )}
          horizontal={true}
        /> */}

        <View style={{ height: 500 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  postBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    height: 200,
    width: "90%",
    backgroundColor: "white",
    marginTop: 20,
  },
  postTextBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    height: "100%",
    borderWidth: 0,
  },
  checkBoxBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
  },
});
