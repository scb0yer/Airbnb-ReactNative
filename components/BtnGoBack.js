import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BtnGoBack = () => {
  const navigation = useNavigation();

  return (
    <AntDesign
      name="caretleft"
      size={24}
      color="black"
      onPress={() => navigation.goBack()}
    />
  );
};

export default BtnGoBack;
