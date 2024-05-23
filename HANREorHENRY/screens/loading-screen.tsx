import { View, ActivityIndicator } from "react-native";
import styled from "styled-components";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

export default () => {
  return (
    <Container>
      <ActivityIndicator size={"large"} color={"#fff"} />
    </Container>
  );
};

//pure component, custom component
