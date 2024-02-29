import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const SigninScreen = ({ setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [warning, setWarning] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const signIn = async () => {
    if (email && password) {
      setWarning();
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          { email, password }
        );
        setIsLoading(false);
        setToken(data.token);
        alert("Tu es bien connecté");
      } catch (error) {
        console.log(error.message);
        setWarning(error.message);
        setIsLoading(false);
      }
    } else {
      setWarning("Please fill all fields");
    }
  };

  return (
    <View style={styles.main}>
      <View>
        <Image source={require("../assets/logo.webp")} style={styles.logo} />
        <Text style={styles.center}>Sign in</Text>
      </View>
      {isLoading && <ActivityIndicator />}

      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          autoComplete="off"
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <View style={styles.row}>
          {!visible ? (
            <FontAwesome
              onPress={() => {
                setVisible(true);
                console.log("click");
              }}
              name="eye"
              size={24}
              color="black"
            />
          ) : (
            <FontAwesome
              onPress={() => {
                setVisible(false);
                console.log("click");
              }}
              name="eye-slash"
              size={24}
              color="black"
            />
          )}
          <TextInput
            style={[styles.input, styles.password]}
            placeholder="Password"
            value={password}
            secureTextEntry={visible ? false : true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>
      </View>
      <View>
        {warning && (
          <Text style={(styles.warning, styles.center)}>{warning}</Text>
        )}
        {!isLoading && (
          <TouchableOpacity
            style={styles.btn}
            title="Sign in"
            onPress={async () => {
              signIn();
            }}
          >
            <Text>Sign in</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.textCenter}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SigninScreen;

const styles = StyleSheet.create({
  logo: {
    marginTop: 20,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  center: {
    textAlign: "center",
    marginTop: 10,
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
  form: {
    width: "80%",
    justifyContent: "flex-start",
    gap: 10,
  },
  input: {
    borderBottomColor: "#F9595E",
    borderBottomWidth: 1,
    height: 50,
    fontSize: 20,
  },
  warning: {
    color: "#F9595E",
    marginBottom: 10,
    textAlign: "center",
  },
  password: {
    width: "90%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
