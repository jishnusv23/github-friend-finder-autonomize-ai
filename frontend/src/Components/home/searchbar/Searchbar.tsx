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
import { toast } from "sonner";

const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  // console.log(
  //   "🚀 ~ file: Searchbar.tsx:10 ~ Searchbar ~ inputValue:",
  //   inputValue
  // );
  const [loading, setLoading] = useState(false);
  const handleInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleClear = () => {
    setInputValue("");
  };
  const handleReset = () => {
    setInputValue("");
    setLoading(false);
    dispatch(updateUserInfo({}));
    dispatch(updateUserRepositories([]));
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
      if (axios.isAxiosError(error)) {
        setLoading(false);
        console.error("Error fetching:", error.response?.data || error.message);
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        setLoading(false);
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
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
              onClick={handleClear}
              style={{ backgroundColor: "red" }}
            />
            <Button
              text="Reset"
              onClick={handleReset}
              style={{ backgroundColor: "orange" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
