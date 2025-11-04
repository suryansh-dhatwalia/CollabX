"use client";
import React, { useState, useContext } from "react";
import { Menu, X } from "lucide-react";
import { UserContext } from "../../context/user.context";
import axios from "../../config/axios.js";

export default function Navbar({ onProjectCreated }) { // ✅ receive callback

  const [isOpen, setIsOpen] = useState(false);
  const [isUserExpanded, setIsUserExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setprojectName] = useState("");
  const { user } = useContext(UserContext);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleUserExpand = () => setIsUserExpanded(!isUserExpanded);

  function createProject(e) {
    e.preventDefault();
    axios
      .post("/project/create", { name: projectName })
      .then((res) => {
        console.log(res);
        setShowModal(false);
        setprojectName(""); // ✅ clear input
        onProjectCreated?.(); // ✅ trigger refresh in parent
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#131313] border-b border-gray-700">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Hamburger Menu */}
          <div className="flex-shrink-0">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Center logo */}
          <div className="absolute left-16 top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2">
            <h1 className="text-l sm:text-2xl font-bold text-blue-500">
              CollabX
            </h1>
          </div>

          {/* Right user section */}
          <div className="flex items-center gap-4 ml-auto">
            <div
              className={`flex items-center gap-3 transition-all duration-300 ease-out ${
                isUserExpanded ? "w-auto" : "w-8"
              }`}
            >
              <button
                onClick={toggleUserExpand}
                className="p-1 sm:p-1.5 rounded-full hover:bg-gray-800 transition-colors duration-200 flex-shrink-0"
                aria-label="Toggle user menu"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">J</span>
                </div>
              </button>

              {isUserExpanded && (
                <span className="text-gray-200 font-medium whitespace-nowrap text-xs sm:text-sm animate-in fade-in duration-300">
                  Hello, John
                </span>
              )}
            </div>

            {isUserExpanded && (
              <div className="animate-in fade-in duration-300">
                <button
                  onClick={() => setIsUserExpanded(false)}
                  className="px-3 py-1.5 text-xs text-white border border-gray-600 rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-[#131313] backdrop-blur-sm z-40 animate-in fade-in duration-200">
          <div className="flex flex-col h-full pt-8 px-6">
            <nav className="flex flex-col gap-6">
              <a href="#" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>

            <div className="mt-8">
              <button
                onClick={() => setShowModal(!showModal)}
                className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <i className="ri-link"></i> New Project
              </button>

              {/* Modal */}
              {showModal && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-200/50 p-6 w-96">
                    <div className="flex items-center space-x-2 mb-4">
                      <i className="ri-folder-add-line text-xl text-[#6366F1]"></i>
                      <h2 className="text-xl font-semibold">New Project</h2>
                    </div>
                    <form onSubmit={createProject}>
                      <div className="mb-4">
                        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                          Project Name
                        </label>
                        <input
                          type="text"
                          id="projectName"
                          value={projectName}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter project name"
                          onChange={(e) => setprojectName(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors duration-200 mr-2"
                          onClick={() => setShowModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-[#6366F1] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#4F46E5] transition-colors duration-200"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}