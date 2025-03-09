import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("Name:", name);
    console.log("Age:", age);
    console.log("Phone Number:", phoneNumber);

    try {
      const res = await axios.post("http://localhost:8081/api/users", {
        name,
        age,
        phone_number: phoneNumber, // Backend expects `phone_number`
      });

      console.log("Response:", res.data);

      // Clear form fields after successful submission
      setName("");
      setAge("");
      setPhoneNumber("");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submitHandler}>
        <h1>Login Page</h1>

        <div className="input-group">
          <label htmlFor="name" className="input-label">
            Name
          </label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            placeholder="Enter your name"
            className="login-input"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="age" className="input-label">
            Age
          </label>
          <input
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            id="age"
            placeholder="Enter your age"
            className="login-input"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="phoneNumber" className="input-label">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            id="phoneNumber"
            placeholder="Enter your phone number"
            className="login-input"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <p>Don't have an account?</p>
    </div>
  );
};

export default Login;
