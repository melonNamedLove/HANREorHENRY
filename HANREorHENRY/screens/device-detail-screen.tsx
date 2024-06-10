import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text, View, Image, Dimensions, TouchableOpacity, Alert, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import styled from "styled-components";
import axios from "axios";
import { MainStackScreenList } from "../stacks/MainStack";
import models from "../assets/links";
import { GoogleGenerativeAI } from "@google/generative-ai";

// get my device Screen width/height
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const numOfItemPerLine = 4;

const Container = styled(View)``;
const MainImg = styled(Image)`
  width: ${WIDTH}px;
  height: ${WIDTH}px;
`;

type DeviceDetailScreenRouteProp = RouteProp<MainStackScreenList, "DeviceDetail">;

const DeviceDetailScreen: React.FC = () => {
  const route = useRoute<DeviceDetailScreenRouteProp>();
  const { device } = route.params;

  const [data, setData] = useState<any[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(undefined);
  const [geminiText, setGeminiText] = useState<string | null>();

  
  const fetchData = async () => {
    try {
      const response = await axios.get("https://browser.geekbench.com/mobile-benchmarks.json");
      const benchmarkData = response.data.devices || [];

      console.log('Fetched data:', benchmarkData); // 데이터를 확인합니다.
      console.log('Device name to match:', device.model_no); // 비교할 이름을 확인합니다.
      // 이름이 일치하는 데이터를 찾아 점수를 설정
      const matchedDevice = benchmarkData.find((item: any) => item.name === device.model_no);
      if (matchedDevice) {
        setScore(matchedDevice.score);
      } else {
        console.log('No matching device found');
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyD24Am5nm57iddsA1uTZGDzu21tTpyAIf0");

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = device.name+"과 "+selectedModel+"를 3줄로 비교해줘"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  setGeminiText(text);
}
  useEffect(() => {
    fetchData();
  }, []);

  const renderModelPicker = () => {
    return Object.keys(models).flatMap(manufacturer =>
      models[manufacturer].map((modelItem, index) => (
        <Picker.Item key={index} label={modelItem.label} value={modelItem.model} />
      ))
    );
  };
  return (
    <ScrollView>
      <MainImg source={{ uri: device.imgURL }} />
      <Text>{device.name}</Text>
      <Text>Geekbench Score: {score !== null ? score : "Loading..."}</Text>
      <Container style={{height : 50, flexDirection: 'row', justifyContent: 'space-around',marginTop:15 }}>
        
        <Text style={{}}>Gemini가 비교해줄거에요</Text>
        
      </Container>
        
      <Picker
        selectedValue={selectedModel}
        onValueChange={(itemValue) => setSelectedModel(itemValue)}
      >
        {renderModelPicker()}
      </Picker>
      
      <Button title="고고고" onPress={() => {
          run()
        }} /> 
        <Text id="gemini">{geminiText}</Text>
        
      <Text>평가</Text>
      
      <TouchableOpacity onPress={()=>{
        Alert.alert('version2에 업데이트 됩니다.')
      }}>
        <Text>-속도</Text>
        <SegmentedControl enabled={false} values={['good', 'bad']} selectedIndex={0} />
        <Text>-발열</Text>
        <SegmentedControl enabled={false} values={['good', 'bad']} selectedIndex={0} />
        <Text>-화질</Text>
        <SegmentedControl enabled={false} values={['good', 'bad']} selectedIndex={0} />
        <Text>-카메라</Text>
        <SegmentedControl enabled={false} values={['good', 'bad']} selectedIndex={0} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DeviceDetailScreen;
