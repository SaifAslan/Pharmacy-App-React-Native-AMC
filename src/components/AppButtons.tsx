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
  TextStyle: StyleProp<TextStyle>;
  PressableStyle: any;
  buttonText: String;
};

const AppButtons: React.FC<Props> = ({
  PressableStyle,
  ViewStyle,
  TextStyle,
  onPress,
  buttonText,
}) => {
  return (
    <Pressable style={PressableStyle} onPress={onPress}>
      <View style={ViewStyle}>
        <Text style={TextStyle}>{buttonText}</Text>
      </View>
    </Pressable>
  );
};

export default AppButtons;
