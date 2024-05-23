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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigation } from "@react-navigation/native";
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
const UserName = styled(UserID)``;

//footer(signin btn, create account)
const Footer = styled(View)`
  margin-top: 15px;
`;
const SignupButton = styled(TouchableOpacity)`
  background-color: #4ba5ff;
  padding: 10px;
  align-items: center;
`;
const SignUpTitle = styled(Text)`
  color: white;
  font-size: 17px;
`;
const ErrorMessage = styled(Text)`
  color: #da4f4f;
  font-size: 10px;
`;
const BGImgDir = require("../assets/instaDaelim_background.jpg");
const LogoImgDir = require("../assets/instaDaelim_title.png");

export default () => {
  //function

  //email(id), pw ==>state
  const [email, setEmail] = useState(""); //set~~~는 앞의 값을 갱신해주는 것
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");

  //loading state
  const [loading, setLoading] = useState(false);

  //use navigationHook
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackScreenList>>();

  //for moving screen to signin page
  const goToSignin = () => {
    //using hook, move to previous page
    // navigation.navigate("SignIn");
    navigation.goBack();
  };

  //onchange text(사용자 입력에 따라 변경된 Input Event를 받아와 실행)
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
      case "name":
        setName(inputText);
        break;
      case "password":
        setPassword(inputText);
        break;
    }
    console.log("이름" + name);
    console.log("이메일" + email);
    console.log("비번" + password);
  };
  //send account info to server
  //섭와 통신하기 때문에 비동기
  const onSubmit = async () => {
    try {
      //invalid case check
      if (name === "" || email === "" || password === "") {
        //error msg reset
        setError("please input userinfo");
        return;
      }
      //loading on
      setLoading(true);

      setError("");

      //input
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //update user profile with name
      await updateProfile(credential.user, { displayName: name });

      //if account creation success, alert
      // Alert.alert("Account Created");
      goToSignin();
    } catch (error) {
      //if encounter errir
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
      // console.warn(error);
    } finally {
      //always loading off after excute code
      setLoading(false);
    }
  };

  // const onSubmit = async () => {
  //   //acount info
  //   //1.name
  //   //2.id
  //   //3.pw
  //   console.log(`name:${name}, email :${email}, pw:${password}`);
  //   //send to firebase(fbDB, userEmail?, UserPW?)
  //   await createUserWithEmailAndPassword(auth, email, password);

  //   //next code..
  // };

  //screen design
  return (
    <Container source={BGImgDir}>
      <SignBox>
        <LogoImg source={LogoImgDir} resizeMode="contain" />
        <Title>WELCOME!!{"\n"}Create your Account!</Title>

        <InputField>
          <UserName
            placeholder="Name"
            value={name}
            onChange={(e) => onChangeText(e, "name")}
            keyboardType="default"
            returnKeyType="next"
          />
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
          <SignupButton onPress={() => onSubmit()}>
            <SignUpTitle>
              {loading === true ? "loading..." : "create account"}
            </SignUpTitle>
          </SignupButton>
        </Footer>
      </SignBox>
    </Container>
  );
};
