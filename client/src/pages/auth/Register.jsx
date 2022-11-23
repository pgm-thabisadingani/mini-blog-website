import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })); // setting maltiple state changes
  };

  // asyn, coz we are making an API request
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh after submit
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          className=""
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          className=""
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          className=""
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
        {error && (
          <p className="text-red-600 text-xs text-center mt-2">
            This is an error
          </p>
        )}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
