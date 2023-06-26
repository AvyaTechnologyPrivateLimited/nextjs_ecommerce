"use client";
import Label from "@/components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Input from "@/shared/Input/Input";
import Cookies from "js-cookie";
import Link from "next/link";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '../../custom/config';
import axios from 'axios';
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
            .required('Phone is required')
            .min(10, 'Min value should be 10 digits.')
            .max(15, 'Max value should be 15 digits.'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});
interface Props {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
}

const ContactInfo: FC<Props> = ({ isActive, onCloseActive, onOpenActive }) => {
  const [userName, setUserName] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userPhone, setPhone] = useState("")
  const [userEmail, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    if(access_token)
    {
      setIsLoggedIn(true);
      const un = Cookies.get("name");
      if(un)
      {
        setUserName(un);
      }

      const em = Cookies.get("email");
      if(em)
      {
        setEmail(em);
      }

      const ph = Cookies.get("phone");
      if(ph)
      {
        setPhone(ph);
      }
    }
    //getCartData();
  }, [])

  const formik = useFormik({
    initialValues: {
      phone: '',
      email: ''
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
      const access_token = Cookies.get("access_token");
      let headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + access_token,
      }
      // Send login request
      const response = await axios.post(`${config.API_URL}checkout/update-contact-information`, values, { headers: headers });
      toast.success(response.data.message);
      onCloseActive()
      
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  const renderAccount = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row items-start p-6 ">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase tracking-tight">CONTACT INFO</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="">{userName}</span>
              <span className="ml-3 tracking-tighter">{userPhone}</span>
            </div>
          </div>
          <button
            className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg"
            onClick={() => onOpenActive()}
          >
            Change
          </button>
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-between flex-wrap items-baseline">
            <h3 className="text-lg font-semibold">Contact infomation</h3>
            {!isLoggedIn ? (
            <span className="block text-sm my-1 md:my-0">
              Do not have an account?{` `}
              <Link href="/login" className="text-primary-500 font-medium">
                Log in
              </Link>
            </span>
            ) : (
              <></>
            )}
          </div>
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="max-w-lg">
            <Label className="text-sm">Your phone number</Label>
            
            <Input
                type="tel"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div>{formik.errors.phone}</div>
              )}

          </div>
          <div className="max-w-lg">
            <Label className="text-sm">Email address</Label>
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
          </div>
          <div>
            <Checkbox
              className="!text-sm"
              name="uudai"
              label="Email me news and offers"
              defaultChecked
            />
          </div>

          {/* ============ */}
          <div className="flex flex-col sm:flex-row pt-6">
            <ButtonPrimary
              className="sm:!px-7 shadow-none"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Save and next to Shipping'}
            </ButtonPrimary>
            <ButtonSecondary
              className="mt-3 sm:mt-0 sm:ml-3"
              onClick={() => onCloseActive()}
            >
              Cancel
            </ButtonSecondary>
          </div>
          </form>
        </div>
      </div>
    );
  };

  return renderAccount();
};

export default ContactInfo;
