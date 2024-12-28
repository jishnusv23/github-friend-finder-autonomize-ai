import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Repo from "./pages/Repositories/Repo";
import FollowersPage from "./pages/Followers/FollowersPage";
import FollowerProfilePage from "./pages/FollowerProfile/FollowerProfilePage";
import UsersListPage from "./pages/Users/UsersListPage";
import NotFound from "./Components/ui/404/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/single-repo/:repoName" element={<Repo/>}/>
          <Route path="/followers/:userName" element={<FollowersPage/>}/>
          <Route path="/followerProfile/:userName" element={<FollowerProfilePage/>}/>
          <Route path="/userslist" element={<UsersListPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
