//stackNavigator생성

// import createStackNavigator from "@react-navigation/stack/lib/typescript/src/navigators/createStackNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import profile from "../screens/profile/profile-screen";
import home from "../screens/home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "./Tabs";
import CreatePost from "../screens/create-post";

//이동할 스크린 StackNavigator: type지정
export type MainStackScreenList = {
  Tabs: undefined;
  CreatePost: undefined;
};

//stacknavigator 생성
const Stack = createStackNavigator<MainStackScreenList>();

export default () => {
  //stack 안에서 이동할 스크린들 그룹화
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={"CreatePost"} component={CreatePost} options={{headerTitle:"LG VELVET"}}/>
    </Stack.Navigator>
  );
};
