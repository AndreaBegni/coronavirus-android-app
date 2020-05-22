import React from "react";
import { View, Text } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import { Dimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

export default class NationalGraphic extends React.Component {
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
      //console.log(this.state.dataToUse.length);
      let width = Math.round(Dimensions.get("window").width);
      let height = Math.round(Dimensions.get("window").height) - 150;
      let domain = { x: [0, parseInt(width / 49)] };
      //console.log("width", width);
      //console.log("height", height);
      this.setState({
        screenWidth: width,
        screenHeight: height,
        domain: domain,
        dataToUse: this.state.data.slice(
          Math.max(json.length - domain.x[1], 0)
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
      <View>
        <VictoryChart
          theme={VictoryTheme.material}
          height={this.state.screenHeight}
          width={this.state.screenWidth}
          domain={this.state.domain}
        >
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
        <Text style={{ textAlign: "center" }}>
          <Text style={{ color: "rgb(0,0,255)" }}> ATTUALMENTE POSITIVI </Text>
          <Text style={{ color: "rgb(0,255,0)" }}> GUARITI </Text>
          <Text style={{ color: "rgb(255,0,0)" }}> DECEDUTI </Text>
        </Text>
      </View>
    );
  }
}
