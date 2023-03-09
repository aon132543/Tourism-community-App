import React, { useState, useEffect } from 'react'
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import regStyles from "../styles/authStyle"
import AuthInput from '../auth/AuthInput'
import {useDispatch, useSelector} from 'react-redux'
import * as AuthModel from '../../firebase/authModel'
import * as UserModel from '../../firebase/userModel'
import * as PostModel from '../../firebase/postModel'

export const Profile = (props) => {

  const navigation = props.nav
  const route = props.route

  const data = useSelector((state)=>state.auths)

  const [profile, setProfile] = useState({ 'firstname': data.profile.firstname, 'lastname': data.profile.lastname, 'studentID': data.profile.studentID, 'username': data.profile.username })
  
  


  // useEffect(()=>{
  //   if(route.params?.username){
  //     console.log(`username = ${route.params?.username}`)
  //     if(authList.length > 0){
  //       let user = authList.find((item) => {
  //         console.log(`username of item: ${item.username}`)
  //         return item.username == route.params?.username
  //       })

  //       console.log(`user: ${user}`)
  //       setProfile(oldValue => ({
  //         ...oldValue,
  //         firstname:user.firstname,
  //         lastname:user.lastname,
  //         studentID:user.studentID,
  //         username:user.username

  //       }))

  //     }else{
  //       console.error('No user in the system yet!!')
  //     }
  //   }
  // },[route.params?.username,authList])
  

  const signoutSuccess = () => {
    navigation.navigate('Splash')
  }

  const unsuccess = (msg) => {
    console.log(msg)
    Alert.alert(msg)
  }

  const goToSplash = () => {
    navigation.navigate('Splash')
  }

  const onSignoutPress = () => {
    console.log('Logout now')
    AuthModel.signOut(signoutSuccess,unsuccess)
  }

  return(
    <SafeAreaView >
      <View style={{ flex: 1 }}></View>
      <View style={[{ flex: 5, marginHorizontal: 20 }, regStyles.inputContainer]}>
        {/* <AuthInput placeholder='Firstname' secureTextEntry={false} value={profile.firstname} onChangeText={() => { }} />
        <AuthInput placeholder='Lastname' secureTextEntry={false} value={profile.lastname} onChangeText={() => { }} />
        <AuthInput placeholder='StudentID' secureTextEntry={false} value={profile.studentID} onChangeText={() => { }} />
        <AuthInput placeholder='username' secureTextEntry={false} value={profile.username} onChangeText={() => { }} />
        <View style={{ flex: 2, borderWidth: 0, justifyContent: 'center' }}>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray', borderRadius: 40, marginVertical: 20 }}
            onPress={onSignoutPress}
          >
            <Text style={{ fontSize: 20 }}>Sign out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray', borderRadius: 40, marginBottom: 20 }}
            onPress={goToSplash}
          >
            <Text style={{ fontSize: 20 }}>Go to Splash</Text>
          </TouchableOpacity>
        </View> */}

      </View>
      <View style={{ flex: 2 }}></View>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:'#EEFCDC'
  },
})