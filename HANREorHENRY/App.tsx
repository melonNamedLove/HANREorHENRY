import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import home from "./screens/home";
import detail from "./screens/profile/profile-screen";
import signinScreen from "./screens/signin-screen";
import signupScreen from "./screens/signup-screen";
import { auth } from "./firebaseConfig";
import { useEffect, useState } from "react";
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";
import * as Firebase from "firebase/auth";
import LoadingScreen from "./screens/loading-screen";

const Stack = createStackNavigator();

export default function App() {
  //user정보
  const [user, setUser] = useState<Firebase.User | null>();

  //loading state
  const [loading, setLoading] = useState(true);

  //useEffect    lifecycle
  // 화면이 맨 처음 표시될 때 1번(필수)
  // 화면이 닫힐 때 1번(옵셔널)
  // 특정 조건이 변겨오딜 때마다 매번(옵셔널))

  // useEffect(()=>{
  //   inputcode
  // },[])

  //app.tsx가 실행될 때 with useEffect 훅 사용
  useEffect(() => {
    //User가 로그인 되었는지 안되었는지, 항시 체크
    console.log("1. 로그인 됐는지 확인중이에용가리...!");

    auth.onAuthStateChanged((userState: Firebase.User | null) => {
      //로그인 여부에 따라 그룹을 각각 보여줌
      //a.로그인되어있음
      if (userState) {
        console.log("2-a. 로그인 되어있음!");
        //event listener
        setUser(userState);
      }
      //b.로그인 안되어있음
      else {
        console.log("2-b로그인 안되어있음 or 로그아웃");
        setUser(null);
      }
      //로그인 여부 파악 끝나면 로딩 off
      setLoading(false);
    });
  }, []);
  const LoadingProcess = <LoadingScreen />;
  const AuthProcess = auth.currentUser ? <MainStack /> : <AuthStack />;

  return (
    //MainStack :로그인 yes>이동할스크린 모음
    //MainStack :로그인 no>이동할스크린 모음{/*삼항도 중첩 가능*/}
    <NavigationContainer>
      {loading ? LoadingProcess : AuthProcess}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
