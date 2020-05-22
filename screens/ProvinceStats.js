import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default class ProvinceStats extends React.Component {
  constructor() {
    super();
    this.state = {
      provinceName: "",
    };
  }

  handleProvinceName = (text) => {
    this.setState({ provinceName: text });
  };

  async componentDidMount() {}

  render() {
    console.log("sono provincename", this.state.provinceName);
    return (
      <View style={styles.container}>
        <Text style={styles.topText}>
          Insert the name of a province to see today's cases
        </Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Province name"
          onChangeText={this.handleProvinceName}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  topText: {
    textAlign: "center",
  },
  input: {
    margin: 10,
    height: 40,
    borderColor: "#000000",
    borderWidth: 2,
    fontWeight: "bold",
    padding: 4,
  },
});
