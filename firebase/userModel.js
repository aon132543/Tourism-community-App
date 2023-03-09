import firebaseApp from './connect'
import 'firebase/firestore'

const DB = firebaseApp.firestore()
const userColl =DB.collection('users')

export const getUserByUsername =(username,success,unsuccess) =>{
  userColl.where('username','==',username).get()
          .then((snapshot)=>{
            snapshot.forEach((doc)=>{
              console.log(doc.id,'=>',doc.data())
              success(doc)
            })
          })
          .catch((err)=>{
            unsuccess(err)
          })
}

export const getUserByUsername2 =(username,success,unsuccess) =>{
  userColl.where('username','==',username).get()
          .then((snapshot)=>{
            snapshot.forEach((doc)=>{
              console.log(doc.id,'=>',doc.data())
              success(doc)
            })
          })
          .catch((err)=>{
            unsuccess(err)
          })
}

export const addUserProfile = (email,profile,success,unsuccess)=>
{
  userColl.add({
    firstname:profile.firstname,
    lastname:profile.lastname,
    username:email,
  })
  .then(
    (doc)=>
    {
      success(doc.id)
    }

  )
  .catch((err) =>
  {
    
    unsuccess("addUserProfile"+err)
  })
}

export const getUserByDocumentID =(docID,success,unsuccess)=>
{
  userColl.doc(docID).get()
  .then((doc) => {
    if(doc.exists)
  {
    success(docID)
  }else{
    unsuccess("User not found")
  }
  
  })
  .catch((err) =>
  {
    unsuccess(err)
  })
  

}



export const updateImgToProfile = (id,url,success,unsuccess) =>
{
  
  const docRef = userColl.doc(id).update({userProfile:url} 
  ).then(success).catch((err)=>{
    unsuccess(unsuccess(err))
  })
}