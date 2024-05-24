import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
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
const DummyItem = styled(View)`
  width: 90%;
  height: 250px;
  margin-bottom: 10px;
  background-color: darkblue;
`;

// Main Component
const App: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackScreenList>>();

  const goToCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  const [manufacturer, setManufacturer] = useState<string | undefined>(undefined);
  const [model, setModel] = useState<string | undefined>(undefined);

type Model = {
  label: string;
  value: string;
};
  type Models = {
    [key: string]: Model[];
  };
  const models:Models = {
    manu_lg: [
      { label: "LG 모델 1", value: "lg_model_1" },
      { label: "LG 모델 2", value: "lg_model_2" },
    ],
    manu_apple: [
      { label: "애플 모델 1", value: "apple_model_1" },
      { label: "애플 모델 2", value: "apple_model_2" },
    ],
    manu_sam: [
      { label: "삼성 모델 1", value: "sam_model_1" },
      { label: "삼성 모델 2", value: "sam_model_2" },
    ],
  };

  const renderModelPicker = () => {
    if (!manufacturer) {
      return <Picker.Item label="모델을 선택하세요" value="none" />;
    }
    return models[manufacturer].map((modelItem) => (
      <Picker.Item key={modelItem.value} label={modelItem.label} value={modelItem.value} />
    ));
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
          <Picker.Item label="LG" value="manu_lg" />
          <Picker.Item label="애플" value="manu_apple" />
          <Picker.Item label="삼성" value="manu_sam" />
        </Picker>
        <Text>모델명</Text>
        <Picker selectedValue={model} onValueChange={(itemValue) => setModel(itemValue)}>
          {renderModelPicker()}
        </Picker>

        <DummyItem />
        <DummyItem />
        <DummyItem />
        <DummyItem />
      </ScrollContainer>
    </SafeContainer>
  );
};

export default App;
