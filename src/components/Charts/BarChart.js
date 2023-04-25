import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartConfigData, chartAxis }) => {
  const [chartData, setData] = useState({
    id: 1,
    data: [],
  });

  useEffect(()=>{
    let newArr = []; //For Field Color
    let newArr2 = []; //For Border Colors
    chartData.data.forEach((entry)=>{
      newArr.push(entry.fieldColor);
      newArr2.push(entry.borderColor);
    });
    setFieldColor(newArr);
    setFieldBorderColors(newArr2);
  },[chartData]);

  const [fieldColors, setFieldColor] = useState([]);

  const [fieldBorderColors,setFieldBorderColors] = useState([]);

  const [currentEntry, setCurrentEntry] = useState({
    // id : chartData.id,
    xdata: "",
    ydata: 0,
    fieldColor : "#000000",
    borderColor : "#1f1f1f"
  });

  const [extraSettings,setExtraSets] = useState({
    borderWidth : 2,
    barThickness : 60, //10-60
    borderRadius : 10, //1-30
  });

  const handleExtraSets = (e) =>{
    if(e.target.id === "ex-borWid"){
      setExtraSets({...extraSettings, borderWidth : e.target.value})
    } else if(e.target.id === "ex-barThick"){
      setExtraSets({...extraSettings, barThickness : e.target.value})
    } else if(e.target.id === "ex-borRad"){
      setExtraSets({...extraSettings, borderRadius : e.target.value})
    }
  }

  const handleCurrentChange = (e) => {
    let currentChangeField = e.target.id.split("-");
    const changeKey = currentChangeField[0];

    if(changeKey === "cx"){
      setCurrentEntry({...currentEntry, xdata : e.target.value});
    } else if(changeKey === "cy"){
      setCurrentEntry({...currentEntry, ydata : e.target.value});
    } else if(changeKey === "cc"){
      setCurrentEntry({...currentEntry, fieldColor : e.target.value});
    }else if(changeKey === "cbc"){
      setCurrentEntry({...currentEntry, borderColor : e.target.value});
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
      } else if(entry.id === changeID && changeKey === "c"){
        let newArr = [...chartData.data];
        newArr[index] = {...chartData.data[index], fieldColor : e.target.value};
        setData({...chartData, data : newArr});
      } else if(entry.id === changeID && changeKey === "bc"){
        let newArr = [...chartData.data];
        newArr[index] = {...chartData.data[index], borderColor : e.target.value};
        setData({...chartData, data : newArr});
      }

    })
  };

  return (
    <>
    <div id="extra-settings">
      <label>Select Border Width : </label>
      <input type="range" min={0} max={5} onChange={handleExtraSets} id="ex-borWid"/><br/>

      <label>Set Bar Thickness : </label>
      <input type="range" min={25} max={65} onChange={handleExtraSets} id="ex-barThick"/><br/>

      
      <label>Set Border Radius : </label>
      <input type="range" min={1} max={30} onChange={handleExtraSets} id="ex-borRad"/><br/>
    </div>

    {
      chartData.data.map((entry,index) =>(
        <div key={entry.id} className="entryData">
          <label>Field {index + 1} : </label>
          <label>Enter Data (x-axis) : </label>
          <input type="text" value={entry.xdata} onChange={changeChartData} 
          id={"x-"+entry.id}/> &nbsp;
          <label>Enter Value (y-axis) : </label>
          <input type="number" min={0} value={entry.ydata} onChange={changeChartData} id={"y-"+entry.id}/> &nbsp;
          <label>Select Background : </label>
          <input type="color" value={entry.fieldColor} onChange={changeChartData} id={"c-"+entry.id}/> &nbsp;
          <label>Select Field Border : </label>
          <input type="color" value={entry.borderColor} onChange={changeChartData} id={"bc-"+entry.id}/> &nbsp;
          <button onClick={handleFieldDelete} id={"del-"+entry.id}>Delete Field</button>
        </div>
      ))
    }
          <br/>
        
          <label>New Field : </label>
          <label>Enter Data (x-axis) : </label>
          <input type="text" onChange={handleCurrentChange} 
          id={"cx-"+currentEntry.id}/> &nbsp;
          <label>Enter Value (y-axis) : </label>
          <input type="number" min={0} onChange={handleCurrentChange} id={"cy-"+currentEntry.id}/> &nbsp;
          <label>Select Background : </label>
          <input type="color" onChange={handleCurrentChange} id={"cc-"+chartData.id} value={currentEntry.fieldColor}/> &nbsp;
          <label>Select Field Border : </label>
          <input type="color" value={currentEntry.borderColor} onChange={handleCurrentChange} id={"cbc-"+currentEntry.id}/> &nbsp;
          <button onClick={handleFieldAdd} id={"add-"+chartData.id}>Add Field</button>
    
      <Bar id="chart-canvas"
        data={ 
          {
          labels : chartData.data.map((mdata)=>mdata.xdata),
          datasets : [
            {
              label: chartConfigData.dataLabel,
              data: chartData.data.map((mdata) => mdata.ydata),
              backgroundColor: fieldColors,
              borderColor: fieldBorderColors,
              borderWidth: extraSettings.borderWidth,
              barThickness: extraSettings.barThickness,
              borderRadius : extraSettings.borderRadius,
            }
          ], }
        }
        options={{
          indexAxis : chartAxis,
          layout : {
            padding : chartConfigData.chartPadding,
          },
          plugins: {
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
  );
}
export default BarChart;