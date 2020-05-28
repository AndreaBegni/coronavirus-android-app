import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import { Dimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

export default class NationalGraph extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataToUse: [],
      screenHeight: Math.round(Dimensions.get("window").height) - 150,
      screenWidth: Math.round(Dimensions.get("window").width),
      domain: {
        x: [0, parseInt(Math.round(Dimensions.get("window").width) / 49)],
      },
    };
  }

  //cut the date to keep it in the MM-DD form
  //then extract the attribute from the current dataToUse object
  //using the given dataY string
  extractYData(dataY) {
    let dataToReturn = [];
    this.state.dataToUse.forEach((dataToUse) => {
      let date = dataToUse.data.substring(5, 10);
      dataToReturn.push({ x: date, y: dataToUse[dataY] });
    });
    return dataToReturn;
  }

  async componentDidMount() {
    //unlock the screen to make it rotatable
    await ScreenOrientation.unlockAsync();
    //add the orientation change listener which updates
    //the state's width and height everytime the phone rotates
    ScreenOrientation.addOrientationChangeListener(async () => {
      let width = Math.round(Dimensions.get("window").width);
      let height = Math.round(Dimensions.get("window").height) - 150;
      let domain = { x: [0, parseInt(width / 49)] };
      this.setState({
        screenWidth: width,
        screenHeight: height,
        domain: domain,
        dataToUse: this.state.data.slice(
          Math.max(this.state.data.length - domain.x[1], 0)
        ),
      });
    });
    const response = await fetch(
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json"
    );
    const json = await response.json();
    this.setState({
      data: json,
      dataToUse: json.slice(Math.max(json.length - this.state.domain.x[1], 0)),
    });
  }

  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <Text>
          <Text style={{ color: "rgb(0,0,255)" }}> CURRENTLY POSITIVE </Text>
          <Text style={{ color: "rgb(0,255,0)" }}> HEALED </Text>
          <Text style={{ color: "rgb(255,0,0)" }}> DECEASED </Text>
        </Text>
        <VictoryChart
          theme={VictoryTheme.material}
          height={this.state.screenHeight}
          width={this.state.screenWidth}
          domain={this.state.domain}
        >
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "#756f6a" },
              grid: { stroke: "grey" },
              tickLabels: { angle: -60 },
            }}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "#756f6a" },
              grid: { stroke: "grey" },
            }}
          />
          <VictoryLine
            style={{
              data: { stroke: "#FF0000" },
              parent: { border: "1px solid #ccc" },
            }}
            data={this.extractYData("deceduti")}
          />
          <VictoryLine
            style={{
              data: { stroke: "#0000FF" },
              parent: { border: "1px solid #ccc" },
            }}
            data={this.extractYData("totale_positivi")}
          />
          <VictoryLine
            style={{
              data: { stroke: "#00FF00" },
              parent: { border: "1px solid #ccc" },
            }}
            data={this.extractYData("dimessi_guariti")}
          />
        </VictoryChart>
      </View>
    );
  }
}
