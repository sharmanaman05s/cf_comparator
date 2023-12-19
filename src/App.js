import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { options } from "./options.jsx";
let totalUsers = 0;
const handleClick = async (handle, setChart) => {
  if (handle === "") {
    return;
  }
  const currUserData = await axios
    .get(`https://codeforces.com/api/user.rating?handle=${handle}`)
    .json();
  console.log(currUserData);
  if (currUserData.status !== "OK") {
    alert("User Not Found");
    return;
  } else if (currUserData.result.length === 0) {
    alert("User has not participated any contest");
    return;
  } else {
    totalUsers++;
  }
  const currUserSize = currUserData.result.length;

  var copyTdata = matrixData[totalUsers - 1];
  var tempdata = [copyTdata[0]];
  tempdata[0].push(handle);
  const currSize = copyTdata.length;

  var tdata = 1;
  var cdata = 0;
  // console.log(tempdata);
  while (tdata < currSize && cdata < currUserSize) {
    //console.log(copyTdata);
    var time1 = copyTdata[tdata][0];
    var time2 = currUserData.result[cdata].ratingUpdateTimeSeconds;

    var val = currUserData.result[cdata].newRating;

    if (time1 === time2) {
      var insertArray = copyTdata[tdata];
      insertArray.push(val);
      tempdata.push(insertArray);
      tdata++;
      cdata++;
    } else if (time1 < time2) {
      var insertArray2 = copyTdata[tdata];
      insertArray2.push(null);
      tempdata.push(insertArray2);
      tdata++;
    } else {
      var insertArray3 = [time2];
      for (var times = 1; times < totalUsers; times++) {
        insertArray3.push(null);
      }
      insertArray3.push(val);
      tempdata.push(insertArray3);
      cdata++;
    }
  }

  while (tdata < currSize) {
    var insertArray22 = copyTdata[tdata];
    insertArray22.push(null);
    tempdata.push(insertArray22);
    tdata++;
  }

  while (cdata < currUserSize) {
    var time22 = currUserData.result[cdata].ratingUpdateTimeSeconds;
    var val2 = currUserData.result[cdata].newRating;

    var insertArray33 = [time22];
    for (var times22 = 1; times22 < totalUsers; times22++) {
      insertArray33.push(null);
    }
    insertArray33.push(val2);
    tempdata.push(insertArray33);
    cdata++;
  }
  matrixData.push(tempdata);
  //console.log(tempdata);

  const finalData = [];
  for (let i = 0; i < tempdata.length; i++) {
    var temp69 = [];
    for (let j = 0; j < tempdata[i].length; j++) {
      temp69.push(tempdata[i][j]);
    }
    finalData.push(temp69);
  }
  const finalLength = finalData.length;
  for (let i = 1; i < finalLength; i++) {
    finalData[i][0] = new Date(finalData[i][0] * 1000);
  }
  console.log(finalData);
  setChart(
    <Chart
      chartType="LineChart"
      data={finalData}
      width="100%"
      height="400px"
      options={options}
      legendToggle
    />
  );
  //console.log(chart);
  // const rate = data.result[0].rating;
  // setRating(rate);
};
var matrixData = [[["day"]]];
function App() {
  const [handle, setHandle] = useState("");
  const [chart, setChart] = useState(
    <Chart
      chartType="LineChart"
      data={matrixData}
      width="100%"
      height="400px"
      options={options}
      legendToggle
    />
  );
  const change = (event) => {
    setHandle(event.target.value);
  };
  console.log(handle);
  window.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      handleClick(handle);
    }
  });
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
          />
          <img
            className="search_btn"
            src="../../search.svg"
            alt=""
            onClick={() => handleClick(handle, setChart)}
          />
        </div>
      </div>
      <div className="chart_div">{chart}</div>
    </div>
  );
}

export default App;
