import React, { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollView, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import styled from "styled-components";
import axios from "axios";
import { MainStackScreenList } from "../../stacks/MainStack";

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

  const fetchData = async () => {
    try {
      const response = await axios.get("https://browser.geekbench.com/mobile-benchmarks.json");
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      <MainImg source={{ uri: device.model_no }} />
      <Text>{device.name}</Text>
      <Text>Geekbench: {data.length > 0 ? data[0].score : "N/A"} 점</Text>
      <Picker>
        <Picker.Item label="아이폰 15" value="iphone_15" />
        <Picker.Item label="JavaScript" value="javascript" />
      </Picker>
      <TouchableOpacity onPress={fetchData}>
        <Text>Gemini에게 물어보기</Text>
      </TouchableOpacity>
      <Text>평가</Text>
      <Text>-속도</Text>
      <SegmentedControl enabled={false} values={['good', 'bad']} selectedIndex={1} />
      <Text>-발열</Text>
      <SegmentedControl enabled={false} values={['good', 'bad']} selectedIndex={0} />
      <Text>-화질</Text>
      <SegmentedControl enabled={false} values={['good', 'bad']} selectedIndex={0} />
      <Text>-카메라</Text>
      <SegmentedControl enabled={false} values={['good', 'bad']} selectedIndex={0} />
    </ScrollView>
  );
};

export default DeviceDetailScreen;
