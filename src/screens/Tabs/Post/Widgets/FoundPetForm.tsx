import React from "react";
import { View } from "react-native";
import Gender from "~components/widgets/Gender";
import Input from "~components/widgets/Input";
import ThemeText from "~components/widgets/ThemeText";

const FoundPetForm = () => {
  return (
    <View>
      <ThemeText>Found</ThemeText>
      <Gender />
      {/* <Input label="Pet name" /> */}
    </View>
  )
}

export default FoundPetForm;