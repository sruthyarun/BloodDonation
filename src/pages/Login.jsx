import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import login from "../assets/login.jpg";
import { FaArrowLeft } from "react-icons/fa";


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        role: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!loginData.role) {
            alert("Please select a role.");
            return;
        }

        let endpoint = "";
        let dashboard = "";

        switch (loginData.role) {
            case "Donor":
                endpoint = "donors";
                dashboard = "/donor-dashboard";
                break;

            case "Recipient":
                endpoint = "recipients";
                dashboard = "/recipient-dashboard";
                break;

            case "Hospital":
                endpoint = "hospitals";
                dashboard = "/hospital-dashboard";
                break;

            case "Blood Bank":
                endpoint = "bloodBanks";
                dashboard = "/bloodbank-dashboard";
                break;

            case "Admin":
                endpoint = "admin";
                dashboard = "/admin-dashboard";
                break;

            default:
                alert("Invalid role selected.");
                return;
        }

        try {
            const response = await fetch(
                `https://blood-donation-backend-olwl.onrender.com/${endpoint}`
            );

            if (!response.ok) {
                throw new Error("Unable to connect to server");
            }

            const users = await response.json();

            const user = users.find(
                (item) =>
                    item.email === loginData.email &&
                    item.password === loginData.password
            );

            if (!user) {
                alert("Invalid Email or Password");
                return;
            }

            // Save logged in user in Redux
            dispatch(loginUser(user));

            // Save in Local Storage
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(user)
            );

            alert("Login Successful!");

            navigate(dashboard);
        } catch (error) {
            console.error(error);
            alert("Server Error! Make sure json-server is running.");
        }
    };

    return (
        <>

            <div className="min-h-screen bg-gradient-to-r from-red-100 via-white to-pink-100 flex items-center justify-center px-4">

                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

                    {/* Left Section */}
                    <div
                        className="bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${login})`,
                        }}
                    >
                        <div className="w-full h-full bg-red-900/50 flex items-center justify-center p-8">
                            <div className="text-center text-white">
                                <h1 className="text-4xl font-bold">
                                    Blood Donation System
                                </h1>

                                <p className="mt-6 text-lg leading-8">
                                    Every Login Supports a Life.
                                    <br />
                                    Together we can save lives by donating blood.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="p-10">


                        <h2 className="text-3xl font-bold text-gray-700 mb-2">
                            Welcome Back
                        </h2>


                        <p className="text-gray-500 mb-8">
                            Login to your account
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {/* Role */}
                            <div>
                                <label className="block mb-2 font-semibold">
                                    Login As
                                </label>

                                <select
                                    name="role"
                                    value={loginData.role}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="Donor">Donor</option>
                                    <option value="Recipient">Recipient</option>
                                    <option value="Hospital">Hospital</option>
                                    <option value="Blood Bank">Blood Bank</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-2 font-semibold">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleChange}
                                    placeholder="Enter Email"
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block mb-2 font-semibold">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    Remember Me
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-red-600 hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
                            >
                                Login
                            </button>
                        </form>

                        <p className="text-center mt-6">
                            Don't have an account?

                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium m-4"
                            >
                                <FaArrowLeft />
                                Back to Register
                            </Link>
                        </p>

                    </div>

                </div>



            </div >
        </>
    );
}

export default Login;