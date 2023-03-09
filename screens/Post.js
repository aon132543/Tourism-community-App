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
import Slideshow from "react-native-image-slider-show";
import { useSelector, useDispatch } from "react-redux";
import * as PostModel from "../firebase/postModel";
import { Card, Avatar, Title, Paragraph } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown'
import { addProfile, Clear } from "../redux/authSlice";
import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";


import MapView, { Marker, Callout } from "react-native-maps";
import Device from "expo-device";
import * as Location from "expo-location";


export const Post = (props) => {
  const navigation = props.nav;
  const route = props.route;
  //const LOGO = { uri: 'https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png'
  const LOGO = {
    uri: "https://freepikpsd.com/file/2020/04/travels-and-tours-png-3-logo-free.png",
  };
  const [isSummer, setIsSummer] = useState(false);
  const [isRain, setIsRain] = useState(false);
  const [isWinter, setIsWinter] = useState(false);
  const [images, setImages] = useState([]);
  const arr1 = [];
  const [details, SetDetails] = useState();
  const [title, SetTitle] = useState();
  const [province,setProvince] =useState();
  

  const [myLatitude, setMyLatitude] = useState(13.121151);
  const [myLongtitude, setMyLongtitude] = useState(100.91723);


  let getnewPostID;
  const data = useSelector((state) => state.auths);
  const myid = data.profile.id;

  const img_name = [];

  const nlpwithyou = async () =>
  {
  const options = {
    method: 'GET',
    headers: {
      "Content-Type":"application/json",
      "Accept-Language":"th",
    },
  };
  let provice_arr=[]
  
  let data = await fetch('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json', options)
    .then(response => response.json())
    .then(response => {return response})
    .catch(err => console.error(err));
   data.map(e=>{provice_arr.push(e.name_th)})
   setProvince(provice_arr)
    
}
   useEffect(() => {
    nlpwithyou()
  }, []);


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
    const imgUri = images.map((image) => arr1.push({ url: image.uri }));
    //images.map((image) => console.log(image.uri));
  }, [arr1]);

  const Test = (images) => {
    return (
      <Image
        style={{ width: "100%", height: 300, borderRadius: 50 }}
        source={{ uri: "https://i.ibb.co/y4n8n20/user.jpg" }}
      />
    );
  };

  const dispatch = useDispatch();

  const [isSelected, setSelection] = useState(false);

  const success_addImgToPost = () => {
    SetDetails("");
    SetTitle("");
    setIsRain(false);
    setIsWinter(false);
    setIsSummer(false);
    setImages([]);
    dispatch(Clear());
    navigation.navigate("SplashFast");
  };

  const addImgToPost = () => {
    PostModel.addImgToPost(img_name, getnewPostID, success_addImgToPost);
  };

  const success_img = (url) => {
    img_name.push(url);
    addImgToPost();
  };
  const post_todb = () => {
    images.forEach((item) => {
      PostModel.upload(item, success_img);
    });
  };

  const success_createpost = (id) => {
    getnewPostID = id;
    post_todb();
  };
  const create_post_text = () => {
    const today = Date.now();
    const context = {
      comment: {},
      date: { today },
      details: details,
      title: title,
      is_cool: isWinter,
      is_hot: isSummer,
      is_rain: isRain,
      star: [],
      views: 0,
      postby: myid,
      province:province,
    };
    PostModel.create_post_model(context, success_createpost);
  };

  //Function upgrade start
  const getLocation = () => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      //setLocation(location);
      setMyLatitude(location.coords.latitude);
      setMyLongtitude(location.coords.longitude);
    })();
  };
  //Function upgrade end
  const mapViewCustom = (myLatitude, myLongtitude) => {
    return (
      <View>
        <MapView
          style={styles.map}
          region={{
            latitude: myLatitude,
            longitude: myLongtitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker
            draggable
            coordinate={{ latitude: myLatitude, longitude: myLongtitude }}
            onDragEnd={(e) => {
              //console.log(e.nativeEvent.coordinate);
              setMyLatitude(e.nativeEvent.coordinate.latitude);
              setMyLongtitude(e.nativeEvent.coordinate.longitude);
            }}
          >
            <Callout>
              <Text>
                {myLatitude} and {myLongtitude}
              </Text>
            </Callout>
          </Marker>
        </MapView>
      </View>
    );
  };


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
              onChangeText={(e) => SetTitle(e)}
              value={title}
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
              onChangeText={(e) => SetDetails(e)}
              value={details}
              style={{ fontSize: 25, paddingHorizontal: 20 }}
              placeholder={"อยากบอกอะไรเกี่ยวกับสถานที่"}
            ></TextInput>
          </View>
        </View>
        <SelectDropdown
        data={province}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
          setProvince(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
        search={true}
        searchPlaceHolder="ค้นหา..."
        defaultButtonText="จังหวัด"
      />
      {/* Upgrade Return Start */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              paddingVertical: 20,
              paddingLeft: 20,

              flexDirection: "row",
              marginRight: "auto",
              textAlign: "left",
            }}
          >
            <Text style={{ fontSize: 20 }}>แผนที่</Text>
            <TouchableOpacity
              style={{
                alignItems: "flex-end",
                flex: 1,
                paddingRight: 20,
              }}
              onPress={getLocation}
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

                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 20, color: "white" }}>
                  ตำแหน่งของฉัน
                </Text>
                <MaterialIcons name="my-location" size={40} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%", height: 250 }}>
            {mapViewCustom(myLatitude, myLongtitude)}
          </View>
        </View>
        {/* Upgrade Return End */}
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
        {title && details && images.length != 0 ? (
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => {
              create_post_text();
            }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              โพสต์
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.postButton, { backgroundColor: "#e8685f" }]}
            onPress={() => {
              Alert.alert("โปรดใส่ หัวข้อ, ข้อมูล และรูปภาพให้ครบ");
            }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              โพสต์
            </Text>
          </TouchableOpacity>
        )}

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
  postButton: {
    width: "50%",
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 75,
    shadowColor: "#000",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },

  map: {
    width: "100%",
    height: 250,
  },

});
