import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default class ProvinceStats extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      provinceName: "",
      provinceData: {},
    };
  }

  searchProvinceData = () => {
    let specificData = this.state.data.find((province) => {
      let currentProvinceName = province.denominazione_provincia.toLowerCase();
      return currentProvinceName == this.state.provinceName;
    });
    this.setState({
      provinceData: specificData,
    });
  };

  handleProvinceName = (text) => {
    this.setState({ provinceName: text.toLowerCase() });
  };

  async componentDidMount() {
    const response = await fetch(
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json"
    );
    const json = await response.json();
    this.setState({
      data: json,
    });
  }

  render() {
    //console.log("sono provincename", this.state.provinceName);
    //console.log("sono provincedata", this.state.provinceData);
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
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.searchProvinceData()}
        >
          <Text style={styles.submitButtonText}> Search </Text>
        </TouchableOpacity>
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
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    height: 40,
    alignSelf: "center",
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
  },
});
