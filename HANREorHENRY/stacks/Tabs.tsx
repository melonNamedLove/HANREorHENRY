import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import home from "../screens/home";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import Profile from "../screens/profile";

//tab에서 이동 가능한 홥면 리스트
type TabStackList = {
  Main: undefined;
  Profile: undefined;
  //
};

const Stack = createBottomTabNavigator<TabStackList>();

export default () => {
  //현재 페이지 이름에 따라 아이콘 이름 반환
  const getIconName = (pageName: keyof TabStackList) => {
    switch (pageName) {
      //a.Main
      case "Main":
        return "apps-sharp";

      //b.profile
      case "Profile":
        return "person";
      default:
        return "alert-circle";
    }
  };
  return (
    <Stack.Navigator
      screenOptions={(route) => ({
        tabBarIcon: ({ focused }) => {
          const pageName = route.route.name;
          const iconName = getIconName(pageName);
          return (
            <Ionicons
              name={iconName}
              size={20}
              color={focused ? "#1274f4" : "darkgray"}
            />
          );
        },
        tabBarActiveTintColor: "#1274f4",
        tabBarInactiveTintColor: "darkgray",
      })}
    >
      <Stack.Screen
        name="Main"
        component={home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
