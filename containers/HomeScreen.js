import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import Constants from "expo-constants";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [warning, setWarning] = useState();
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState();
  const rate = [0, 1, 2, 3, 4];

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setWarning(error.message);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.borderBottom}>
        <Image source={require("../assets/logo.webp")} style={styles.logo} />
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <View>
              <View style={styles.relative}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("room", { id: item._id });
                  }}
                >
                  <Image
                    source={{ uri: item.photos[0].url }}
                    style={styles.miniature}
                  />
                </TouchableOpacity>
                <ImageBackground style={styles.price}>
                  <Text style={styles.white}>{item.price} €</Text>
                </ImageBackground>
              </View>
              <View style={[styles.flexRow, styles.spaceBetween]}>
                <View>
                  <View>
                    <Text>{item.title}</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Text>
                      {rate.map((rate, index) => {
                        if (rate < item.ratingValue) {
                          return (
                            <AntDesign
                              key={index}
                              name="star"
                              size={20}
                              color="#FDB100"
                            />
                          );
                        } else {
                          return (
                            <AntDesign
                              key={index}
                              name="star"
                              size={20}
                              color="#BBBBBB"
                            />
                          );
                        }
                      })}
                    </Text>
                    <Text>{item.reviews} reviews</Text>
                  </View>
                </View>
                <Image
                  source={{ uri: item.user.account.photo.url }}
                  style={styles.avatar}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: 10,
  },
  borderBottom: {
    paddingTop: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    borderStyle: "solid",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  main: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: 100,
    height: 40,
    borderColor: "#FD5A5D",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 20,
    margin: 10,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  miniature: {
    height: 200,
    resizeMode: "cover",
  },
  flexRow: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    gap: 10,
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: "cover",
  },
  price: {
    width: 100,
    height: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "abolute",
    bottom: 60,
  },
  white: {
    color: "white",
    fontSize: 22,
  },
  relative: {
    position: "relative",
    height: 200,
  },
});
