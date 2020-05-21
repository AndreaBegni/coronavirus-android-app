import React from "react";
import { View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import { Dimensions } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

export default class NationalGraphic extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      screenHeight: Math.round(Dimensions.get("window").height) - 150,
      screenWidth: Math.round(Dimensions.get("window").width),
      domain: {
        x: [0, parseInt(Math.round(Dimensions.get("window").width) / 49)],
      },
    };
  }

  async componentDidMount() {
    //unlock the screen to make it rotatable
    await ScreenOrientation.unlockAsync();
    //add the orientation change listener which updates
    //the state's width and height everytime the phone rotates
    ScreenOrientation.addOrientationChangeListener(async () => {
      //console.log(this.state.data.length);
      let width = Math.round(Dimensions.get("window").width);
      let height = Math.round(Dimensions.get("window").height) - 150;
      //console.log("width", width);
      //console.log("height", height);
      this.setState({
        screenWidth: width,
        screenHeight: height,
        domain: { x: [0, parseInt(width / 49)] },
      });
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
              data: { stroke: "#00FF00" },
              parent: { border: "1px solid #ccc" },
            }}
            data={[
              { x: "03-10", y: 2 },
              { x: "03-11", y: 3 },
              { x: "03-12", y: 5 },
              { x: "03-13", y: 4 },
              { x: "03-14", y: 7 },
              { x: "03-15", y: 7 },
              { x: "03-16", y: 7 },
              { x: "03-17", y: 7 },
              { x: "03-18", y: 7 },
              { x: "03-19", y: 7 },
              { x: "03-20", y: 7 },
              { x: "03-21", y: 7 },
            ]}
          />
          <VictoryLine
            style={{
              data: { stroke: "#FF0000" },
              parent: { border: "1px solid #ccc" },
            }}
            data={[
              { x: "03-10", y: 5 },
              { x: "03-11", y: 6 },
              { x: "03-12", y: 8 },
              { x: "03-13", y: 2 },
              { x: "03-14", y: 1 },
            ]}
          />
        </VictoryChart>
      </View>
    );
  }
}
