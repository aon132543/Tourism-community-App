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
import * as PostModel from "../../firebase/postModel";
import { Card, Avatar, Title, Paragraph } from "react-native-paper";

import { addProfile, Clear,UpdateComment } from "../../redux/authSlice";
import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

export const Comment = (props) => {
  const navigation = props.nav;
  const route = props.route;
  //const LOGO = { uri: 'https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png'
  const data_myid = useSelector((state) => state.auths);
  const username = data_myid.profile.username;
  const [details,setDetails] = useState()
  const dispatch = useDispatch()
  const data = route.params.order_id;

  const [objectComment,setObjectComment] = useState()
  
  let obj
  const unsuccess = (mes) =>
  {
    Alert.alert(mes)
  }
  const success =(mes)=>{
    Alert.alert(mes)
    let update={
      id:data.props.id,
      comment:obj
    }
    dispatch(UpdateComment(update))
    let item = data.props
    console.log("ITEM",item)
    let username2 = username.toString();
    obj2 ={}
    obj2[username2] = details

    console.log("OBJECTS",obj)
    item = {...item,comment:obj}
    console.log("Item Update",item)
    navigation.navigate("Explore", {


    })



  }
  const addCommentDB =()=>
  {  
    
    if(Object.keys(data.props.comment).length !== 0)
    {
      obj = JSON.parse(JSON.stringify(data.props.comment))

      let username2 = username.toString();
      objnew ={}
      objnew[username2] = details

      Object.assign(obj,  objnew);
     
    }
    else{
      let username2 = username.toString();
      obj ={}
      obj[username2] = details
      
    }
    

    PostModel.addComment(data.props.id,obj,success,unsuccess)
  }
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
          <Text style={{ fontSize: 20 }}>ข้อความแสดงความคิดเห็น</Text>
        </View>
        <View style={styles.postBorder}>
          <View style={styles.postTextBorder}>
            <TextInput
              multiline
              onChangeText={(e) => setDetails(e)}
              value={details}
              style={{ fontSize: 25, paddingHorizontal: 20 }}
              placeholder={"อยากแสดงความคิดเห็นอะไรบ้าง"}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.postButton]}
          onPress={addCommentDB}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
          >
            แสดงความคิดเห็น
          </Text>
        </TouchableOpacity>

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
    width: "70%",
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
});
