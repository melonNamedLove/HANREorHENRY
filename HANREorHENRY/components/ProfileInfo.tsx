import { User } from "firebase/auth";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { MyUser } from "../screens/profile/profile-container";
import { defaultImage } from "../utils/utils";

const Container = styled(View)`
  bottom: -2px;
`;
const Info = styled(View)`
  flex-direction: row;
`;
const Name = styled(Text)`
  font-size: 35px;
  font-weight: bold;
`;
const ProfileImg = styled(Image)`
  width: 100px;
  height: 200px;
  background-color: red;
  margin-right: 10px;
  border-radius: 5px;
`;
const Email = styled(Text)`
  font-size: 20px;
  color: #4b4b4b;
`;

const JoinDate = styled(Text)`
  font-size: 20px;
  font-weight: 400;
  color: #b4b4b4;
`;
const Data = styled(View)`
  background-color: blue;
  justify-content: center;
`;
const CustomButton = styled(TouchableOpacity)``;

type Props = {
  user: MyUser | undefined;
  onEditImage: () => void;
};

export default ({ user, onEditImage }: Props) => {
  return (
    <Container>
      <Info>
        <CustomButton onPress={onEditImage}>
          <ProfileImg source={defaultImage(user?.photoURL)}></ProfileImg>
        </CustomButton>
        <Data>
          <Name>{user?.name}</Name>
          <Email>{user?.email}</Email>
          <JoinDate>{user?.creationTime}</JoinDate>
        </Data>
      </Info>
    </Container>
  );
};
