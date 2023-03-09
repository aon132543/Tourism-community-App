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
import { addProfile } from "../../redux/authSlice";
import * as AuthModel from "../../firebase/authModel"
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export const Recover = (props) => {
  const navigation = props.nav;

  const [email, setEmail] = useState("");

  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };

  const success = (msg) => {
    Alert.alert(msg);
    navigation.navigate("Login");
  };

  const onSendPress = () => {
    console.log("aikdsjklahjskldhjaskldhjaslkjdhksahdljksahdjklhasjkhdjklashjkldhasjkhdjksahdjksahkjdhaskjhdjksahdjkashdkjlashdjkash")
    console.log(`Send email to ${email}`);
    AuthModel.recoverPassworld(email,success,unsuccess)    
  };
  const buttonSend =()=>
  {
    console.log('aksdjisjadikljaskldjaklsjd')

    
  }

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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Recover Password
          </Text>
        </View>

        <View style={styles.loginTextBorder}>
          <Text style={styles.headerInputBorder}>Email</Text>
          <TextInput
            style={styles.InputBorder}
            placeholder="Email"
            secureTextEntry={false}
            //value={credential.username}
            onChangeText={(text) => setEmail(text)}

            value={email}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={onSendPress} style={styles.registerButton}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Recover</Text>
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
    height: 500,
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
    paddingTop: 100,
    paddingBottom: 50,
  },
  loginTextBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
  },
  headerInputBorder: {
    fontSize: 15,
    fontWeight: "bold",
  },
  InputBorder: {
    marginLeft: "auto",
    marginRight: "auto",

    width: "100%",
    height: "30%",
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
    // marginTop: Platform.OS === "ios" ? 0 : 30,
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
