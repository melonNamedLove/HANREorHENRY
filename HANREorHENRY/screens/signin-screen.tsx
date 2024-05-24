import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  Keyboard,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";
import { StackNavigationProp } from "@react-navigation/stack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackScreenList } from "../stacks/AuthStack";

const Container = styled(ImageBackground)`
  justify-content: center;
  align-items: center;
  background-color: #c07474;
  flex: 1;
`;
const Title = styled(Text)`
  font-size: 15px;
  font-weight: 700;
  color: #750f47;
  margin-bottom: 10px;
`;

const SignBox = styled(View)`
  background-color: #fff;
  width: 80%;
  height: 60%;
  padding: 20px;
  border-radius: 20px;
`; //border-radius = 테두리의 반지름
const LogoImg = styled(Image)`
  width: 100%;
  height: 30%;
`;

//text  input (id/pw)
const InputField = styled(View)`
  //background-color: aqua;
  padding: 3px;
`;
const UserID = styled(TextInput)`
  background-color: #efeded;
  margin-bottom: 7px;
  font-size: 20px;
  padding: 5px 10px;
`; //        상하 좌우
const UserPW = styled(UserID)``;
//footer(signin btn, create account)
const Footer = styled(View)`
  margin-top: 15px;
`;
const SigninButton = styled(TouchableOpacity)`
  background-color: #57BAA8;
  padding: 10px;
  align-items: center;
`;
const SignInTitle = styled(Text)`
  color: white;
  font-size: 17px;
`;

const CreationGuide = styled(Text)`
  color: #acacac;
  text-align: center;
`;
const CreateAccount = styled(Text)`
  color: #57BAA8;
  text-decoration: underline;
  text-align: center;
  margin-bottom: 10px;
`;

const ErrorMessage = styled(Text)`
  color: #da4f4f;
  font-size: 14px;
`;

const BGImgDir = require("../assets/henry_background.png");
const LogoImgDir = require("../assets/henry_title.png");

//loading state

export default () => {
  //function
  const [loading, setLoading] = useState(false);

  //email(id), pw ==>state
  const [email, setEmail] = useState(""); //set~~~는 앞의 값을 갱신해주는 것
  const [password, setPassword] = useState("");
  //onchange text(사용자 입력에 따라 변경된 Input Event를 받아와 실행)

  //error msg
  const [error, setError] = useState("");
  //use Navigation hook
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackScreenList>>();
  //for moving screen

  const goToSignup = () => navigation.navigate("SignUp");

  const onSubmit = async () => {
    try {
      //invalid input check
      if (email === "" || password === "") {
        //error msg reset
        setError("please input userinfo");
        return;
      }
      //loading on
      setLoading(true);
      //error msg reset
      setError("");
      //info : 1.auth, 2.email, 3.pw
      await signInWithEmailAndPassword(auth, email, password);
      //ifsignin success alert !
      Alert.alert("Signin SUCCESS");
    } catch (error) {
      //if encounter error
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
      //set error msg
    } finally {
      //loading off
      setLoading(false);
    }
  };
  const onChangeText = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: String
  ) => {
    //1.e의 담겨있는 사용자의 입력 텍스트를 가져온다
    const inputText = e.nativeEvent.text; //이벤트 ㅈㅇ에서 텍스트만 추출

    //2. 입력 텍스트를 email, passwordd state에 저장한다
    //2-1. 입력 텍스트가 email인 경우
    //2-2. 입력 텍스트가 password인 경우
    // setEmail(inputTex
    //console.log(email);

    // if (type === "email") {
    //   setEmail(inputText);
    // } else if (type === "password") {
    //   setPassword(inputText);
    // }

    switch (type) {
      case "email":
        setEmail(inputText);
        break;
      case "password":
        setPassword(inputText);
        break;
    }
    console.log(email);
    console.log(password);
  };

  //screen design
  return (
    <Container source={BGImgDir}>
      <SignBox>
        <LogoImg source={LogoImgDir} resizeMode="contain" />
        <Title>Welcome to Henry</Title>

        <InputField>
          <UserID
            placeholder="Email"
            value={email}
            onChange={(e) => onChangeText(e, "email")}
            keyboardType="email-address"
            returnKeyType="next"
          />
          <UserPW
            placeholder="Password"
            value={password}
            onChange={(e) => onChangeText(e, "password")}
            keyboardType="visible-password"
            secureTextEntry={true} //암호화 처리 해줌
            returnKeyType="done"
          />
          <ErrorMessage>{error}</ErrorMessage>
        </InputField>
        <Footer>
          <CreationGuide>Already have an account?</CreationGuide>
          <CreateAccount onPress={() => goToSignup()}>
            Create account
          </CreateAccount>
          <SigninButton onPress={() => onSubmit()}>
            <SignInTitle>
              {loading === true ? "loading..." : "Sign In"}
            </SignInTitle>
          </SigninButton>
        </Footer>
      </SignBox>
    </Container>
  );
};
