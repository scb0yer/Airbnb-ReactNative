import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function SignupScreen({ setToken, navigation }) {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [description, setDescription] = useState();
  const [password, setPassword] = useState();
  const [passwordChecking, setPasswordChecking] = useState();
  const [warning, setWarning] = useState();

  const signUp = async () => {
    if (email && password && username && description && passwordChecking) {
      if (password !== passwordChecking) {
        setWarning("Passwords must be the same");
      } else {
        setWarning();
        try {
          const { data } = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            { email, password, username, description }
          );
          setIsLoading(false);
          setToken(data.token, data.id);
          alert("Tu es bien connecté");
        } catch (error) {
          console.log(error.message);
          setWarning(error.message);
        }
      }
    } else {
      setWarning("Please fill all fields");
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../assets/logo.webp")} style={styles.logo} />
      </View>

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
        <TextInput
          style={styles.input}
          placeholder="username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          multiline={true}
          style={styles.description}
          placeholder="Describe yourself in a few words..."
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          value={passwordChecking}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPasswordChecking(text);
          }}
        />
      </View>
      <View style={styles.textCenter}>
        {warning && <Text style={styles.warning}>{warning}</Text>}
        <TouchableOpacity
          style={styles.btn}
          title="Sign up"
          onPress={async () => {
            signUp();
          }}
        >
          <Text>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          <Text style={styles.textCenter}>
            Already have an account ? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  form: {
    width: "80%",
    justifyContent: "flex-start",
    gap: 10,
  },
  input: {
    borderBottomColor: "#F9595E",
    borderBottomWidth: 1,
    height: 30,
    fontSize: 18,
  },
  description: {
    borderColor: "#F9595E",
    borderWidth: 1,
    height: 100,
    fontSize: 18,
  },
  btn: {
    height: 50,
    width: 200,
    borderColor: "#F9595E",
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  warning: {
    color: "#F9595E",
    marginBottom: 10,
    textAlign: "center",
  },
  textCenter: {
    marginTop: 10,
    textAlign: "center",
  },
});
