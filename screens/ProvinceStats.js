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
      provinceData: [],
      dataIndex: undefined,
    };
  }

  newPositives = () => {
    let currentIndex = this.state.dataIndex;
    if (currentIndex === undefined) return;
    if (currentIndex === 0) return "?";
    return (
      this.state.provinceData[currentIndex].totale_casi -
      this.state.provinceData[currentIndex - 1].totale_casi
    );
  };

  moveIndexToLeft = () => {
    let currentIndex = this.state.dataIndex;
    if (currentIndex === undefined) return;
    if (currentIndex === 0) return;
    this.setState({
      dataIndex: currentIndex - 1,
    });
  };

  moveIndexToRight = () => {
    let currentIndex = this.state.dataIndex;
    if (currentIndex === undefined) return;
    if (currentIndex === this.state.provinceData.length - 1) return;
    this.setState({
      dataIndex: currentIndex + 1,
    });
  };

  provinceDataAsString = (attribute) => {
    if (this.state.provinceData.length === 0) return "";
    return this.state.provinceData[this.state.dataIndex][attribute];
  };

  searchProvinceData = () => {
    let specificData = this.state.data.filter((province) => {
      let currentProvinceName = province.denominazione_provincia.toLowerCase();
      return currentProvinceName == this.state.provinceName;
    });
    if (specificData.length === 0) return;
    this.setState({
      provinceData: specificData,
      dataIndex: specificData.length - 1,
    });
  };

  handleProvinceName = (text) => {
    this.setState({ provinceName: text.toLowerCase() });
  };

  async componentDidMount() {
    const response = await fetch(
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json"
    );
    const json = await response.json();
    this.setState({
      data: json,
    });
  }

  render() {
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
        <View style={styles.content}>
          <TouchableOpacity onPress={() => this.moveIndexToLeft()}>
            <View style={styles.triangleLeft}></View>
          </TouchableOpacity>
          <Text>
            DATE: {this.provinceDataAsString("data").substring(0, 10)}
          </Text>
          <TouchableOpacity onPress={() => this.moveIndexToRight()}>
            <View style={styles.triangleRight}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.provinceDataContainer}>
          <Text>
            REGION: {this.provinceDataAsString("denominazione_regione")}
          </Text>
          <Text>
            PROVINCE: {this.provinceDataAsString("denominazione_provincia")}
          </Text>
          <Text>
            CURRENTLY POSITIVES: {this.provinceDataAsString("totale_casi")}
          </Text>
          <Text>NEW POSITIVES: {this.newPositives()}</Text>
          <Text>NOTES: {this.provinceDataAsString("note_it")}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  provinceDataContainer: {
    paddingTop: 10,
    alignItems: "center",
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
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 10,
  },
  triangleLeft: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#7a42f4",
    transform: [{ rotate: "-90deg" }],
  },
  triangleRight: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#7a42f4",
    transform: [{ rotate: "90deg" }],
  },
});
