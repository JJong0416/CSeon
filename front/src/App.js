import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./component/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./component/MainPage";
import RedirectPage from "./component/RedirectPage";
import Header from "./component/Header";
import QuestionsList from "./component/questions/QuestionsList";
import QuestionsDetail from "./component/questions/QuestionsDetail";
import QuestionRequest from "./component/questions/QuestionRequest";
import WorkbookList from "./component/workbook/WorkbookList";
import WorkbookDetail from "./component/workbook/WorkbookDetail";
import CompetitionList from "./component/competition/CompetitionList";
import CompetitionDetail from "./component/competition/CompetitionDetail";

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
          <Route path="/questionslist" element={<QuestionsList />}></Route>
          <Route path="/questionsdetail" element={<QuestionsDetail />}></Route>
          <Route path="/questionrequest" element={<QuestionRequest />}></Route>
          <Route path="/workbooklist" element={<WorkbookList />}></Route>
          <Route path="/workbookdetail" element={<WorkbookDetail />}></Route>
          <Route path="/competitionlist" element={<CompetitionList />}></Route>
          <Route path="/competitiondetail" element={<CompetitionDetail />}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
