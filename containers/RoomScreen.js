import axios from "axios";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

const RoomScreen = ({ navigation, route }) => {
  const [warning, setWarning] = useState();
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState(null);
  const rate = [0, 1, 2, 3, 4];

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${route.params.id}`
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
      <Image source={require("../assets/logo.webp")} style={styles.logo} />
      {!data ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <View style={styles.centerItems}>
            <View style={styles.relative}>
              <ScrollView horizontal={true}>
                <FlatList
                  data={data.photos}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({ item }) => (
                    <Image
                      source={{ uri: item.url }}
                      style={styles.miniature}
                    />
                  )}
                />
              </ScrollView>

              <Image
                source={{ uri: data.photos[0].url }}
                style={styles.miniature}
              />
              <ImageBackground style={styles.price}>
                <Text style={styles.white}>{data.price} €</Text>
              </ImageBackground>
            </View>
            <View style={[styles.flexRow, styles.spaceBetween]}>
              <View>
                <View>
                  <Text numberOfLines={1}>{data.title}</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text>
                    {rate.map((rate, index) => {
                      if (rate < data.ratingValue) {
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
                          <AntDesign name="star" size={20} color="#BBBBBB" />
                        );
                      }
                    })}
                  </Text>
                  <Text>{data.reviews} reviews</Text>
                </View>
              </View>
              <Image
                source={{ uri: data.user.account.photo.url }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.margins}>
              <Text numberOfLines={3}>{data.description}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginTop: 10,
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
    width: "100%",
    gap: 10,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  centerItems: {
    alignItems: "center",
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
    height: 250,
    width: 400,
    resizeMode: "cover",
  },
  flexRow: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    gap: 10,
    width: "80%",
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
    height: 250,
  },
  margins: {
    width: "80%",
    margin: "auto",
  },
});
