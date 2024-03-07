import { Text, View, TouchableOpacity, Button } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
const ProfilScreen = ({ navigation, token, id, removeToken }) => {
  const [warning, setWarning] = useState();
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("ID For request", id);
        console.log("Token for request", token);
        const { data } = await axios.get(
          ` https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setData(data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error.message);
        setWarning(error.message);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>Page de Profil de </Text>
          <Button
            title="Se déconnecter"
            onPress={() => {
              console.log(token);
              removeToken();
            }}
          />
        </View>
      )}
    </View>
  );
};
export default ProfilScreen;
