import firebaseApp from './connect'
import 'firebase/auth'
import uuid from "react-native-uuid";
const auth = firebaseApp.auth()

export const signInEmailPass = (email,password,success,unsuccess) =>{
  auth.signInWithEmailAndPassword(email="thanapat.nan@ku.th","06543218")
      .then((userCredential)=>{
        // console.log(userCredential)
        let user = userCredential.user
        success(user.email)
      })
      .catch((err) =>{
        console.log('signInEmailPass Error')
        unsuccess(err.code + '' + err.message)
      })
}

export const signOut = (success,unsuccess)=>{
  auth.signOut()
      .then(()=>{
        success()
      })
      .catch((err) =>{
        console.log('signOut Error')
        unsuccess(err.code + '' + err.message)
      })
}

export const getCurrentUser =()=>{
  return auth.currentUser
}

export const changePassword = (email,oldpassword,newpassword,success,unsuccess)=>
{

  auth.signInWithEmailAndPassword(email,oldpassword)
      .then((userCredential)=>{
        let user = userCredential.user
        user.updatePassword(newpassword).then(success("You password has been Change")).catch((err) =>{
  })
      }).catch(e=>{
        unsuccess(e.code +' ' + e.message)
      })
}

export const recoverPassworld = (email,success,unsuccess) =>
{
  auth.sendPasswordResetEmail(email)
  .then(success("You passworld link to email : "+ email))
  .catch((err) =>{
    console.log('Error change passworld failed')
    unsuccess(err.code + '' + err.message)
  })

}

export const signupemailPass = (email,password,success,unsuccess) =>
{
  auth.createUserWithEmailAndPassword(email,password)
  .then((userCredential)=>{success(userCredential.user)})
  .catch((err) =>{
    console.log('signupEmailPass')
    unsuccess("SignupemailPass"+err.code + '' + err.message)
  })



}

export const upload =  async (pic,success,unsuccess,docid) =>
{
  const response = await fetch(pic)
  const blob = await response.blob()
  const filename = pic.substring(pic.lastIndexOf('/')+1)+uuid.v4()
  console.log(filename)
  var ref = firebaseApp.storage().ref().child(filename)
  var upload =ref.put(blob);
  try{
    await upload;
  }
  catch(err)
  {
    console.log(err)
  }
  const url = await ref.getDownloadURL();console.log(url)
  success(url,docid)
}