import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Repo from "./pages/Repositories/Repo";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/single-repo/:repoName" element={<Repo/>}/>
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
