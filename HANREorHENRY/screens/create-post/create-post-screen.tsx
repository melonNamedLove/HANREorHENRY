import { Dimensions, ScrollView, Text, View } from "react-native";
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

export default () => {
  return (
    <Container>
      <Title>Selected Photo</Title>
      <SelectedPhotoScroll
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <DummySelected />
        <DummySelected />
        <DummySelected />
      </SelectedPhotoScroll>
      <Title>Album Photo</Title>
      <AlbumPhotoScroll
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
        <DummyAlbum />
      </AlbumPhotoScroll>
    </Container>
  );
};
