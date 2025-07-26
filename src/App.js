import './App.css';
import { Outlet } from 'react-router-dom';



function App() {
  return (
    <div className="root overflow-hidden noscroll scroll-smooth ">
      <Outlet/>
    </div>
   
  );
}

export default App;
