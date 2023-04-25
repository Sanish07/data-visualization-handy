import './app.scss';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Main from './components/Main';

Chart.register(CategoryScale);
 
const App = () =>{
  return (
    <div className="App">
      <Main/>
    </div>
  )
}

export default App;