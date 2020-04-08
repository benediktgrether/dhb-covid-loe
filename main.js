window.onload = function () {
  getData();
};

let dataBasel = [];
let dataLoerrach = [];
let date = [];
let dataBaselCases = [];
let dataLoerrachCases = [];
let dataTime = [];
let pointRadius = [];
let hoverRadius = [];
var colors = [
  "rgb(28, 185, 135)",
  "rgb(185, 28, 78)",
  "rgb(28, 78, 185)",
  "rgb(191, 206, 28)",
  "rgb(191, 63, 191)",
];

async function getData() {
  let response = await fetch("./data.json");
  let offer = await response.text();
  let data = JSON.parse(offer);
  dataToFile(data);
}

function dataToFile(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].Basel) {
      dataBasel.push(data[i].Basel);
    } else {
      dataLoerrach.push(data[i].Lörrach);
    }
  }

  Object.entries(dataBasel).map(([key, item], i) => {
    dataBaselCases.push(item.cases);
    dataTime.push(item.date);
    pointRadius.push(5);
    hoverRadius.push(6);
  });
  Object.entries(dataLoerrach).map(([key, item], i) => {
    dataLoerrachCases.push(item.cases);
  });

  getGraph();
}

function getGraph() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var mixedChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Landkreis Lörrach",
          data: dataLoerrachCases,

          borderColor: ["#0f4471"],
          backgroundColor: ["rgba(15, 67, 113, 1)"],
          pointRadius: pointRadius,
          hoverRadius: hoverRadius,
          pointBorderColor: "#333",
          pointBackgroundColor: "#878787",
        },
        {
          label: "Basel-Stadt",
          data: dataBaselCases,
          borderColor: ["#fc3c3c"],
          backgroundColor: ["rgba(252, 60, 60, 0.5)"],
          pointRadius: pointRadius,
          hoverRadius: hoverRadius,
          pointBorderColor: "#333",
          pointBackgroundColor: "#878787",
        },
      ],
      labels: dataTime,
    },
    options: {
      elements: {
        point: {
          borderColor: "#333",
          backgroundColor: "#878787",
        },
      },
    },
  });
}
