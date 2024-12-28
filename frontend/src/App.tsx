import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Repo from "./pages/Repositories/Repo";
import FollowersPage from "./pages/Followers/FollowersPage";
import FollowerProfilePage from "./pages/FollowerProfile/FollowerProfilePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/single-repo/:repoName" element={<Repo/>}/>
          <Route path="/followers/:userName" element={<FollowersPage/>}/>
          <Route path="/followerProfile/:userName" element={<FollowerProfilePage/>}/>
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
