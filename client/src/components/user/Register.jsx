import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await register(name, email, password);
      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mb-3 my-3">
      <form onSubmit={submitHandler} className="form">
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        <div className="flex"></div>
        <label>
          <input
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            required
            placeholder=""
            type="name"
            className="input"
          />
          <span>Name</span>
        </label>
        <label>
          <input
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            required
            placeholder=""
            type="email"
            className="input"
          />
          <span>Email</span>
        </label>
        <label>
          <input
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            required
            placeholder=""
            type="password"
            className="input"
          />
          <span>Password</span>
        </label>

        <button className="submit">Register</button>
        <p className="signin">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
