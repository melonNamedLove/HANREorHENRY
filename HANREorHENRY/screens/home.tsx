import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { MainStackScreenList } from "../stacks/MainStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import models from "../assets/links"; // 모델 데이터가 있는 파일을 불러옵니다.

// Styled Components
const SafeContainer = styled(SafeAreaView)`
  background-color: white;
`;
const Header = styled(View)`
  padding: 10px 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const LogoImg = styled(Image)`
  width: 150px;
  height: 30px;
`;

const AddButton = styled(TouchableOpacity)``;

const ScrollContainer = styled(ScrollView)`
  background-color: #d9d9d9;
`;
const PhoneItem = styled(TouchableOpacity)`
  width: 90%;
  height: 250px;
  margin-bottom: 10px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

// Main Component
const App: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  const goToCreatePost = () => {
    Alert.alert("version 2에 업데이트 됩니다.");
  };

  const [manufacturer, setManufacturer] = useState<string>("LG");
  const [model, setModel] = useState<string | undefined>(undefined);

  const renderModelPicker = () => {
    if (!manufacturer) {
      return <Picker.Item label="모델을 선택하세요" value="none" />;
    }
    return models[manufacturer].map((modelItem) => (
      <Picker.Item key={modelItem.url} label={modelItem.label} value={modelItem.url} />
    ));
  };

  const handlePhoneItemPress = (device: { name: string; imgURL: string; model_no: string; }) => {
    navigation.navigate("DeviceDetail", { device });
  };

  return (
    <SafeContainer>
      <Header>
        <LogoImg source={require("../assets/henry_title.png")} />
        <AddButton onPress={goToCreatePost}>
          <Ionicons name="add-circle-outline" size={20} color="darkgray" />
        </AddButton>
      </Header>
      <ScrollContainer>
        <Text>제조사</Text>
        <Picker
          selectedValue={manufacturer}
          onValueChange={(itemValue) => {
            setManufacturer(itemValue);
            setModel(undefined); // 제조사가 변경되면 모델도 초기화
          }}
        >
          <Picker.Item label="LG" value="LG" />
          <Picker.Item label="애플" value="Apple" />
          <Picker.Item label="삼성" value="Samsung" />
        </Picker>
        {manufacturer && models[manufacturer] && models[manufacturer].map((modelItem, index) => (
          <PhoneItem key={index} onPress={() => handlePhoneItemPress({ name: modelItem.label,imgURL:modelItem.url, model_no: modelItem.model })}>
            <Image source={{ uri: modelItem.url }} style={{ width: '80%', height: '80%', resizeMode: 'contain' }} />
            <Text>{modelItem.label}</Text>
          </PhoneItem>
        ))}
      </ScrollContainer>
    </SafeContainer>
  );
};

export default App;
