import './App.css';
import { Outlet } from 'react-router-dom';



function App() {
  return (
    <div className="overflow-hidden noscroll">
      <Outlet/>
    </div>
   
  );
}

export default App;
