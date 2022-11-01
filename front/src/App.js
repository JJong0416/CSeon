import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./component/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./component/MainPage";
import RedirectPage from "./component/RedirectPage";
import Header from "./component/Header";
import SolvePage from "./component/SolvePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header></Header>
        </div>
        <Routes>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route path="/oauth/redirect" element={<RedirectPage />}></Route>
          <Route path="/mainpage" element={<MainPage />}></Route>
          <Route path="/solve" element={<SolvePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
