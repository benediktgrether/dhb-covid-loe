window.onload = function () {
  getData();
};

let dataBasel = [];
let dataLoerrach = [];
let date = [];
let dataBaselCases = [];
let baselNewCases = [];
let loerrachNewCases = [];
let dataLoerrachCases = [];
let dataTime = [];
let pointRadius = [];
let hoverRadius = [];
let backgroundColorBarBasel = [];
let backgroundColorBarLoerrach = [];
let dataNewCases = [];
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
    dataTime.push(formatDate(item.date));
    pointRadius.push(8);
    hoverRadius.push(9);
  });
  Object.entries(dataLoerrach).map(([key, item], i) => {
    dataLoerrachCases.push(item.cases);
  });

  getGraph();
  getNewCasesBasel();
  getNewCasesLoerrach();
  getBarGraph();
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
          backgroundColor: ["rgba(15, 67, 113, 0.5)"],
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

function getBarGraph() {
  var ctx = document.getElementById("myBar").getContext("2d");
  var mixBarChart = new Chart(ctx, {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Landkreis Lörrach",
          data: loerrachNewCases,
          backgroundColor: backgroundColorBarLoerrach,
        },
        {
          label: "Basel-Stadt",
          data: baselNewCases,
          backgroundColor: backgroundColorBarBasel,
        },
      ],
      labels: dataNewCases,
    },
    // options: {
    //   elements: {
    //     point: {
    //       borderColor: "#333",
    //       backgroundColor: "#878787",
    //     },
    //   },
    // },
  });
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month].join(".");
}

function getNewCasesBasel() {
  for (let i = 1; i < dataBaselCases.length; i++) {
    const element = dataBaselCases[i] - dataBaselCases[i - 1];
    baselNewCases.push(element);
    const newDate = dataTime[i];
    dataNewCases.push(newDate);
    backgroundColorBarBasel.push("rgba(252, 60, 60, 0.5)");
  }
}

function getNewCasesLoerrach() {
  for (let i = 1; i < dataLoerrachCases.length; i++) {
    const element = dataLoerrachCases[i] - dataLoerrachCases[i - 1];
    loerrachNewCases.push(element);
    backgroundColorBarLoerrach.push("rgba(15, 67, 113, 0.5)");
  }
}
