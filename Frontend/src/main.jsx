import React from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Test from "./test.jsx";
import "./index.css";
import Form from "./routes/Form.jsx"
import Dashboard from "./routes/Dashboard.jsx";



const DynamicDashboard = () => {

  let { link } = useParams();


  return <Dashboard link={link} />;
};

const DynamicForm = () => {
m
  let { link } = useParams();


  return <Form video_url={link} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/form",
    element: <DynamicForm />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "/dashboard/:link",
    element: <DynamicDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
