'use client';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState("");
  const [showModal, setShowModal] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages("");

    if (!formValues.name || !formValues.email || !formValues.password) {
      setMessages("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/register", formValues);
      if (response.status === 200) {
        setShowModal(true); // Show success modal
        setMessages(""); // Clear error messages

        setTimeout(() => {
          window.location.href = "/SignIn"; // Redirect to sign-in page
        }, 1500);
      } else {
        setMessages(response.data.message || "An error occurred.");
      }
    } catch (error) {
      setMessages(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-neutral-900 shadow-md rounded-lg w-[350px] p-6">
        <h2 className="text-2xl font-bold text-center text-slate-200 mb-4">Register</h2>
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full">
            <label htmlFor="name" className="sr-only">Username</label>
            <input
              id="name"
              name="name"
              placeholder="Username"
              className="w-full p-2 border border-gray-700 bg-transparent rounded-lg mb-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.name}
              onChange={handleInputChange}
            />
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-700 bg-transparent rounded-lg mb-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.email}
              onChange={handleInputChange}
            />
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-700 bg-transparent rounded-lg mb-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formValues.password}
              onChange={handleInputChange}
            />
            <span className="text-sm text-red-600 flex items-center justify-center">{messages}</span>
            <button
              type="submit"
              className="w-full bg-neutral-950 text-white p-2 rounded-lg flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Please wait
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="/SignIn" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-950 bg-opacity-50">
          <div className="bg-neutral-950 p-6 rounded-lg w-[300px]">
            <h3 className="text-center text-xl font-semibold text-yellow-400">Registration Successful! ✅</h3>
            <p className="text-center text-gray-600 mt-2">You are being redirected...</p>
            <button
              onClick={closeModal}
              className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
