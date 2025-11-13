import React, { useEffect, useState, useMemo } from "react";
import axios from "../../config/axios.js";
import { X, Loader2 } from "lucide-react";
import Button from "../ui/button/button.jsx";
import Input from "../ui/input/input.jsx";

export default function AddUserModal({
  isModalOpen,
  setIsModalOpen,
  isModalVisible,
  projectId,
  existingUserIds = [],
}) {
  const [modalLoading, setModalLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [allAvailableUsers, setAllAvailableUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      const idsToExcludeSet = new Set(existingUserIds);
      const getUsers = async () => {
        try {
          setModalLoading(true);
          const response = await axios.get("/users/getAll");

          // Assuming response.data.users is the array
          const formattedUsers = response.data.users.map((user) => ({
            id: user._id,
            name: user.firstname,
            email: user.email,
          }));
          
          const availableUsers = formattedUsers.filter(
            (user) => !idsToExcludeSet.has(user.id)
          );
          setAllAvailableUsers(availableUsers);
          setError(null);
        } catch (err) {
          console.error("Failed to fetch users:", err);
          setError("Failed to load users.");
        } finally {
          setModalLoading(false);
        }
      };
      getUsers();
    }
  }, [isModalOpen]);

  const handleAddUser = async (userId) => {
    try {
      await axios.put("/project/add-user", {
        projectId: projectId,
        users: [userId],
      });

      console.log("Added user on component load");
      setAllAvailableUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (err) {
      console.error("Failed to add user on load:", err);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return allAvailableUsers;
    }

    return allAvailableUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allAvailableUsers]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${
          isModalVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsModalOpen(false)}
      />

      <div
        className={`fixed inset-y-0 left-0 w-96 bg-gray-950 shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${
          isModalVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Add User to Project
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1 hover:bg-gray-800 rounded-md transition-colors"
            >
              <X className="h-5 w-5 text-gray-300" />
            </button>
          </div>

          <div className="space-y-4 flex flex-col flex-1">
            <div>
              <label
                htmlFor="user-search"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Find User
              </label>
              <Input
                id="user-search"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex-1 max-h-full overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {modalLoading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
                  <p className="ml-2 text-gray-400">Loading users...</p>
                </div>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-3 px-6 bg-gray-800 rounded-[40px] 
                           transition-all duration-300 ease-out 
                           hover:bg-gray-700 hover:scale-[1.01] cursor-pointer m-2"
                  >
                    <div>
                      <p className="font-medium bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddUser(user.id);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 py-4">
                  {error || "No users found."}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-700">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
