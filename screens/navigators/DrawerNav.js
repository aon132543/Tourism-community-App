import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import { Home } from "../Home";
import { Profile } from "../user/Profile";
import { ChangePassword } from "../auth/ChangePassword";
import { Post } from "../Post";
import { Explore } from "../Explore";
import { Option } from "../Option";

import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const ProfileScreen = ({ navigation, route }) => {
  return <Profile nav={navigation} route={route} />;
};
const ChangePasswordScreen = ({ navigation, route }) => {
  return <ChangePassword nav={navigation} route={route} />;
};

const HomeScreen = ({ navigation, route }) => {
  return <Home nav={navigation} route={route} />;
};

const PostScreen = ({ navigation, route }) => {
  return <Post nav={navigation} route={route} />;
};

const ExploreScreen = ({ navigation, route }) => {
  return <Explore nav={navigation} route={route} />;
};

const OptionScreen = ({ navigation, route }) => {
  return <Option nav={navigation} route={route} />;
};

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { getHeaderTitle } from "@react-navigation/elements";

const LOGO = {
  uri: "https://freepikpsd.com/file/2020/04/travels-and-tours-png-3-logo-free.png",
};

const CustomHeaderBar = (props) => {
  const { navigation, route, options, layout } = props;
  // console.log(options)
  const title = getHeaderTitle(options, route.name);
  return (
    <View style={{ backgroundColor: "#1F69FF" }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
          style={options.headerStyle}
        >
          <AntDesign
            name="menufold"
            size={24}
            color={options.headerTitleStyle.color}
          />

          <Text style={options.headerTitleStyle}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  const { navigation, state, descriptors } = props;
  // console.log(state.routes)
  let target = state.routes.find((obj) => {
    return obj.name === "Option";
  });

  let result = descriptors[target.key];
  let width = parseInt(result.options.drawerStyle.width * 0.5);
  let height = width;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={LOGO} style={{ width: width, height: height }} />
      </View>
      <View style={{ flex: 5 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export const DrawerNav = (props) => {
  // console.log(`Drawer Nav : stack nav = ${props.stackNav} stack route = ${props.stackRoute?.params.username}`)
  // const loginName = props.stackRoute?.params.username
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Home"
      screenOptions={{
        headerStyle: styles.headerStyle,
        drawerStyle: styles.drawerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        header: (props) => <CustomHeaderBar {...props} />,
        drawerActiveTintColor: "#1F69FF",
        drawerInactiveTintColor: "#A8A9A6",
        drawerLabelStyle: styles.drawerLabelStyle,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          drawerLabel: "Home",
          drawerIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "content-save-edit" : "content-save-edit-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: "Explore",
          drawerLabel: "Explore",
          drawerIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "content-save-edit" : "content-save-edit-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Option"
        component={OptionScreen}
        options={{
          title: "Option",
          drawerLabel: "Option",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "list-circle" : "list-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
        // initialParams={{username:loginName}}
      /> */}

      {/* <Drawer.Screen
        name="Post"
        component={PostScreen}
        options={{
          title: "Post",
          drawerLabel: "Post",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "list-circle" : "list-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
        // initialParams={{username:loginName}}
      /> */}

      <Drawer.Screen
        name="Option"
        component={OptionScreen}
        options={{
          title: "Option",
          drawerLabel: "Option",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "list-circle" : "list-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
        // initialParams={{username:loginName}}
      />

      {/* <Drawer.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: "Change password",
          drawerLabel: "Change password",
          drawerIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "content-save-edit" : "content-save-edit-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === "ios" ? 30 : Constants.statusBarHeight + 10,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F69FF",
    paddingVertical: 20,
    paddingLeft: 5,
    borderWidth: 0,
  },
  headerTitleStyle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  drawerStyle: {
    backgroundColor: "#F9FAF7",
    width: parseInt(WIDTH * 0.5),
    height: "100%",
  },
  drawerLabelStyle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#1F69FF",
    size: 30,
  },
});
