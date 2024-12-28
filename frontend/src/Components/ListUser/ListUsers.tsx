import React, { useEffect, useState } from "react";
import Input from "../ui/Input/Input";
import "./ListUsers.css";
import { CLIENT_API } from "../../utils/axios/axios";
import { User } from "../../types";
import Button from "../ui/Button/Button";
import ConfirmationModal from "../ui/Modal/ConfirmationModal";
import { response } from "express";
import LoadingPopUp from "../ui/LoadingPopUp/LoadingPopUp";

const ListUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await CLIENT_API.get(`/api/get-users`, {
          params: { page, limit, search },
        });
        setUsers(response.data.users);
        setTotal(response.data.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users", error);
        setLoading(false)
      }
    };
    fetchUsers();
  }, [page, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePage = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleDelete = (userId: string) => {
   
    setSelectedUserId(userId);
    setIsDelete(true);
  };

  const handleDeleteCancel = () => {
    setIsDelete(false);
    setSelectedUserId(null);
  };

  const handleDeleteConfirm = async () => {

    if (!selectedUserId) return;

    try {
      setLoading(true);
     const response= await CLIENT_API.delete(`/api/delete-user/${selectedUserId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUserId)
      );
      if(response.data.success){
        console.log('first')
    }
    setIsDelete(false);
    setSelectedUserId(null);
        setLoading(false);
    } catch (error) {
      console.error("Error deleting user", error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingPopUp />}
      <div className="listusers">
        <Input
          placeholder="Search user"
          value={search}
          onChange={handleSearch}
        />
        <table>
          <thead>
            <tr className="table-headers">
              <th>Si.No</th>
              <th>Avatar</th>
              <th>Username</th>
              <th>Type</th>
              <th>Followers</th>
              <th>Following</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={user.avatar_url}
                    alt={`${user.name}'s avatar`}
                    width="50"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.type}</td>
                <td>{user.followers}</td>
                <td>{user.following}</td>
                <td>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    text="Remove"
                    style={{ backgroundColor: "red" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
            <button key={i + 1} onClick={() => handlePage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {isDelete && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          isDelete={loading}
          showModal={isDelete}
        />
      )}
    </>
  );
};

export default ListUsers;
