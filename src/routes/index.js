// src/routes.js
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TermsandCom from "../components/T&C";
import PrivacyPolicy from "../components/PrivacyPolicy";
gsap.registerPlugin(ScrollTrigger);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: "terms-and-community-guidelines",
        element: <TermsandCom/>
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy/>
      }
    ]
  }
]);

export default router;