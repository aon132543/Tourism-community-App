import React,{useState} from 'react'
import {View, Text, Image,TouchableOpacity, Alert,StyleSheet, TextInput,Platform} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import regStyles from '../styles/authStyle'
// import AuthInput from './AuthInput' ไม่ได้ใช้แล้ว
import {useSelector,useDispatch} from 'react-redux'
import * as AuthModel from '../../firebase/authModel'
import * as UserModel from '../../firebase/userModel'
import {addProfile} from '../../redux/authSlice'

export const Login = (props) => {
  const navigation = props.nav
  const route = props.route
  //const LOGO = { uri: 'https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png' 
  const LOGO = {
    uri: "https://freepikpsd.com/file/2020/04/travels-and-tours-png-3-logo-free.png",
  };
  const authList = useSelector((state)=>state.auths)
  console.log(`authList = ${authList}`)

  const [credential,setCredential] = useState({username:'',password:''})
  
  const setUsername = (text) => {
    setCredential(oldValue => ({
      ...oldValue,
      username:text
    }))
  }

  const setPassword = (text) => {
    setCredential(oldValue => ({
      ...oldValue,
      password:text
    }))
  }
  
  const dispatch = useDispatch()

  const success = (doc) => {
    let profile_state = {
      'id' : doc.id,
      'firstname' : doc.data().firstname,
      'lastname' : doc.data().lastname,
      'studentID' : doc.data().studentID,
      'username' : doc.data().username
    }
    dispatch(addProfile(profile_state))
    navigation.navigate({
      name:'MainDrawer',
      params: {
        username:doc.data().username
      }
    })
  }
  const signInSuccess = (username)=>{
    console.log('sign in success user = ',username)
    UserModel.getUserByUsername(username,success,unsuccess)
  }

  const unsuccess = (msg) => {
    console.log(msg)
    Alert.alert(msg)
  }

  const onSignInPress = () => {
    AuthModel.signInEmailPass(credential.username,credential.password,signInSuccess,unsuccess)
    
  }

  const onSignUpPress = () => {
    navigation.push('Register')
  }

  const onForgotPress = () => {
    navigation.push('Recover')
  }

  return(
   <View style={{ flex: 1, backgroundColor: "#88dd88" }}>
      <View style={styles.loginBorder}> 
        <View style={styles.logoBorder}>
          <Image style={{ width: 150, height: 150 }} source={LOGO}></Image>
        </View>
        <View style={styles.appName}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Application Name
          </Text>
        </View>
        <View style={styles.loginTextBorder}>
          <Text style={styles.headerInputBorder}>Username</Text>
          <TextInput
            style={styles.usernameInputBorder}
              placeholder="Username"
              secureTextEntry={false}
              value={credential.username}
              onChangeText={(text) => setUsername(text)}
          ></TextInput>
          <Text style={styles.headerInputBorder}>Password</Text>
          <TextInput
            style={styles.passwordInputBorder}
             placeholder="Password"
              secureTextEntry={true}
              value={credential.password}
              onChangeText={(text) => setPassword(text)}
          ></TextInput>
            <View style={{ flexDirection: "row-reverse" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.push("Recover");
              }}
            >
              <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonBorder}>
          <View>
            <TouchableOpacity style={styles.registerBorder} onPress={onSignUpPress}>
              <Text style={styles.registerButtonTextButton}>REGISTER</Text>
            </TouchableOpacity>
            <View style={styles.backgroundOfLogin}>
              <TouchableOpacity 
                style={styles.loginButtonBorder}
                onPress={onSignInPress}>
                <Text style={styles.loginTextButton}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  loginBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    height: "60%",
    width: "80%",
    backgroundColor: "white",
    borderBottomLeftRadius: 150,
    borderTopRightRadius: 150,
    borderTopLeftRadius: 75,
    borderBottomRightRadius: 75,
    borderWidth: 5,
    borderColor: "#3084cf",
  },
  logoBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    top: -50,
    borderRadius: 100,
    backgroundColor: "yellow",
  },
  appName: {
    marginLeft: "auto",
    marginRight: "auto",
    bottom: 20,
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
  usernameInputBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "30%",
    paddingLeft: 20,
    borderWidth: 5,
    borderColor: "#88dd88",
    borderRadius: 50,
    fontSize: 25,
    backgroundColor: "#f5f5f5",
  },
  passwordInputBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "30%",
    paddingLeft: 20,
    borderWidth: 5,
    borderColor: "#88dd88",
    borderRadius: 50,
    fontSize: 25,
    backgroundColor: "#f5f5f5",
  },
  buttonBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    height: "30%",
    top: 5,
    flexDirection: "row",
  },
  loginButton: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    left: 55,
    height: "83%",
    width: "50%",
    borderRadius: 100,
    borderColor: "#88dd88",
    borderWidth: 5,
    backgroundColor: "white",
  },
  loginTextButton: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: 25,
    fontWeight: "bold",
  },
  backgroundOfLogin: {
    backgroundColor: "white",
    left: 20,
    top: -40,
    height: Platform.OS === "ios" ? "100%" :"90%",
    width: "150%",
    borderRadius: 100,
    borderColor: "#88dd88",
    borderWidth:1
  },
  loginButtonBorder: {
    height:  "100%" ,
    width: "100%",
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "#88dd88",
    //backgroundColor: "#03c2fc",
  },
  registerButton: {
    left: 0,
    top: Platform.OS === "ios" ? 100 :50,
    width: "80%",
    height: "20%",
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "#88dd88",
 
  },
  registerButtonTextButton: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: 15,
    fontWeight: "bold",
    left: Platform.OS === "ios" ? 45 :35,
  },
  registerBorder: {
    borderWidth: 1,
    left: Platform.OS === "ios" ? 70 :60,
    top: Platform.OS === "ios" ? 100 :80,
    height: "30%",
    width: "200%",
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "#88dd88",
    //backgroundColor: "#fcba03",
  },
  forgotPassword: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
