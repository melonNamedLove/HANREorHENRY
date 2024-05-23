import { createStackNavigator } from "@react-navigation/stack";
import signinScreen from "../screens/signin-screen";
import signupScreen from "../screens/signup-screen";

//AuthStack에서 이동할 스크린 타입
export type AuthStackScreenList = {
  SignIn: undefined;
  SignUp: undefined;
};

//스택 내비게이터 생성
const Stack = createStackNavigator<AuthStackScreenList>();

//stack안에 이동할 페이지 만들어 그룹화
export default () => {
  //스택 안에 이동할 페이지를 만들어 그룹화
  //로그인 화면
  //회원가입 화면
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={signinScreen} />
      <Stack.Screen name="SignUp" component={signupScreen} />
    </Stack.Navigator>
  );
};
