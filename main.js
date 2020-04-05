window.onload = function () {
  getData();
};

let dataBasel = [];
let dataLoerrach = [];
let date = [];
let dataBaselCases = [];
let dataLoerrachCases = [];
let dataTime = [];

async function getData() {
  let response = await fetch("./data.json");
  let offer = await response.text();
  let data = JSON.parse(offer);
  dataToFile(data);
}

function dataToFile(data) {
  console.log("test");
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (data[i].Basel) {
      dataBasel.push(data[i].Basel);
    } else {
      dataLoerrach.push(data[i].Lörrach);
    }
  }
  console.log(dataBasel, dataLoerrach);

  Object.entries(dataBasel).map(([key, item], i) => {
    dataBaselCases.push(item.cases);
    dataTime.push(item.date);
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
          label: "Lörrach - Fälle",
          data: dataLoerrachCases,

          borderColor: ["#f6416c"],
          // Changes this dataset to become a line
          type: "line",
        },
        {
          label: "Basel - Fälle",
          data: dataBaselCases,
          borderColor: ["#3490de"],
        },
      ],
      labels: dataTime,
    },
    // options: options,
  });
}