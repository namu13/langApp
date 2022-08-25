import { useRef, useState } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const toggleUp = () => setUp((prev) => !prev);
  const Y = useRef(new Animated.Value(0)).current;

  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? -200 : 0,
      useNativeDriver: true,
      easing: Easing.back(5),
    }).start(toggleUp);
  };

  Y.addListener(() => console.log("Animated State: ", Y));
  console.log("Component State: ", Y);

  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox style={{ transform: [{ translateY: Y }] }}></AnimatedBox>
      </TouchableOpacity>
    </Container>
  );
}
