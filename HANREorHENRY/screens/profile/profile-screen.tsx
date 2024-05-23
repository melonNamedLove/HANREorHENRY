import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import ProfileInfo from "../../components/ProfileInfo";
import { User } from "firebase/auth";
import { MyUser } from "./profile-container";

const ScrollBox = styled(ScrollView)`
  flex: 1;
  background-color: #fff;
`;
const Header = styled(View)`
  height: 300px;
  justify-content: flex-end;
  bottom: -20px;
  z-index: 99;
  padding: 0px 30px;
`;
const Body = styled(View)`
  height: 500px;
  background-color: lightgray;
`;

const SignoutBtn = styled(TouchableOpacity)`
  background-color: #e1e1e1;
  border-radius: 4px;
  padding: 5px 15px;
`;
const SignoutTitle = styled(Text)`
  color: #7c7c7c;
  text-align: center;
`;

type Props = {
  user: MyUser | undefined;
  onSignout: () => void;
  onEditImage: () => void;
};

//function : function & arrow func
export default ({ user, onSignout, onEditImage }: Props) => {
  //design screen
  return (
    <ScrollBox>
      <Header>
        <ProfileInfo user={user} onEditImage={onEditImage} />
      </Header>
      <Body></Body>
      <SignoutBtn onPress={onSignout}>
        <SignoutTitle>Log Out</SignoutTitle>
      </SignoutBtn>
    </ScrollBox>
  );
};
