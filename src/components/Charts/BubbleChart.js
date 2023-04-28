import React, {useState} from 'react';
import { Bubble } from 'react-chartjs-2';

const BubbleChart = ({chartConfigData}) => {

  const [chartData,setData] = useState({
    id : 1,
    data : []
  });

  const [currentEntry,setCurrentEntry] = useState({
    x : 0,
    y : 0,
    r : 0
  });

  const [extraSettings, setExtraSets] = useState({
    bubbleBackground : "#000000"
  });

  const changeChartData = (e) =>{
    let changeFields = e.target.id.split("-");
    const changeKey = changeFields[0];
    const changeID = Number(changeFields[1]);
    chartData.data.forEach((entry, index)=>{
      
      if(entry.id === changeID && changeKey === "x"){
        let newArr = [...chartData.data];
        newArr[index] = {...chartData.data[index], x : e.target.value};
        setData({...chartData, data : newArr});
      } else if(entry.id === changeID && changeKey === "y"){
        let newArr = [...chartData.data];
        newArr[index] = {...chartData.data[index], y : e.target.value};
        setData({...chartData, data : newArr});
      } else if(entry.id === changeID && changeKey === "r"){
        let newArr = [...chartData.data];
        newArr[index] = {...chartData.data[index], r : e.target.value};
        setData({...chartData, data : newArr});
      }

    })

  }

  const handleCurrentChange = (e) =>{
    let currentChangeField = e.target.id.split("-");
    const changeKey = currentChangeField[0];

    if(changeKey === "cx"){
      setCurrentEntry({...currentEntry, x : e.target.value});
    } else if(changeKey === "cy"){
      setCurrentEntry({...currentEntry, y : e.target.value});
    } else if(changeKey === "cr"){
      setCurrentEntry({...currentEntry, r : e.target.value});
    }
  }

  const handleExtraSets = (e) =>{
    if(e.target.id === "ex-bubbleBg"){
       setExtraSets({...extraSettings, bubbleBackground : e.target.value});
    }
  }

  const handleFieldAdd = (e) =>{
    let newId = chartData.id + 1;
    let newEntry = {...currentEntry};
    newEntry.id = chartData.id;
    let newArr = [...chartData.data, newEntry];
    setData({...chartData, id : newId, data : newArr});
  } 

  
  const handleFieldDelete = (e) =>{
    const deletePos = Number(e.target.id.split("-")[1]);
    let newArr = chartData.data.filter((entry)=>{
      return entry.id !== deletePos; 
    });
    setData({...chartData, data : newArr});
  } 

  return (
    <>
    <div id="extra-settings">
      <label>Select Bubble Background : </label>
      <input type="color" onChange={handleExtraSets} id="ex-bubbleBg"/><br/>
    </div>

    {
      chartData.data.map((entry,index) =>(
        <div key={entry.id} className="entryData">
          <label>Field {index + 1} : </label>
          <label>Enter x data : </label>
          <input type="number" value={entry.x} onChange={changeChartData} 
          id={"x-"+entry.id}/> &nbsp;
          <label>Enter y data : </label>
          <input type="number" value={entry.y} onChange={changeChartData} id={"y-"+entry.id}/> &nbsp;
          <label>Set Bubble Radius : </label>
          <input type="range" value={entry.r} min={1} max={30} onChange={changeChartData} id={"r-"+entry.id}/> &nbsp;
          <button onClick={handleFieldDelete} id={"del-"+entry.id}>Delete Field</button>
        </div>
      ))
    }
          <br/>
        
          <label>New Field : </label>
          <label>Enter x data : </label>
          <input type="number" onChange={handleCurrentChange} 
          id={"cx-"+currentEntry.id}/> &nbsp;
          <label>Enter y data : </label>
          <input type="number" onChange={handleCurrentChange} id={"cy-"+currentEntry.id}/> &nbsp;
          <label>Set Bubble Radius : </label>
          <input type="range" min={1} max={30} onChange={handleCurrentChange} id={"cr-"+currentEntry.id}/> &nbsp;
          <button onClick={handleFieldAdd} id={"add-"+chartData.id}>Add Field</button>

    <Bubble id="chart-canvas"
        data={ 
          {
          datasets : [
            {
              label: chartConfigData.dataLabel,
              data: chartData.data,
              backgroundColor: extraSettings.bubbleBackground,
              borderColor : extraSettings.bubbleBackground
            }
          ], 
        }
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

export default BubbleChart