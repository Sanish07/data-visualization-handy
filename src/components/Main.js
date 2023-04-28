import React, { useState } from "react";
import "../styles/main.scss";
import BarChart from "./Charts/BarChart";
import BubbleChart from "./Charts/BubbleChart";
import DoughnutChart from "./Charts/DoughnutChart";
import LineChart from "./Charts/LineChart";
import PieChart from "./Charts/PieChart";
import PolarAreaChart from "./Charts/PolarAreaChart";
import ScatterChart from "./Charts/ScatterChart";

const Main = () => {
  const [chartConfig, setChartConfig] = useState({
    chartType : "", 
    chartPadding : 25,
    dataLabel : "label",
    
    title: "Chart Title Here",
    align : "center",
    position : "top",
    fontSize : 24,
    titleColor : "#000000",
    weight : 400,
    
    showLegend : true,
    legendPos : 'bottom',
    legendLabColor : '#000000'
  });

  const handleCanvasBg = (e) =>{
    document.querySelector('#chart-canvas').style.background = e.target.value;
  }

  const handleDownload = (e) =>{
    var download = document.getElementById("download");
    var image = document.getElementById("chart-canvas").toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
  }

  const handleTitleChange = (e) => {
    switch(e.target.name){
      case "chart-type":
          setChartConfig({...chartConfig, chartType : e.target.value});
          break;

      case "chart-title":
        setChartConfig({...chartConfig, title : e.target.value});
        break;
      
        case "align-title":
        setChartConfig({...chartConfig, align : e.target.value});
        break;

        case "title-position":
        setChartConfig({...chartConfig, position : e.target.value});
        break;
      
        case "font-size":
        setChartConfig({...chartConfig, fontSize : e.target.value});
        break;

        case "title-color":
        setChartConfig({...chartConfig, titleColor : e.target.value});
        break;
      
        case "title-weight":
        setChartConfig({...chartConfig, weight : e.target.value});
        break;

        case "data-label":
        setChartConfig({...chartConfig, dataLabel : e.target.value});
        break;

        case "legend-vis":
          setChartConfig({...chartConfig, showLegend : JSON.parse(e.target.value)});
          break;

        case "legend-position":
          setChartConfig({...chartConfig, legendPos : e.target.value});
          break;
  
        case "legend-color":
          setChartConfig({...chartConfig, legendLabColor : e.target.value});
          break;
        
        case "chart-spacing":
          setChartConfig({...chartConfig, chartPadding : e.target.value});
          break;

      default:
        console.log("No Changes Incorporated.");
        break;
    }
  };

  return (
    <>
      <h1 className={"head"}> Welcome to Data Visualization Tool. </h1>
      {
    chartConfig.chartType !== "" ?  
    <div>
    <a id="download" download="triangle.png" href="img-down">
      <button type="button" onClick={handleDownload}>Download</button>
    </a>
    </div>: <></>

   } 
      <div className="form-area">

      <label>Choose Chart Type : </label>
             <select id="chart-type" name="chart-type" onChange={handleTitleChange} defaultValue={""}>
               <option value=""> -- Select Chart Type -- </option>
               <option value="bar">Bar Chart</option>
               <option value="column">Column Chart</option>
               <option value="bubble">Bubble Chart</option>
               <option value="doughnut">Doughnut Chart</option>
               <option value="pie">Pie Chart</option>
               <option value="line">Line Chart</option>
               <option value="polar-area">Polar Area Chart</option>
               <option value="scatter">Scatter Chart</option>
             </select><br/>
             
        {chartConfig.chartType !== "" ? 
           <div className="static-data">
             
             <label>Chart Title : </label>
             <input
               type={"text"}
               placeholder={"Enter the Chart Title"}
               name="chart-title"
               value={chartConfig.title}
               onChange={handleTitleChange}
             /> <br/>
   
             <label>Align Title : </label>
             <select id="align-title" name="align-title" onChange={handleTitleChange} defaultValue={"center"}>
               <option value="start">Left</option>
               <option value="center">Center</option>
               <option value="end">Right</option>
             </select>
             
             <br/>
   
             <label>Title Position : </label>
             <select id="title-position" name="title-position" onChange={handleTitleChange} defaultValue={"top"}>
               <option value="top">Top</option>
               <option value="left">Left</option>
               <option value="bottom">Bottom</option>
               <option value="right">Right</option>
             </select>
             <br/>
   
             
             <label>Title Font-Size : </label>
             <input type="range" id="font-size" name="font-size"
             min="12" max="40" onChange={handleTitleChange} value={chartConfig.fontSize}/>
             <br/>
   
             <label> Title Color : </label>
             <input id="title-color" name="title-color" type={"color"} onChange={handleTitleChange} />
             <br/>
   
             <label>Title Font Weight : </label>
             <input type="range" id="title-weight" name="title-weight"
             min="100" max="900" step="100" onChange={handleTitleChange} value={chartConfig.weight}/>
             <br/><br/>
   
             <label> Chart Background : </label>
             <input id="bgcolor" name="bgcolor" type={"color"} onChange={handleCanvasBg}/>
             <br/>
   
             <label> Chart Spacing : </label>
             <input type="range" id="chart-spacing" name="chart-spacing"
             min="10" max="100" onChange={handleTitleChange} value={chartConfig.chartPadding}/>
             <br/><br/>
   
             <label>Data Labels : </label>
             <input
               type={"text"}
               placeholder={"Enter the data label"}
               name="data-label"
               value={chartConfig.dataLabel}
               onChange={handleTitleChange}
             /> <br/>
   
             <label>Display Legend : </label>
             <input type="radio" id="visible" name="legend-vis" value="true" onChange={handleTitleChange}/>
             <label>Show</label>
             <input type="radio" id="hide" name="legend-vis" value="false" onChange={handleTitleChange}/>
             <label>Hide</label><br/>
   
            <label>Legend Position : </label>
             <select id="legend-position" name="legend-position" onChange={handleTitleChange} defaultValue={"bottom"}>
               <option value="top">Top</option>
               <option value="bottom">Bottom</option>
             </select>
             <br/>
   
             <label> Legend Label Color : </label>
             <input id="legend-color" name="legend-color" type={"color"} onChange={handleTitleChange} />
             <br/>
   
           </div>
           : <></>
        }
        <br />
        
      </div>
    <div className="chart-container" id="chart-area">
      {
        chartConfig.chartType === "pie" ? <PieChart chartConfigData={chartConfig}/> 
        : console.log()
      }
      {
        chartConfig.chartType === "bar" ? <BarChart chartConfigData={chartConfig} chartAxis={"y"}/> 
        : console.log()
      }
      {
        chartConfig.chartType === "column" ? <BarChart chartConfigData={chartConfig} chartAxis={"x"}/> 
        : console.log()
      }
      {
        chartConfig.chartType === "bubble" ? <BubbleChart chartConfigData={chartConfig}/> 
        : <></>
      }
      {
        chartConfig.chartType === "doughnut" ? <DoughnutChart chartConfigData={chartConfig}/> 
        : <></>
      }
      {
        chartConfig.chartType === "line" ? <LineChart chartConfigData={chartConfig}/> 
        : <></>
      }
      {
        chartConfig.chartType === "polar-area" ? <PolarAreaChart chartConfigData={chartConfig}/> 
        : <></>
      }
      {
        chartConfig.chartType === "scatter" ? <ScatterChart chartConfigData={chartConfig}/> 
        : <></>
      }
    </div>

  
    </>
  );
};

export default Main;
