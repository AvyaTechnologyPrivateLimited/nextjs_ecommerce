"use client";

import Label from "@/components/Label/Label";
import React, { useState, useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import config from '../../../custom/config';
import axios from 'axios'; 
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const AccountPass = () => {

  const [passwordData, setPasswordData] = useState(
    {
      current: "",
      new:"",
      confirm: "",
    }
  );

  const handleChange = (event:any) => {
    let value = event.target.value;
    let name = event.target.name;
 
    setPasswordData((prevalue) => {
      return {
        ...prevalue,   // Spread Operator              
        [name]: value
      }
    })
  }

  const updatePassword = async () => {
    //event.preventDefault();
    try {
      let headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get("access_token"),
      }
      const response = await axios.post(`${config.API_URL}update-password`, passwordData, { headers: headers });
      const data = await response.data;
      
      if(data.error === true)
        toast.error(data.message);
      else 
        toast.success(data.message);

      setPasswordData({
        current: "",
        new:"",
        confirm: "",
      });
    } catch (error) {
      console.error('Error fetching updated profile:', error);
      //toast.error(data.message);
    }
  };

  useEffect(() => {
    updatePassword();
  }, []);


  return (
    <div className="space-y-10 sm:space-y-12">
    <form onSubmit={updatePassword}>
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-5">
        Update your password
      </h2>
      <div className=" max-w-xl space-y-6">
        <div>
          <Label>Current password</Label>
          <Input required type="password" onChange={handleChange} value={passwordData.current} name="current" placeholder="Enter Current Password" className="mt-1.5" />
        </div>
        <div>
          <Label>New password</Label>
          <Input required type="password" onChange={handleChange} value={passwordData.new} name="new" placeholder="Enter Current New Password" className="mt-1.5" />
        </div>
        <div>
          <Label>Confirm password</Label>
          <Input required type="password" onChange={handleChange} value={passwordData.confirm} name="confirm" placeholder="Enter Confirm New Password" className="mt-1.5" />
        </div>
        <div className="pt-2">
          <ButtonPrimary>Update password</ButtonPrimary>
        </div>
      </div>
      </form>
    </div>
  );
};

export default AccountPass;
