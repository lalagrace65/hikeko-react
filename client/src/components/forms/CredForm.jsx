import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { Button, Input, Checkbox, Dialog } from "@material-tailwind/react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function CredForm() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      ownerFirstName: "",
      ownerLastName: "",
      birCertificate: "",
      termsAccepted: false,
    },
  });

  
  const onSubmit = async (data, ev) => {
    ev.preventDefault();

    if (data.birCertificate === "no") {
      toast.error("You must have a BIR Certificate to proceed.");
      return;
    }

    localStorage.setItem("formData", JSON.stringify(data));
    // Navigate to the next page
    navigate("/travelAgencySignUp/businessDetails");
  };

  const preventLeadingWhitespace = (value) => {
    return value.trim().length === value.length || "No leading whitespace allowed.";
  };


  return (
      <form onSubmit={handleSubmit(onSubmit)} 
       className="space-y-4">
        
        {/* Owner First Name */}
        <div>
          <label className="block text-gray-700">Business Owner First Name:</label>
          <Input name='to_name'
            {...register("ownerFirstName", {
              required: "Owner First Name is required.",
              validate: preventLeadingWhitespace,
            })}
            color="teal"
          />
          {errors.ownerFirstName && (
            <span className="text-red-500">{errors.ownerFirstName.message}</span>
          )}
        </div>

        {/* Owner Last Name */}
        <div>
          <label className="block text-gray-700">Business Owner Last Name:</label>
          <Input
            {...register("ownerLastName", {
              required: "Owner Last Name is required.",
              validate: preventLeadingWhitespace,
            })}
            color="teal"
          />
          {errors.ownerLastName && (
            <span className="text-red-500">{errors.ownerLastName.message}</span>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-gray-700">Owner's Mobile Number:</label>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="PH"
            placeholder="Enter phone number"
            value={contactNo}
            onChange={setContactNo}
            className="mt-2 mb-2 w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* BIR Certificate */}
        <div>
          <label className="block text-gray-700">Do you have a BIR Certificate?</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                {...register("birCertificate", { required: "This field is required." })}
                type="radio"
                value="yes"
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                {...register("birCertificate")}
                type="radio"
                value="no"
                className="mr-2"
              />
              No
            </label>
          </div>
          {errors.birCertificate && (
            <span className="text-red-500">{errors.birCertificate.message}</span>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("termsAccepted", { required: "You must accept the terms and conditions." })}
            color="teal"
          />
          <label
            className="ml-2 cursor-pointer text-gray-700"
            onClick={() => setIsDialogOpen(true)}
          >
            Accept terms and conditions
          </label>
          {errors.termsAccepted && (
            <span className="text-red-500 block">{errors.termsAccepted.message}</span>
          )}
        </div>

        {/* Terms Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-auto shadow-lg">
              <h2 className="text-xl font-semibold">Terms and Conditions</h2>
              <p className="mt-4">By accepting, you agree to our terms and conditions.</p>
              <div className="flex justify-end mt-4">
                <Button
                  color="teal"
                  onClick={() => {
                    setValue("termsAccepted", true);
                    setIsDialogOpen(false);
                  }}
                >
                  Accept
                </Button>
                <Button color="gray" onClick={() => setIsDialogOpen(false)} className="ml-2">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button 
            type="submit" 
            color="teal" 
            className="w-full mt-4"
        >
          Get Started
        </Button>


      </form>
  );
}
