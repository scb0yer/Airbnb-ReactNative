import { Text, View, Image, StyleSheet, ActivityIndicator } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Constants from "expo-constants";
import { coordsList } from "../utils/coords";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";

const AroundMeScreen = ({ navigation }) => {
  const [locations, setLocations] = useState([]);
  const [userCoords, setUserCoords] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [geolocalised, setGeolocalised] = useState();

  useEffect(() => {
    const getPermission = async () => {
      const { data } = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
      );
      const newLocations = [];
      for (let d = 0; d < data.length; d++) {
        const newLocation = {
          id: d,
          latitude: data[d].location[0],
          longitude: data[d].location[1],
        };
        newLocations.push(newLocation);
      }
      setLocations(newLocations);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync();
        setUserCoords({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setGeolocalised(true);
        setIsLoading(false);
      } else {
        setGeolocalised(false);
        setIsLoading(false);
      }
    };
    getPermission();
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.borderBottom}>
        <Image source={require("../assets/logo.webp")} style={styles.logo} />
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {geolocalised === false && (
            <View>
              <RNPickerSelect
                items={coordsList}
                onValueChange={(value) =>
                  setUserCoords({
                    latitude: value.split(",")[0],
                    longitude: value.split(",")[1],
                  })
                }
              />
            </View>
          )}
          {userCoords && (
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: userCoords.latitude,
                longitude: userCoords.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
              // showsUserLocation
            >
              {locations.map((coord) => {
                console.log("Coord", coord);
                return (
                  <Marker
                    key={coord.id}
                    coordinate={{
                      latitude: coord.latitude,
                      longitude: coord.longitude,
                    }}
                    title={coord.title}
                  />
                );
              })}
            </MapView>
          )}
        </View>
      )}
    </View>
  );
};
export default AroundMeScreen;

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
  map: {
    height: 500,
    width: 350,
  },
});
