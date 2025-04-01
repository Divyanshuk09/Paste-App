import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home";
import Pastes from "./components/Pastes";
import ViewPasteById from "./components/ViewPasteById";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar/>
        <Home/>
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar/>
        <Pastes/>
      </div>
    ),
  },
  {
    path: "/pastes/:pasteId",
    element: (
      <div>
        <Navbar/>
        <ViewPasteById/>
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
