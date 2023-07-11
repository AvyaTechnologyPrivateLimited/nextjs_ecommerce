"use client";

import Label from "@/components/Label/Label";
import React, { useState, useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import config from '../../../custom/config';
import axios from 'axios'; 
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Select from "react-select";

const AccountAddress = () => {

  // const countryList = [
  //   { value: "red", label: "Red" },
  //   { value: "green", label: "Green" },
  //   { value: "yellow", label: "Yellow" },
  //   { value: "blue", label: "Blue" },
  //   { value: "white", label: "White" }
  // ];

  const [countryList, setCountryList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState();

  const handleSelect = (data:any) => {
    setSelectedOptions(data);
  }

  const getCountryList = async () => {
    try {
      let headers = {
        'Accept': 'application/json',
        //'Authorization': 'Bearer ' + Cookies.get("access_token"),
      }
      const response = await axios.get(`${config.API_URL}country`, { headers: headers });
      const data = await response.data;
      setCountryList(data.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    getCountryList();
  }, []);

  return (
    <div className="space-y-10 sm:space-y-12">
      <form >
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-5">
          Update your address
        </h2>
        <div className=" max-w-xl space-y-6">
          <div>
            <Label>Contact Person Name</Label>
            <Input required type="text"  name="contact_person" placeholder="Enter Name" className="mt-1.5" />
          </div>
          <div>
            <Label>Contact Person Phone</Label>
            <Input required type="text"  name="contact_phone" placeholder="Enter Phone" className="mt-1.5" />
          </div>
          <div>
            <Label>Address Line 1</Label>
            <Input required type="text"  name="address_line_2" placeholder="Enter Address 1" className="mt-1.5" />
          </div>
          <div>
            <Label>Address Line 2</Label>
            <Input required type="text"  name="address_line_1" placeholder="Enter Address 2" className="mt-1.5" />
          </div>
          <div>
            <Label>Country</Label>
            <div className="dropdown-container">
              <Select
                name="country"
                options={countryList}
                placeholder="Select Country"
                onChange={handleSelect}
                isMulti={false}
              />
            </div>
          </div>
          <div>
            <Label>State</Label>
            <div className="dropdown-container">
              <Select
                name="state"
                options={statesList}
                placeholder="Select State"
                onChange={handleSelect}
                isMulti={false}
              />
            </div>
          </div>
          <div>
            <Label>City</Label>
            <div className="dropdown-container">
              <Select
                name="city"
                options={cityList}
                placeholder="Select State"
                onChange={handleSelect}
                isMulti={false}
              />
            </div>
          </div>
          <div>
            <Label>Zip</Label>
            <Input required type="text" name="zip" placeholder="Enter Pincode" className="mt-1.5" />
          </div>
          <div className="pt-2">
            <ButtonPrimary>Update Address</ButtonPrimary>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountAddress;
