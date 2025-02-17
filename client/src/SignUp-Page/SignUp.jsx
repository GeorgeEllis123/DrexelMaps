import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import styles from "./SignUp.module.css";
import Header from "../Components/Header.jsx";
import { useNavigate } from "react-router-dom";

function SignUp() {
    // State to store form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [emailError, setEmailError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const navigate = useNavigate();
    // Function to handle changes in form fields
    const handleChange = (e) => {
        // Update formData state with the new value of the changed input field
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // Function to handle form submission
    const handleSubmit = async (e) => {
      setEmailError("");
      setConfirmPasswordError("");
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Send form data to the backend using Axios POST request
            const response = await axios.post("http://localhost:3000/api/signup", formData);
            console.log(response.data); // Log response from the backend
            const { token } = response.data
            localStorage.setItem('token', token);
            navigate('/Profile');
        } catch (error) {
            console.error("Error signing up:", error);
            console.log(error.response.data);
            if (error.response.data.emailExists){
              setEmailError("Email has already been used");
            }
            if (error.response.data.passwordsAreDifferent){
              setConfirmPasswordError("Passwords do not match");
            }
            if (error.response.data.passwordFailedCriteria){
              setConfirmPasswordError(
              <>
                <p>Password must contain the following:</p>
                <ul>
                  <li>At least one lower-case alphabet letter</li>
                  <li>At least one upper-case alphabet letter</li>
                  <li>At least one number</li>
                  <li>At least one special character</li>
                  <li>Minimum length of 8 characters</li>
                </ul>
              </>
              );
            }
        }
    };

  return (
    <>
      <Header />
      <form className={styles.SignUpform} onSubmit={handleSubmit}>
        <div>
          <h1 className={styles.header}>Sign Up</h1>

          <label className={styles.SignUpLabel}>Name:</label>
          <input
            className={styles.SignUpInput}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name here"
          />

          <label className={styles.SignUpLabel}>Email:</label>
          <input
            className={styles.SignUpInput}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email here"
          />

          <label className={styles.SignUpLabel}>Password:</label>
          <input
            className={styles.SignUpInput}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password here"
          />

          <label className={styles.SignUpLabel}>Re-enter Password:</label>
          <input
            className={styles.SignUpInput}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Re-enter your password here"
          />

          <ul className={styles.SignupButtonsList}>
            <li><button className={styles.SignUpButtons} type="submit">Sign Up</button></li>
            <li>
              <button className={styles.SignUpButtons} type="cancel" onClick={() => {}}>
                Cancel
              </button>
            </li>
          </ul>
        </div>
      </form>
    </>
  );
}

export default SignUp;
