'use client';
import Input from "@/shared/Input/Input";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import Link from "next/link";
import axios from 'axios';
import LoginWithSocial from "../../components/LoginWithSocial";
import React, { useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import config from '../../custom/config';
import Cookies from "js-cookie";

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const PageLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      //console.log(values);
      setIsLoading(true);

      attempt(values);

    }
  });

  const attempt = async (values: any) => {
    try {
      // Send login request
      const response = await axios.post(`${config.API_URL}login`, values);

      // Handle successful login response here
      let login_data = response.data;

      Cookies.set("isLoggedIn", String(true));
      Cookies.set("name",login_data.name);
      Cookies.set("phone",login_data.phone);
      Cookies.set("email",login_data.email);
      Cookies.set("access_token",login_data.access_token);

      toast.success(login_data.message);
      window.location.replace("/");
      
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          
          
          <LoginWithSocial />
          
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address 2
              </span>
              <Input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div>{formik.errors.email}</div>
              )}
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href="/forgot-pass" className="text-sm text-green-600">
                  Forgot password?
                </Link>
              </span>
              <Input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div>{formik.errors.password}</div>
              )}
            </label>

            <ButtonPrimary 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
              </ButtonPrimary>
        </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link className="text-green-600" href="/register">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
    </>
  );
};

export default PageLogin;
