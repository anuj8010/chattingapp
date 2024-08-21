import React from 'react'
import { useRef, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const ref1 = useRef()
  const ref2 = useRef()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors,isSubmitting },
  } = useForm()

  const onSubmit = async(data) => {
    console.log(data)
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        // Handle successful signup (e.g., navigate to login page)
        console.log("Signup successful");

    toast.success('new useradded succerssfully ');
      } else {
        // Handle error response
       ref2.current.innerText=result.message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const chnage = () => {
    let a = document.getElementById("pass")
    if (a.type == "password") {
      a.type = "text"
    }
    else {
      a.type = "password"
    }


  }
  useEffect(() => {
    const welcomeText = "lets__registered";
    const container = ref1.current;

    welcomeText.split('').forEach((char, index) => {
      setTimeout(() => {

        container.innerText += char;
       
      }, index * 200); // 500ms delay between letters
    });
  }, []);

  return (
    <div>
      
      <div className='flex flex-col items-center justify-center gap-16' >
        <div className='text-5xl text-black font-extrabold' ref={ref1}> </div>
        
          <form  onSubmit={handleSubmit(onSubmit)}   className='flex flex-col gap-9 border-x-2 border-black pt-32 pb-20 px-24'>
     {/* firstname     */}
            <div className=' flex gap-3  '>
              <div className='space-x-3'>
              <label htmlFor="" className='text-black font-bold text-xl'>firstname</label>
              <input className='border-black border-2 rounded-lg' {...register("firstname", {
                required: true, maxLength: 20, pattern: {
                  value: /^[A-Za-z]+$/, },
              })} />
                 {errors.firstname?.type === "required" && (
                <p role="alert" className='text-red-700'>username name is required</p>
              )}
              {errors.firstname?.type === "pattern" && (
                <p role="alert" className='text-red-700'>name is always in alphabet</p>
              )}
              </div>
              {/* lastnamee */}
              <div className='space-x-3'> 
                <label htmlFor="" className='text-black font-bold text-xl'>last name</label>
              <input className='border-black border-2 rounded-lg' {...register("lastname", {
                required: true, maxLength: 20, pattern: {
                  value: /^[A-Za-z]+$/,
                }
              })} />
                {errors.lastname?.type === "pattern" && (
                <p role="alert" className='text-red-700'>name is always in alphabet</p>
              )}
              {errors.lastname?.type === "required" && (
                <p role="alert" className='text-red-700'>username name is required</p>
              )}</div>
           
            </div>

          
             
    {/* email address */}
            <div className=' flex gap-6  '>
              <label htmlFor="" className='text-black font-bold text-xl'>Email id</label>
              <input className='border-black border-2 rounded-lg w-[500px]' {...register("email", {
                required: true, pattern: {
 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                },
              })} />
              {errors.email?.type === "required" && (
                <p role="alert" className='text-red-700'>email name is required</p>
              )}
              {errors.email?.type === "pattern" && (
                <p role="alert" className='text-red-700'>invalid emmail address</p>
              )}
            </div>

   {/* password*****     */}
            <div className=' flex gap-3 '>
              <label htmlFor="" className='text-black font-bold text-xl'>password</label>
              <input id='pass' className='border-black border-2 rounded-lg w-[500px]' type='password' {...register("password", {
                required: true, minLength: 5, validate: value =>
                  /^(?=.*[A-Z])(?=.*[@!#$%^&.*])[A-Za-z\d@!#$%^&*.]+$/.test(value), message: "Must contain at least one uppercase letter and one special character"
              })} />
      
               {errors.password?.type === "required" && (
                <p role="alert" className='text-red-700'>password is required</p>
              )}
             

              {errors.password?.type === "validate" && <p>Must contain at least one uppercase letter and one special character</p>}</div>
            <button type="submit" disabled={isSubmitting} className='ml-[10px] ring-black ring-offset-2 ring-2 bg-green-500 rounded-xl p-1 hover:bg-green-600'>sign up </button>

            <div className='flex
 gap-2 text-lg justify-center font-medium'>
              <h3>already Have an Account?</h3>
              <a href="http://localhost:5173/login" className='text-blue-700 hover:text-blue-800'>Login </a>
            </div>
<div ref={ref2} className='text-red-600 font-semibold text-lg'>

</div>

            {/* <button onClick={chnage}>typecnge</button> */}
          </form>
          <ToastContainer />
        </div>
    
    </div>
  )
}

export default Signup
