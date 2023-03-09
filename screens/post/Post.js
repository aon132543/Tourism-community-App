import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import regStyles from "../styles/authStyle";
import AuthInput from "../auth/AuthInput";
import { useDispatch, useSelector } from "react-redux";
import * as AuthModel from "../../firebase/authModel";
import * as UserModel from "../../firebase/userModel";
import * as PostModel from "../../firebase/postModel";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { editStar } from "../../redux/authSlice";
import uuid from "react-native-uuid";

export const Post = (props) => {
  const navigation = props.nav;
  const route = props.route;
  const dispatch = useDispatch();

  const data = useSelector((state) => state.auths);
  const myid = data.profile.id;

  const [profile, setProfile] = useState({
    firstname: data.profile.firstname,
    lastname: data.profile.lastname,
    studentID: data.profile.studentID,
    username: data.profile.username,
  });


  const [post, setPost] = useState(data.post);

  // useEffect(() => {
  //   const func = async () => {
  //     const storage = getStorage();
  //     const reference = ref(storage, "/b2.jpg");
  //     await getDownloadURL(reference).then((x) => {
  //       setUrl(
  //         "https://firebasestorage.googleapis.com/v0/b/week10-f4477.appspot.com/o/b2.jpg?alt=media&token=3d8261af-d4b9-4f35-9e8d-92016c35961d"
  //       );
  //     });
  //   };
  //   func();
  // }, []);

  const checkLike = (star) => {
    is_like = star.some((e) => e == myid);
    if (is_like) {
      return true;
    }
    return false;
  };

  const like_star = (id) => {
    dispatch(editStar({ postid: id, myid: myid }));
  };
  const signoutSuccess = () => {
    navigation.navigate("Splash");
  };

  const unsuccess = (msg) => {
    Alert.alert(msg);
  };
  const success = (msg) =>
  {
    console.log(msg);
  }

  const goToSplash = () => {
    navigation.navigate("Splash");
  };

  const onSignoutPress = () => {
    AuthModel.signOut(signoutSuccess, unsuccess);
  };

  const Card_Post = (props) => {
    element = props.data
    const [like,setLike] = useState(element.star.length)
    const [my_like,setMy_like] = useState(element.star.includes(myid))

    const likeing = () =>
    {
      if(my_like)
      {
        setLike(e=>e -= 1)
        setMy_like(false)
      }
      else{
        setLike(e=>e +=1)
        setMy_like(true)
      }

    }
    const like_database_process = (id) =>
    {
      mes = element.star
      if(element.star.includes(myid))
      {
        mes = mes(item => item != id)   
      }else{
        mes = mes.push(id)
      }
      PostModel.update_like(id,mes,likeing,unsuccess);

    }
      return(
        <View style={{ flex: 1 }} key={(key = element.id)}>
        {element.img_name.map((imgs) => (
          <Image
            key={uuid.v4()}
            style={{ height: "20%", width: "20%" }}
            source={{ uri: imgs }}
          />
        ))}
        <Text key={uuid.v4()}>
          {element.is_rain ? "หน้าฝน" : "ไม่สามารถหน้าฝน"}
          {element.is_hot ? "หน้าร้อน" : "ไม่สามารถหน้าร้อน"}
          {"\n"} {element.is_cool ? "หน้าหนาว" : "ไม่สามารถหน้าหนาว"}
        </Text>
 {element.title} {element.tel} {"\n"} {element.facebook_con}{" "}        <Text>
         
          ข้อมูลมาครบ แต่หน้าแสดงไม่พอนะ
        </Text>
        <Text>{element.detail}</Text>
        <TouchableOpacity
          style={{ borderWidth: 1, borderBottomColor: "black" }}
          onPress={() => {
            like_database_process(element.id)
          }}
        >
          <Text>
            {" "}
            {my_like
              ? "กดแล้ว ใส่รูปดาว"
              : "ยังไม่กด ใส่รูปดาว"}
            ดวงดาว X {like}
          </Text>
        </TouchableOpacity>
      </View>
    )
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {post.map((element) => (
        <Card_Post data={element}></Card_Post>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEFCDC",
  },
});
