import { Picker } from "@react-native-picker/picker";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useState } from "react";
import { Dimensions, ScrollView, Text, View, Image, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";

//get my device Screen width/height
const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const numOfItemPerLine = 4;

const Container = styled(View)``;

const Title = styled(Text)``;
const SelectedPhotoScroll = styled(ScrollView)`
  background-color: green;
  width: ${WIDTH}px;
  height: ${WIDTH}px;
`;
const DummySelected = styled(View)`
  width: 200px;
  height: 200px;
  background-color: red;
  margin-right: 10px;
`;
const AlbumPhotoScroll = styled(ScrollView)``;
const DummyAlbum = styled(View)`
  width: ${WIDTH / numOfItemPerLine}px;
  height: ${WIDTH / numOfItemPerLine}px;
  background-color: yellowgreen;
  border-width: 0.5px;
`;

const MainImg = styled(Image)`
width: ${WIDTH}px;
height: ${WIDTH}px;
`;

export default () => {

  return (
    <ScrollView>
      <MainImg source={require("../../assets/lgvelvet.jpg")}/>
      <Text>LG 벨벳</Text>
      <Text> Geekbench : x 점</Text>
      <Picker>
        <Picker.Item label="아이폰 15" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <TouchableOpacity>
        <Text>Gemini에게 물어보기</Text>
      </TouchableOpacity>
      
      <Text>평가</Text>
      <Text>-속도</Text>
      <SegmentedControl 
          enabled={false} values={['good', 'bad']} selectedIndex={1} />
          <Text>-발열</Text>
          <SegmentedControl 
              enabled={false} values={['good', 'bad']} selectedIndex={0} />
          <Text>-화질</Text>
          <SegmentedControl 
              enabled={false} values={['good', 'bad']} selectedIndex={0} />
          <Text>-카메라</Text>
          <SegmentedControl 
              enabled={false} values={['good', 'bad']} selectedIndex={0} />
      

    </ScrollView>
  
  );
};
