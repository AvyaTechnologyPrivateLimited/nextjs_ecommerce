'use client';
import React, { useState, ChangeEvent, FormEvent } from "react";
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import * as Yup from 'yup';
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../custom/config';
import Cookies from "js-cookie";

const validationSchema = Yup.object({
  name: Yup.string().required('Email is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //console.log(config);
    e.preventDefault();

    // Perform validation
    const errors = {name, email, password};
    if (!name) {
      errors.name = 'Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    }

    // If there are errors, set them in state
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    //set loading before sent to server
    setIsLoading(true);

    // If there are no errors, perform login logic here
    // For simplicity, we'll just log the email and password
    try {
      // Send login request
      
      const response = await axios.post(`${config.API_URL}register`, {
        name,
        email,
        password
      });

      // Handle successful login response here
      let login_data = response.data;
      Cookies.set("isLoggedIn", String(true));
      Cookies.set("name",login_data.name);
      Cookies.set("access_token",login_data.access_token);
      toast.success(login_data.message);
      window.location.replace("/");
      
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      //setErrors({});
    } catch (response: any) {
      // Handle login error here
      //console.log(response.response.data);
      let errors = response.response.data
      {Object.keys(errors).map((field) =>
        setErrors(errors)
      )}
    }

    // Reset form
    setIsLoading(false);
  };

  return (
    <>
    <ToastContainer />
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Register
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                  sizes="40px"
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Name
              </span>
              <Input
                type="text"
                placeholder="John Doe"
                className="mt-1"
                value={name}
                onChange={handleNameChange}
              />
              {errors.name && <span className="text-rose-600 text-xs">{errors.name}</span>}
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && <span className="text-rose-600 text-xs">{errors.email}</span>}
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input 
                type="password" 
                className="mt-1"
                value={password}
                onChange={handlePasswordChange}
              />
              {errors.password && <span className="text-rose-600 text-xs">{errors.password}</span>}
            </label>
            <ButtonPrimary 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Signup'}
              </ButtonPrimary>
          </form>
          

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Have a account? {` `}
            <Link className="text-green-600" href="/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
    </>
  );
};

export default PageSignUp;
