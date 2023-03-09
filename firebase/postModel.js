import firebaseApp from './connect'
import 'firebase/firestore'
import uuid from "react-native-uuid";

// firebaseApp.firestore().settings({experimentalForceLongPolling: true});
const DB = firebaseApp.firestore()
// const DB = initializeFirestore({
//   experimentalForceLongPolling: true,
// });
const postColl =DB.collection('posts')

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

export const queryPost = async (success,unsuccess)=>
{
    post_obj = await postColl.get()
    
    post_obj.forEach((doc) =>
    {
        // console.log(doc.id,' => ',doc.data())
        success(doc)
    })
}

export const update_like = (id,mes,success,unsuccess) =>
{
  
  const docRef = postColl.doc(id).update({star:mes} 
  ).then(success).catch((err)=>{
    unsuccess(unsuccess(err))
  })
}

export const views_update = (id,mes,success,unsuccess) =>
{
  let viewplus = mes+1
  const docRef = postColl.doc(id).update({views:viewplus} 
  ).then(success(viewplus)).catch((err)=>{
    unsuccess(unsuccess(err))
  })
}

export const get_views =  async(id,success) =>
{
  const docRef =  await postColl.doc(id).get().then(e=>success(e.data().views)).catch((err)=>{
    unsuccess(unsuccess(err))
  })
}

export const get_likes =  async(id,success) =>
{
  const docRef =  await postColl.doc(id).get().then(e=>success(e.data().star.length)).catch((err)=>{
    unsuccess(unsuccess(err))
  })
}


export const upload =  async (pic,success,unsuccess) =>
{
  const response = await fetch(pic.uri)
  const blob = await response.blob()
  const filename = pic.uri.substring(pic.uri.lastIndexOf('/')+1)+uuid.v4()
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
  success(url)
}

export const create_post_model = (props,success) =>
{ 
  console.log(props)
  const docRef = postColl.add(props).then((doc)=>{
    console.log('สวัสดีฉันมาแล้ว')
    success(doc.id)
  })
  .catch((e) =>
  {
    console.log('error',e)
  }
  )
}

export const addImgToPost = (link,id,success) =>
{
  const docRef = postColl.doc(id).update({img_name:link} 
    ).then(success).catch((err)=>{
      unsuccess(unsuccess(err))
    })

}

export const addComment =  async(id,mes,success,unsuccess)=>
{ 

  const docRef  = await postColl.doc(id).update({comment:mes}).then(
    success("Add comment compleate!")
  ).catch((err)=>{
    unsuccess(unsuccess(err))
  })
}