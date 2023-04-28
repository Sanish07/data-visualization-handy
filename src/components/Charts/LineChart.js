import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ chartConfigData }) => {

  const [chartData, setData] = useState({
    id: 1,
    data: [],
  });

  const [extraSettings,setExtraSets] = useState({
    borderColor : "#000000",
    pointStyle : "butt",
    borderWidth : 3,
    pointColor : "#000000"
  });

  const [currentEntry, setCurrentEntry] = useState({
    // id : chartData.id,
    xdata: 0,
    ydata: 0,
  });

  const handleExtraSets = (e) =>{
    if(e.target.id === "ex-borCol"){
      setExtraSets({...extraSettings, borderColor : e.target.value})
    } else if(e.target.id === "cap-style"){
      setExtraSets({...extraSettings, pointStyle : e.target.value});
    } else if(e.target.id === "ex-borWid"){
      setExtraSets({...extraSettings, borderWidth : e.target.value});
    }else if(e.target.id === "ex-ptCol"){
      setExtraSets({...extraSettings, pointColor : e.target.value});
    }
  }

  const handleCurrentChange = (e) => {
    let currentChangeField = e.target.id.split("-");
    const changeKey = currentChangeField[0];

    if(changeKey === "cx"){
      setCurrentEntry({...currentEntry, xdata : e.target.value});
    } else if(changeKey === "cy"){
      setCurrentEntry({...currentEntry, ydata : e.target.value});
    }
  };

  const handleFieldAdd = () => {
    let newId = chartData.id + 1;
    let newEntry = {...currentEntry};
    newEntry.id = chartData.id;
    let newArr = [...chartData.data, newEntry];
    setData({...chartData, id : newId, data : newArr});
  };

  const handleFieldDelete = (e) => {
    const deletePos = Number(e.target.id.split("-")[1]);
    let newArr = chartData.data.filter((entry)=>{
      return entry.id !== deletePos; 
    });
    setData({...chartData, data : newArr});
  }

  const changeChartData = (e) =>{
    let changeFields = e.target.id.split("-");
    const changeKey = changeFields[0];
    const changeID = Number(changeFields[1]);
    chartData.data.forEach((entry, index)=>{
      
      if(entry.id === changeID && changeKey === "x"){
        let newArr = [...chartData.data];
        newArr[index] = {...chartData.data[index], xdata : e.target.value};
        setData({...chartData, data : newArr});
      } else if(entry.id === changeID && changeKey === "y"){
        let newArr = [...chartData.data];
        newArr[index] = {...chartData.data[index], ydata : e.target.value};
        setData({...chartData, data : newArr});
      } 

    })
  };

  return (
    <>
    
    <div id="extra-settings">
      <label>Select Line Border-Fill Color : </label>
      <input type="color" value={extraSettings.borderColor} onChange={handleExtraSets} id="ex-borCol"/><br/>
      <label>Select Point Border-Fill Color : </label>
      <input type="color" value={extraSettings.pointColor} onChange={handleExtraSets} id="ex-ptCol"/><br/>
      
      <label>Select Line Point Style : </label>
             <select id="cap-style" name="cap-style" onChange={handleExtraSets} defaultValue={"circle"}>
               <option value="circle">Circle</option>
               <option value="crossRot">Cross</option>
               <option value="rect">Rectangle</option>
               <option value="star">Star</option>
               <option value="triangle">Triangle</option>
               <option value="line">Line</option>
      </select><br/>
      <label>Select Line Width : </label>
      <input type="range" min={1} max={10} onChange={handleExtraSets} id="ex-borWid" value={extraSettings.borderWidth}/><br/>
    </div>
    {
      chartData.data.map((entry,index) =>(
        <div key={entry.id} className="entryData">
          <label>Field {index + 1} : </label>
          <label>Enter Data (x-axis) : </label>
          <input type="number" value={entry.xdata} onChange={changeChartData} 
          id={"x-"+entry.id}/> &nbsp;
          <label>Enter Value (y-axis) : </label>
          <input type="number" min={0} value={entry.ydata} onChange={changeChartData} id={"y-"+entry.id}/> &nbsp;
          <button onClick={handleFieldDelete} id={"del-"+entry.id}>Delete Field</button>
        </div>
      ))
    }
          <br/>
        
          <label>New Field : </label>
          <label>Enter Data (x-axis) : </label>
          <input type="number" onChange={handleCurrentChange} 
          id={"cx-"+currentEntry.id}/> &nbsp;
          <label>Enter Value (y-axis) : </label>
          <input type="number" min={0} onChange={handleCurrentChange} id={"cy-"+currentEntry.id}/> &nbsp;
          <button onClick={handleFieldAdd} id={"add-"+chartData.id}>Add Field</button>
    
      <Line id="chart-canvas"
        data={ 
          {
          labels : chartData.data.map((mdata)=>mdata.xdata),
          datasets : [
            {
              label: chartConfigData.dataLabel,
              data: chartData.data.map((mdata) => mdata.ydata),
              // backgroundColor: extraSettings.fieldColor,
              borderColor: extraSettings.borderColor,
              borderWidth: extraSettings.borderWidth,
              pointStyle : extraSettings.pointStyle,
              pointBorderColor : extraSettings.pointColor
            }
          ], }
        }
        options={{
          layout : {
            padding : chartConfigData.chartPadding,
          }
          ,plugins: {
            title: {
              display: true,
              text: chartConfigData.title,
              align : chartConfigData.align,
              color : chartConfigData.titleColor,
              position : chartConfigData.position,
              font : {
                weight : chartConfigData.weight,
                size : chartConfigData.fontSize
              }
            },
            legend : {
              display : chartConfigData.showLegend,
              position : chartConfigData.legendPos,
              labels : {
                color : chartConfigData.legendLabColor
              }
            }
          },
        }}
      />
    
    </>
  )
}

export default LineChart