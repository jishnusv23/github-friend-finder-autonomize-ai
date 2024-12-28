import React, { useState } from "react";
import "./Searchbar.css";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import LoadingPopUp from "../../ui/LoadingPopUp/LoadingPopUp";
import { CLIENT_API } from "../../../utils/axios/axios";
import { useDispatch } from "react-redux";
import { updateUserInfo, updateUserRepositories } from "../../../redux/slice";
import axios from "axios";
import { endpoints } from "../../../utils/api";

const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  console.log(
    "🚀 ~ file: Searchbar.tsx:10 ~ Searchbar ~ inputValue:",
    inputValue
  );
  const [loading, setLoading] = useState(false);
  const handleInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await CLIENT_API.get(`/api/create-user/${inputValue}`);
      // console.log(
      //   "🚀 ~ file: Searchbar.tsx:13 ~ handleSubmit ~ response:",
      //   response
      // );
      dispatch(updateUserInfo(response.data));

      const repos = await axios.get(
        `${endpoints.gitHubData}${inputValue}/repos`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );
      // console.log("🚀 ~ file: Searchbar.tsx:40 ~ handleSubmit ~ repos:", repos);
      dispatch(updateUserRepositories(repos.data));
      setLoading(false);
    } catch (error: any) {
      console.error("something wrong", error);
    }
  };
  return (
    <>
      {loading && <LoadingPopUp />}
      <div className="searchbar">
        <div className="input-section">
          <Input
            placeholder="Find your GitHub profile here "
            value={inputValue}
            onChange={handleInputValues}
          />
          <div className="buttons">
            <Button
              text="Search"
              onClick={handleSubmit}
              style={{ backgroundColor: "green" }}
            />
            <Button
              text="Clear"
              onClick={() => console.log("Clear")}
              style={{ backgroundColor: "red" }}
            />
            <Button
              text="Reset"
              onClick={() => console.log("Reset")}
              style={{ backgroundColor: "orange" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
