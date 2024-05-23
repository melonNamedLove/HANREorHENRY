//es6
//function: function & arrow func

import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Firebase from "firebase/auth"; //cheatsheet
import { auth } from "../firebaseConfig";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { MainStackScreenList } from "../stacks/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeContainer = styled(SafeAreaView)`
  background-color: white;
`;
const Header = styled(View)`
  /* background-color: burlywood; */
  padding: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const LogoImg = styled(Image)`
  width: 150px;
  height: 30px;
`;

const AddButton = styled(TouchableOpacity)``;
// export default function name(params:type){}

const ScrollContainer = styled(ScrollView)``;
const DummyItem = styled(View)`
  width: 90%;
  height: 250px;
  margin-bottom: 10px;
  background-color: darkblue;
`;
export default () => {
  //Navigation Hook ex)useXXX
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  //move to create-post-screen
  const goToCreatePost = () => {
    navigation.navigate("CreatePost");
  };
  // //move to Detail function
  // const signOut = async () => {
  //   await Firebase.signOut(auth);
  // };

  //screen design
  //f12눌면 구현을 볼 수 있음
  return (
    <SafeContainer>
      <Header>
        <LogoImg source={require("../assets/instaDaelim_title.png")} />
        <AddButton onPress={goToCreatePost}>
          <Ionicons
            name="add-circle-outline"
            size={20}
            // color={focused ? "#1274f4" : "darkgray"}
          />
        </AddButton>
      </Header>
      <ScrollContainer>
        <DummyItem />
        <DummyItem />
        <DummyItem />
        <DummyItem />
      </ScrollContainer>
    </SafeContainer>
  );
};

// //css style
// const styles = StyleSheet.create({
//   container: {
//     //크기:화면 전체
//     alignItems: "center",
//     //왼쪽 중 오른쪽 -> 가운데 정렬
//     justifyContent: "center",
//     //위 중 아래 -> 가운데정렬
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });
