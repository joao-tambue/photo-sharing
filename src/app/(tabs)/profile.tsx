import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>profile screen</Text>
      {/* <Link href="/">Go back to home</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#25292e",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
