import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Login } from "./Pages/Login/Login";
import { ErrorPage } from "./Pages/Error/Error";

function App() {
  return (
    <Routes>
      <Route path="/login"  element={<Login />}></Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;
