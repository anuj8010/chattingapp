import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import "./App.css";

const Login = () => {
  const [pass, setPass] = useState();
  const containerRef = useRef();
  const [error, seterror] = useState()

  const handleChange = (e) => {
    setPass(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Login successful");
        window.location.href = result.redirectUrl;
      } else {
        console.log(result.message)
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const welcomeText = "welcome";
    const container = containerRef.current;

    welcomeText.split('').forEach((char, index) => {
      setTimeout(() => {
        container.innerText += char;
      }, index * 400);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-container px-4">
      <h1 ref={containerRef} className="text-4xl md:text-6xl text-blue-700 font-extrabold text-center mb-12"></h1>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col gap-6 border-gray-400 border-4 rounded-xl p-6 sm:p-10 md:py-12 md:px-16 bg-form w-full max-w-lg"
      >
        <div className="text-lg md:text-2xl flex flex-col gap-2 font-extrabold">
          <label htmlFor="email" className="text-cyan-200">Email ID:</label>
          <input 
            type="text" 
            className="border-black border-2 rounded-lg p-2" 
            {...register("email", {
              required: true, 
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            })} 
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-red-700">Email is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p role="alert" className="text-red-700">Invalid email address</p>
          )}
        </div>

        <div className="text-lg md:text-2xl flex flex-col gap-2 font-extrabold">
          <label htmlFor="password" className="text-cyan-200">Password:</label>
          <input 
            type="password" 
            className="border-black border-2 rounded-lg p-2" 
            {...register("password", {
              required: true, 
              minLength: 5, 
              validate: value => /^(?=.*[A-Z])(?=.*[@!#$%^&.*])[A-Za-z\d@!#$%^&*.]+$/.test(value), 
              message: "Must contain at least one uppercase letter and one special character"
            })} 
          />
          {errors.password?.type === "required" && (
            <p role="alert" className="text-red-700">Password is required</p>
          )}
        </div>

        <button className="bg-green-500 rounded-xl p-2 hover:bg-green-600 text-white" type="submit">Login</button>
        <p className='text-red-700'>{error}</p>

        <div className="flex gap-2 text-lg justify-center font-medium">
          <h3>New user?</h3>
          <a href="http://localhost:5173/signup" className="text-blue-700 hover:text-blue-800">Create account</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
