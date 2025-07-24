import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
// somewhere once (e.g., index.js)
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        children : [
            {
                path : '',
                element:<Home/>
            },
            //create more children and use
        ]
    }
])

export default router 