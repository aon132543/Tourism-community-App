import { View, Text, TouchableOpacity, Alert, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Splash } from "../Splash";
import { DrawerNav } from "./DrawerNav";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Recover } from "../auth/Recover";
import { Inpost } from "../post/Inpost";
import { Post } from "../Post";
import { SplashFast } from "../FastSplash";
import { Comment } from "../post/Comment";
const Stack = createNativeStackNavigator();

const SplashScreen = ({ navigation, route }) => {
  return <Splash nav={navigation} route={route} />;
};

const SplashFastScreen = ({ navigation, route }) => {
  return <SplashFast nav={navigation} route={route} />;
};

const LoginScreen = ({ navigation, route }) => {
  return <Login nav={navigation} route={route} />;
};

const RegisterScreen = ({ navigation, route }) => {
  return <Register nav={navigation} route={route} />;
};

const RecoverScreen = ({ navigation, route }) => {
  return <Recover nav={navigation} route={route} />;
};

const MainDrawerScreen = ({ navigation, route }) => {
  return <DrawerNav stackNav={navigation} stackRoute={route} />;
};

const InpostScreen = ({ navigation, route }) => {
  return <Inpost nav={navigation} route={route} />;
};

const PostScreen = ({ navigation, route }) => {
  return <Post nav={navigation} route={route} />;
};

const CommentScreen = ({ navigation, route }) => {
  return <Comment nav={navigation} route={route} />;
};

export const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recover"
        component={RecoverScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MainDrawer" component={MainDrawerScreen} />
      <Stack.Screen name="SplashFast" component={SplashFastScreen} />
      <Stack.Screen
        name="Inpost"
        component={InpostScreen}
        options={{
          headerShown: true,
          title: "",
          headerStyle: {
            backgroundColor: "#1F69FF",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{
          headerShown: true,
          title: "",
          headerStyle: {
            backgroundColor: "#1F69FF",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="Comment"
        component={CommentScreen}
        options={{
          headerShown: true,
          title: "Comment",
          headerStyle: {
            backgroundColor: "#1F69FF",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};
