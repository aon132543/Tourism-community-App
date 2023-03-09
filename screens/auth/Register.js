import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
  Platform,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import regStyles from "../styles/authStyle";
import AuthInput from "./AuthInput";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";

import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as AuthModels from "../../firebase/authModel"
import * as UserModels from "../../firebase/userModel"
import * as PostModel from "../../firebase/postModel";

export const Register = (props) => {
  const navigation = props.nav;
  const route = props.route;

  const LOGO = { uri: "https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png" };
  const [images, setImages] = useState(null);
  const dispatch = useDispatch();
  let DocID
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    conpassword:"",

  });

  const setFirstname = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      firstname: text,
    }));
  };

  const setLastname = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      lastname: text,
    }));
  };

  const setStudentID = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      studentID: text,
    }));
  };

  const setUsername = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      username: text,
    }));
  };



  const setPassword = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      password: text,
    }));
  };


  const Setconpassword = (text) => {
    setProfile((oldValue) => ({
      ...oldValue,
      conpassword: text,
    }));
  };

  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };
  
  const allClear = ()=>
  {
    Alert.alert("ลงทะเบียนเรียบร้อยแล้ว")
    navigation.goBack()
  }

  const successAddtoImgUpload = (url,docid)=>
  {
    UserModels.updateImgToProfile(docid,url,allClear,unsuccess)
  }
  const allSuccess = (docID) => {
    AuthModels.upload(images,successAddtoImgUpload,unsuccess,docID)
    
  };

  const addToDBsuccess = (docID)=>
  {
    DocID = docID
    UserModels.getUserByDocumentID(docID,allSuccess,unsuccess)
  }

  const createusersuccess = (user) => {
    UserModels.addUserProfile(user.email,profile,addToDBsuccess,unsuccess)
  }

  const onRegisterPress = () => {
    if(profile.password !== profile.conpassword)
    { 
      Alert.alert("รหัสผ่านกับรหัสผ่านยืนยันไม่ตรงกัน")
      return;
      
    }
    console.log(images)
    AuthModels.signupemailPass(profile.username,profile.password,createusersuccess ,unsuccess)
  };

  const onCancelPress = () => {
    navigation.goBack();
  };

  const PickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // allowsMultipleSelection: true,
      // selectionLimit: 10,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);
    if (!result.cancelled) {
      setImages(result.uri);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#32a1fc" }}>
      <View style={styles.registerBorder}>
        <View style={styles.backButton}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="ios-arrow-back" size={50} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.appName}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Register</Text>
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }}
        >
          {images == null ? (
            <TouchableOpacity
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 150,
                height: 150,
                borderWidth: 5,
                borderColor: "#00b524",
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={PickImages}
            >
              <Text style={{ fontSize: 20 }}>
                <MaterialIcons
                  name="add-photo-alternate"
                  size={50}
                  color="#00b524"
                />
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 150,
                height: 150,
                borderWidth: 1,
                borderRadius: 100,
              }}
              onPress={PickImages}
            >
              {images && (
                <Image
                  source={{ uri: images }}
                  style={{ width: "100%", height: "100%", borderRadius: 100 }}
                ></Image>
              )}
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.loginTextBorder}>
          <Text style={styles.headerInputBorder}>Username</Text>
          <TextInput
            style={styles.InputBorder}
            placeholder="Username"
            secureTextEntry={false}
            //value={credential.username}
            onChangeText={(text) => setUsername(text)}
            value ={profile.username}
          ></TextInput>
          <Text style={styles.headerInputBorder}>Password</Text>
          <TextInput
            style={styles.InputBorder}
            placeholder="Password"
            secureTextEntry={true}
            value ={profile.password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
          <Text style={styles.headerInputBorder}>Confirm Password</Text>
          <TextInput
            style={styles.InputBorder}
            placeholder="Confirm password"
            secureTextEntry={true}
            value ={profile.conpassword}
            onChangeText={(text) => Setconpassword(text)}
          ></TextInput>
          <Text style={styles.headerInputBorder}>First Name</Text>
          <TextInput
            style={styles.InputBorder}
            placeholder="Firstname"
            
            value ={profile.firstname}
            onChangeText={(text) => setFirstname(text)}
          ></TextInput>
          <Text style={styles.headerInputBorder}>Last Name</Text>
          <TextInput
            style={styles.InputBorder}
            placeholder="Lastname"
            
            value ={profile.lastname}
            onChangeText={(text) => setLastname(text)}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={onRegisterPress} style={styles.registerButton}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    height: 750,
    width: "90%",
    backgroundColor: "white",
    borderBottomLeftRadius: 150,
    borderTopRightRadius: 150,
    borderTopLeftRadius: 75,
    borderBottomRightRadius: 75,
    borderWidth: 5,
    borderColor: "#3084cf",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  backButton: {
    width: 100,
    height: 100,
    borderWidth: 1,
    position: "absolute",
    borderTopLeftRadius: 65,
    borderBottomRightRadius: 75,
    borderWidth: 5,
    borderColor: "#3084cf",
    backgroundColor: "#f87171",
    alignItems: "center",
    justifyContent: "center",
  },

  appName: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 30,
    paddingBottom: 10,
  },
  loginTextBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    height: "30%",
  },
  headerInputBorder: {
    fontSize: 15,
    fontWeight: "bold",
  },
  InputBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "20%",
    paddingLeft: 20,
    borderWidth: 5,
    borderColor: "#88dd88",
    borderRadius: 50,
    fontSize: 20,
    backgroundColor: "#f5f5f5",
  },

  buttonBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    height: "10%",

    borderWidth: 1,
  },
  registerButton: {
    marginTop: Platform.OS === "ios" ? 150 : 125,
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%",
    height: "10%",
    borderWidth: 5,
    borderRadius: 100,
    backgroundColor: "white",
    borderColor: "#88dd88",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  registerButtonTextButton: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: 15,
    fontWeight: "bold",
    left: Platform.OS === "ios" ? 45 : 35,
  },
  registerBtnBorder: {
    borderWidth: 1,
    left: Platform.OS === "ios" ? 70 : 60,
    top: Platform.OS === "ios" ? 100 : 80,
    height: "30%",
    width: "200%",
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "#88dd88",
  },
});
