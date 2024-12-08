import React, { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "../../node_modules/axios/lib/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 2;

  const token = localStorage.getItem("token");
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    if (token) {
      fetchTodos(currentPage);
    }
  }, [token]);

  const fetchTodos = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/tasks?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const { tasks, currentPage, totalPages } = response.data;
      setTodos(tasks);

      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStartEditing = (id, currentText) => {
    setEditingTodoId(id);
    setEditingText(currentText);
  };

  const handleCreate = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post(
        "http://localhost:5000/tasks",
        { title: newTodo, completed: false },

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success("Successfully added");
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to Create Please try again."
      );
    }
  };
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${id}`,
        { title: editingText },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success("Successfully Updated");
      await fetchTodos();
      setEditingTodoId(null);
      setEditingText("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to Update Please try again."
      );
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      toast.success("Successfully Deleted");
      fetchTodos();
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to Delete Please try again."
      );
    }
  };

  const handleCancelEditing = () => {
    setEditingTodoId(null);
    setEditingText("");
  };

  async function handleSignOut() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      toast.success("Logout Success");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout Successfully");
    }
  }

  const navigation = [{ name: "Dashboard", href: "#", current: true }];

  return (
    <div>
      <ToastContainer />
      <Disclosure as="nav" className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-indigo-600 text-white"
                          : "text-gray-600 hover:bg-gray-200 hover:text-gray-800",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      onClick={handleSignOut}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-800",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      <div className="max-w-7xl mx-auto mt-8 px-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          To-Do List
        </h2>

        {loading && <div>Loading...</div>}

        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm border border-gray-200"
            >
              {editingTodoId === todo._id ? (
                <div className="flex flex-1 items-center">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="p-2 flex-1 rounded-md border border-gray-300"
                    placeholder="Edit your task"
                  />
                  <button
                    onClick={() => handleUpdate(todo._id)}
                    className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditing}
                    className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center flex-1">
                  <span
                    className={
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-900"
                    }
                  >
                    {todo.title}
                  </span>
                </div>
              )}

              <div className="flex space-x-2">
                {editingTodoId !== todo._id && (
                  <>
                    <button
                      onClick={() => handleStartEditing(todo._id, todo.title)}
                      className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-2 sm:px-6 lg:px-8">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="p-2 rounded-md border border-gray-300 w-full"
          placeholder="Enter new task"
        />
        <button
          onClick={handleCreate}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
