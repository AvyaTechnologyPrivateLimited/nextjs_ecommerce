"use client";

import Label from "@/components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import Radio from "@/shared/Radio/Radio";
import Select from "@/shared/Select/Select";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '../../custom/config';
import axios from 'axios';
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const validationSchema = Yup.object().shape({
  name: Yup.string()
            .required('Name is required')
            .max(30, 'Max value should be 30 digits.'),
  
  address_1: Yup.string()
            .required('Address is required')
            .max(80, 'Max value should be 80 digits.'),
  
  city: Yup.string()
            .required('City is required')
            .max(40, 'Max value should be 40 digits.'),
  
  country: Yup.number()
            .required('Country is required'),

  state: Yup.string()
            .required('State is required'),

  postal_code: Yup.string()
            .required('Postal Code is required'),
});

interface Props {
  isActive: boolean;
  onCloseActive: () => void;
  onOpenActive: () => void;
}

const ShippingAddress: FC<Props> = ({
  isActive,
  onCloseActive,
  onOpenActive,
}) => {

  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      address_1: '',
      address_2: '',
      city: '',
      country: '',
      state: '',
      postal_code: '',
      address_type: ''
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      //console.log(values);
      setIsLoading(true);

      attempt(values);

    }
  });

  const getCountries = async () => {
    const access_token1 = Cookies.get("access_token");
    if(!access_token1)
    {
      //toast.error('Please login first');
      console.log('you are not loggedin');
    }
    else
    {
      let headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + access_token1,
      }
      await axios.get(`${config.API_URL}checkout/countries`, { headers: headers })
        .then((response)=>{
          setCountries(response.data);
        }).catch((error) =>  {
          console.error(`Login to get cart ${error}`);
        });
    }
  };

  useEffect(() => {
    //getCountries();
  }, [])

  const attempt = async (values: any) => {
    try {
      const access_token = Cookies.get("access_token");
      let headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + access_token,
      }
      // Send login request
      const response = await axios.post(`${config.API_URL}checkout/update-shipping-address`, values, { headers: headers });
      toast.success(response.data.message);
      onCloseActive()
      
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  const renderCountryOption = (country:any) => {
    return (
      <option key={country.id} value={country.id}>{country.name}</option>
    )
  }

  const renderShippingAddress = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
        <div className="p-6 flex flex-col sm:flex-row items-start">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase">SHIPPING ADDRESS</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="">
                {`St. Paul's Road, Norris, SD 57560, Dakota, USA`}
              </span>
            </div>
          </div>
          <button
            className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0 sm:ml-auto text-sm font-medium rounded-lg"
            onClick={onOpenActive}
          >
            Change
          </button>
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
          {/* ============ */}
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-6">

          <div className="max-w-lg">
            <Label className="text-sm">Name</Label>
            
            <Input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
              )}

          </div>

          {/* ============ */}
          <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
            <div className="flex-1">
              <Label className="text-sm">Address</Label>
            
              <Input
                  type="text"
                  id="address_1"
                  name="address_1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address_1}
                />
                {formik.touched.address_1 && formik.errors.address_1 && (
                  <div>{formik.errors.address_1}</div>
                )}
            </div>
            <div className="sm:w-1/3">
              <Label className="text-sm">Apt, Suite *</Label>
              <Input
                  type="text"
                  id="address_2"
                  name="address_2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address_2}
                />
                {formik.touched.address_2 && formik.errors.address_2 && (
                  <div>{formik.errors.address_2}</div>
                )}
            </div>
          </div>

          {/* ============ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <div>
              <Label className="text-sm">City</Label>
              <Input
                  type="text"
                  id="city"
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city && (
                  <div>{formik.errors.city}</div>
                )}
            </div>
            <div>
              <Label className="text-sm">Country</Label>
              <Select className="mt-1.5" defaultValue="United States ">
                <option value="United States">United States</option>
              </Select>

              <Select name="country" as="select" className="my-select">
                {countries.map(renderCountryOption)}
              </Select>

            </div>
          </div>

          {/* ============ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
            <div>
              <Label className="text-sm">State/Province</Label>
              <Input
                  type="text"
                  id="state"
                  name="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                />
                {formik.touched.state && formik.errors.state && (
                  <div>{formik.errors.state}</div>
                )}
            </div>
            <div>
              <Label className="text-sm">Postal code</Label>
              <Input
                  type="text"
                  id="postal_code"
                  name="postal_code"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.postal_code}
                />
                {formik.touched.postal_code && formik.errors.postal_code && (
                  <div>{formik.errors.postal_code}</div>
                )}
            </div>
          </div>

          {/* ============ */}
          <div>
            <Label className="text-sm">Address type</Label>
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <Radio
                label={`<span class="text-sm font-medium">Home <span class="font-light">(All Day Delivery)</span></span>`}
                id="Address-type-home"
                name="Address-type"
                defaultChecked
              />
              <Radio
                label={`<span class="text-sm font-medium">Office <span class="font-light">(Delivery <span class="font-medium">9 AM - 5 PM</span>)</span> </span>`}
                id="Address-type-office"
                name="Address-type"
              />
            </div>
          </div>

          {/* ============ */}
          <div className="flex flex-col sm:flex-row pt-6">
          <ButtonPrimary
              className="sm:!px-7 shadow-none"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Save and next to Payment'}
            </ButtonPrimary>
            <ButtonSecondary
              className="mt-3 sm:mt-0 sm:ml-3"
              onClick={onCloseActive}
            >
              Cancel
            </ButtonSecondary>
          </div>
          </form>
        </div>
      </div>
    );
  };
  return renderShippingAddress();
};

export default ShippingAddress;
