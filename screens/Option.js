import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import regStyles from "../styles/authStyle";
// import AuthInput from "../auth/AuthInput";
import { useSelector } from "react-redux";
import * as AuthModel from "../firebase/authModel";
import * as UserModel from "../firebase/userModel";

export const Option = (props) => {
  const navigation = props.nav;
  const route = props.route;

  const [password,SetPassword] = useState("")
  const [conpassword,Setconpassword] = useState("")
  const [oldpassword,Setoldpassword] = useState("")
  const data = useSelector((state) => state.auths);
  const [profile, setProfile] = useState({
    firstname: data.profile.firstname,
    lastname: data.profile.lastname,
    studentID: data.profile.studentID,
    username: data.profile.username,
  });

  const signoutSuccess = () => {
    navigation.navigate("Splash");
  };

  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };

  const goToSplash = () => {
    navigation.navigate("Splash");
  };

  const onSignoutPress = () => {
    console.log("Logout now");
    AuthModel.signOut(signoutSuccess, unsuccess);
  };
  const success =(msg)=>
  {
    alert(msg)

  }
  const onchangepassword =()=>
  {
    if(password ==""|| conpassword =="")
    {
      alert("password cannot be null or you didn't fill it out ")
      return
    }
    else if(password==conpassword)
    {
      AuthModel.changePassword(profile.username,oldpassword,password,success,unsuccess)
      return
    }
    
    else{
      alert("password and password confirm don't match")
      return
    }
    
  }
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        scrollIndicatorInsets={{ right: 1 }}
      >
        <View style={styles.viewProfileBorder}>
          <Text style={styles.borderHeader}>Change Profile</Text>
          <View style={styles.eachInputBorder}>
            <Text style={styles.headerInputBorder}>Display Name</Text>
            <TextInput
              style={styles.inputBorder}
              placeholder="Input Text"
              secureTextEntry={false}
            ></TextInput>
          </View>
          <View style={styles.eachInputBorder}>
            <Text style={styles.headerInputBorder}>Firstname</Text>
            <TextInput
              style={styles.inputBorder}
              placeholder="Input Text"
              secureTextEntry={false}
            ></TextInput>
          </View>
          <View style={styles.eachInputBorder}>
            <Text style={styles.headerInputBorder}>Lastname</Text>
            <TextInput
              style={styles.inputBorder}
              placeholder="Input Text"
              secureTextEntry={false}
            ></TextInput>
          </View>
          <View style={styles.eachInputBorder}>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveText}>Save Profile</Text>
            </TouchableOpacity>
          </View>

          {/* <AuthInput
          placeholder="Firstname"
          secureTextEntry={false}
          value={profile.firstname}
          onChangeText={() => {}}
        />
        <AuthInput
          placeholder="Lastname"
          secureTextEntry={false}
          value={profile.lastname}
          onChangeText={() => {}}
        />
        <AuthInput
          placeholder="StudentID"
          secureTextEntry={false}
          value={profile.studentID}
          onChangeText={() => {}}
        />
        <AuthInput
          placeholder="username"
          secureTextEntry={false}
          value={profile.username}
          onChangeText={() => {}}
        />
        <View style={{ flex: 2, borderWidth: 0, justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "gray",
              borderRadius: 40,
              marginVertical: 20,
            }}
            onPress={onSignoutPress}
          >
            <Text style={{ fontSize: 20 }}>Sign out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "gray",
              borderRadius: 40,
              marginBottom: 20,
            }}
            onPress={goToSplash}
          >
            <Text style={{ fontSize: 20 }}>Go to Splash</Text>
          </TouchableOpacity>
        </View> */}
        </View>
        <View style={{ height: 50 }}></View>
        <View style={styles.viewChangePasswordBorder}>
          <Text style={styles.borderHeader}>Change Password</Text>
          <View style={styles.eachInputBorder}>
            <Text style={styles.headerInputBorder}>Old Password</Text>
            <TextInput
              value={oldpassword}
              onChangeText={(e)=>{Setoldpassword(e)}}
              style={styles.inputBorder}
              placeholder="old password"
              secureTextEntry={true}
            ></TextInput>
          </View>
          <View style={styles.eachInputBorder}>
            <Text style={styles.headerInputBorder}>New Password</Text>
            <TextInput
              value={password}
              style={styles.inputBorder}
              placeholder="new password"
              secureTextEntry={true}
              onChangeText={(e)=>SetPassword(e)}
            ></TextInput>
          </View>
          <View style={styles.eachInputBorder}>
            <Text style={styles.headerInputBorder}>Confirm New Password</Text>
            <TextInput
              value ={conpassword}
              style={styles.inputBorder}
              placeholder="Confirm newpassword"
              secureTextEntry={true}
              onChangeText={(e)=>Setconpassword(e)}
            ></TextInput>
          </View>
          <View style={styles.eachInputBorder}>
            <TouchableOpacity onPress={onchangepassword} style={styles.saveButton}>
              <Text style={styles.saveText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 50 }}></View>
        <View style={styles.viewLogoutBorder}>
          <Text style={styles.borderHeader}>Log Out</Text>

          <View style={styles.eachInputBorder}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={onSignoutPress}
            >
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  borderHeader: {
    bottom: 10,
    width: "70%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 50,
    backgroundColor: "white",
  },
  viewProfileBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    top: 30,
    width: "90%",
    height: 550,
    backgroundColor: "#EDEDED",
  },
  eachInputBorder: { paddingTop: 50 },

  headerInputBorder: {
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 15,
    bottom: 10,
  },
  inputBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomWidth: 3,
    paddingLeft: 10,
    top: 5,
    fontSize: 25,
    width: "95%",
    backgroundColor: "#F0F0F0",
  },
  saveButton: {
    marginLeft: "auto",
    marginRight: "auto",
    top: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ABABAB",
    width: "90%",
    backgroundColor: "white",
  },
  saveText: { marginLeft: "auto", marginRight: "auto", fontSize: 30 },
  viewChangePasswordBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    top: 30,
    width: "90%",
    height: 550,
    backgroundColor: "#EDEDED",
  },
  viewLogoutBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    top: 30,
    width: "90%",
    height: 200,
    backgroundColor: "#EDEDED",
  },
  logoutButton: {
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ABABAB",
    width: "90%",
    backgroundColor: "white",
  },
  logoutText: { marginLeft: "auto", marginRight: "auto", fontSize: 30 },
});
