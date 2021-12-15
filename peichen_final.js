
//    console.log("labels");
//    console.log(labels);
  let count=0;

  const SectorCodes = {
    "0000": "Total nonfarm",
    "0500": "Total priate",
    "0600": "Goods-producing",
    "0700": "Service-providing",
    "0800": "Private service-providing",
    "1000": "Mining and logging",
    "2000": "Construction",
    "3000": "Manufacturing",
    "3100": "Durable Goods",
    "3200": "Nondurable Goods",
    "4000": "Trade, transportation, and utilities",
    "4142": "Wholesale trade",
    "4200": "Retail trade",
    "4300": "Transportation and warehousing",
    "4422": "Utilities",
    "5000": "Information",
    "5500": "Financial activities",
    "6000": "Professional and business services",
    "6500": "Education and health services",
    "7000": "Leisure and hospitality",
    "8000": "Other services",
    "9000": "Government"
  };

  let Sector_Keys = Object.keys(SectorCodes);

// These are colors from chart.js utils
    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
      lightgrey: 'rgb(182,174,174)',
      pink: 'rgb(255, 92, 252)',
      black: 'rgb(0, 0, 0)',
      lime: 'rgb(144, 255, 110)',
      lightorange: 'rgb(255,193,115)',
      lightyellow: 'rgb(255,252,98)',
      neongreen: 'rgb(0,255,18)',
      darkgreen: 'rgb(49,152,20)',
      gold: 'rgb(255,215,0)',
      teal: 'rgb(0,206,209)',
      coral: 'rgb(240,128,128)',
      indigo: 'rgb(53,20,152)',
      lightblue: 'rgb(30,162,255)',
      lavendar: 'rgb(210,191,250)',
      maroon: 'rgb(150,75,75)'
    };
//    console.dir(CHART_COLORS);

let chart_colorskeys=Object.keys(CHART_COLORS);
console.log(chart_colorskeys);

    const CHART_COLORS_50_Percent = {
      red: 'rgba(255, 99, 132, 0.5)',
      orange: 'rgba(255, 159, 64, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      grey: 'rgba(201, 203, 207, 0.5)',
      lightgrey: 'rgb(182,174,174)',
      pink: 'rgb(255, 92, 252)',
      black: 'rgb(0, 0, 0)',
      lime: 'rgb(144, 255, 110)',
      lightorange: 'rgb(255,193,115)',
      lightyellow: 'rgb(255,252,98)',
      neongreen: 'rgb(0,255,18)',
      darkgreen: 'rgb(49,152,20)',
      gold: 'rgb(255,215,0)',
      teal: 'rgb(0,206,209)',
      coral: 'rgb(240,128,128)',
      indigo: 'rgb(53,20,152)',
      lightblue: 'rgb(30,162,255)',
      lavendar: 'rgb(210,191,250)',
      maroon: 'rgb(150,75,75)'
    };
//    console.log(CHART_COLORS_50_Percent);
//    end utils

    const data = {
      labels: [],
      datasets: []
    };
  //  console.dir(data);

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees in Thousands'
          }
        }
      }
    };
//    console.log(config);
function responseReceivedHandler(){
  if (this.status == 200) {
    console.log(this.response);
    let dataArray= this.response.Results.series[0].data;
    let seriesID = this.response.Results.series[0].seriesID;
    let sectorline= {
      label: [],
      data:[],
      borderColor: [],
      backgroundColor:[],
      hidden:true
    }
  sectorline.label= (SectorCodes[seriesID.substring(3,7)])
  sectorline.borderColor = (CHART_COLORS[chart_colorskeys[count]])
  sectorline.backgroundColor = (CHART_COLORS_50_Percent[chart_colorskeys[count]])

  console.log("length=" + dataArray.length)
  for (let i = dataArray.length - 1; i >=0; i--){
    sectorline.data.push(dataArray[i].value)
  //console.log("count=" + count)
    if (count ==0){
    //console.log(dataArray[i])
      data.labels.push(dataArray[i].periodName + "/" + dataArray[i].year)
  }
}
console.log(data.labels);

data.datasets.push(sectorline)
count++

  if ( count == Sector_Keys.length){
    const myChart = new Chart(
      document.getElementById('myChart'),
      config);
  }
  } else{
  console.log("error");
  }
}


//    console.dir(myChart);
//    console.log("Ending");
//APIkey = 6a68aea13fb24f1baa9972f5a47f34cc
for (let i=0; i< Sector_Keys.length; i++){
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", responseReceivedHandler);
  xhr.responseType = "json";
  let APIkey = "";
  let endquery = "000001"; //"000001?registrationkey=" + APIkey
  console.log("https://api.bls.gov/publicAPI/v2/timeseries/data/CEU"+ Sector_Keys[i] + endquery);
  xhr.open("GET", "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU"+ Sector_Keys[i] + endquery);
  xhr.send();
}
