import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success(result.message);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mb-3 my-3">
      <form onSubmit={submitHandler} className="form">
        <p className="title">Login</p>
        <p className="message">Login now and get full access to our app.</p>
        <div className="flex"></div>
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

        <button className="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
