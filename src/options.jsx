export const options = {
  legend: {
    textStyle: { color: "white", fontSize: 12 },
  },
  curveType: "function",
  pointSize: 5,
  interpolateNulls: true,
  backgroundColor: "black",
  crosshair: { trigger: "focus" },
  hAxis: {
    gridlines: {
      color: "black",
    },
    title: "Time",
    titleTextStyle: {
      color: "white",
      // fontName: ,
      fontSize: 20,
      bold: true,
      italic: false,
    },
    textStyle: {
      color: "white",
      // fontName: ,
      fontSize: 15,
      bold: true,
      italic: false,
      slantedText: true,
      slantedTextAngle: 30,
    },
  },
  vAxis: {
    minorgridlines: {
      color: "white",
    },
    textStyle: {
      color: "white",
      // fontName: ,
      fontSize: 15,
      bold: true,
      italic: false,
    },
    title: "Rating",
    titleTextStyle: {
      color: "white",
      // fontName: ,
      fontSize: 20,
      bold: true,
      italic: false,
    },
  },
  animation: {
    duration: 1500,
    startup: true,
    easing: "inAndOut",
  },
};
