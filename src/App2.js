import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { options } from "./options.jsx";
import getData from "./searchHelper";
async function handleClick(handle, plotArr, setPlotArr, setChart) {
  if (handle == "") {
    alert("Enter Codeforces Handle");
    return;
  }
  const dataArr = await getData(handle);
  if (dataArr.length === 0) {
    alert("User has not participated in any contest");
    return;
  } else if (dataArr === [-1]) {
    alert("User Not Found");
    return;
  }
  console.log(dataArr);
  for (var i = 0; i < dataArr.length; i++) {
    dataArr[i].ratingUpdateTimeSeconds = new Date(
      dataArr[i].ratingUpdateTimeSeconds * 1000
    );
  }
  var newPlot = [];
  newPlot.push([...plotArr[0]]);
  newPlot[0].push(handle);
  var presentSize = plotArr.length;
  var dataSize = dataArr.length;
  var currNumber = plotArr[0].length;
  var i = 1;
  var j = 0;
  while (i < presentSize && j < dataSize) {
    var multipleElementArr = [...plotArr[i]];
    multipleElementArr.push(dataArr[j].newRating);
    var singleElementArr = [dataArr[j].ratingUpdateTimeSeconds];
    for (var x = 0; x < currNumber - 1; x++) {
      singleElementArr.push(null);
    }
    singleElementArr.push(dataArr[j].newRating);

    if (plotArr[i][0] === dataArr[j].ratingUpdateTimeSeconds) {
      newPlot.push(multipleElementArr);
      i++;
      j++;
    } else if (plotArr[i][0] >= dataArr[j].ratingUpdateTimeSeconds) {
      newPlot.push(singleElementArr);
      j++;
    } else {
      multipleElementArr.pop();
      multipleElementArr.push(null);
      newPlot.push(multipleElementArr);
      i++;
    }
  }
  while (j < dataSize) {
    var singleElementArr = [dataArr[j].ratingUpdateTimeSeconds];
    for (var x = 0; x < currNumber - 1; x++) {
      singleElementArr.push(null);
    }
    singleElementArr.push(dataArr[j].newRating);
    newPlot.push(singleElementArr);
    j++;
  }
  while (i < presentSize) {
    var multipleElementArr = [...plotArr[i]];
    multipleElementArr.push(null);
    newPlot.push(multipleElementArr);
    i++;
  }
  setPlotArr(newPlot);

  setChart(
    <Chart
      chartType="LineChart"
      data={newPlot}
      width="100%"
      height="400px"
      options={options}
      legendToggle
    />
  );
}
function App2() {
  const [handle, setHandle] = useState("");
  const [plotArr, setPlotArr] = useState([["Day"]]);
  const [chart, setChart] = useState(null);
  const change = (event) => {
    setHandle(event.target.value);
  };
  console.log(handle);
  return (
    <div>
      <div className="heading">
        <h1>CF Comparator</h1>
        <h5 className="subheading">compare codeforces graphs on the go...</h5>
      </div>
      <div>
        <div className="field">
          <input
            className="text-field"
            value={handle}
            onChange={change}
            type="text"
            placeholder="Handle"
            onKeyPress={(event) => {
              if (event.key == "Enter") {
                handleClick(handle, plotArr, setPlotArr, setChart);
              }
            }}
          />
          <img
            className="search_btn"
            src="../../search.svg"
            alt=""
            onClick={() => handleClick(handle, plotArr, setPlotArr, setChart)}
          />
        </div>
      </div>
      <div className="chart_div">{chart}</div>
    </div>
  );
}

export default App2;
