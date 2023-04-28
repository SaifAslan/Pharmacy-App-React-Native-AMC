import React from "react";
import {
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  onPress: () => void;
  ViewStyle: StyleProp<ViewStyle>;
  // TextStyle: StyleProp<TextStyle>;
  PressableStyle: any;
  // children: React.ReactNode;
  Content: React.ReactNode
};
//this components creates a button that has cusmization 
const AppButtons: React.FC<Props> = ({
  PressableStyle,
  ViewStyle,
  onPress,
  Content,
}) => {
  return (
    <Pressable style={PressableStyle} onPress={onPress}>
      <View style={ViewStyle}>{Content}</View>
    </Pressable>
  );
};

export default AppButtons;
