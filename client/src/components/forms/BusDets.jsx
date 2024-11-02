import React, { useState, useEffect } from 'react';
import { Input, Typography, Drawer, Button, IconButton } from "@material-tailwind/react";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import  emailjs  from '@emailjs/browser';

export default function BusDets() {
    const [businessName, setBusinessName] = useState("");
    const [businessEmail, setBusinessEmail] = useState("");
    const [businessContactNo, setBusinessContactNo] = useState("");
    const [selectedBusinessType, setSelectedBusinessType] = useState("Select an option");
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    // State variables for file links and names
    const [birCertificateDocu, setBirCertificateDocu] = useState({ link: '', name: '' });
    const [dtiPermitDocu, setDtiPermitDocu] = useState({ link: '', name: '' });
    const [businessPermitDocu, setBusinessPermitDocu] = useState({ link: '', name: '' });
    const [mayorsPermitDocu, setMayorsPermitDocu] = useState({ link: '', name: '' });

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const form = React.useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      // Retrieve the saved data from localStorage if it exists
      const savedData = JSON.parse(localStorage.getItem("formData"));
      
      if (savedData) {
          // Set each form field if it exists in the saved data
          setBusinessName(savedData.businessName || "");
          setBusinessEmail(savedData.businessEmail || "");
          setBusinessContactNo(savedData.contactNo || "");
          setSelectedBusinessType(savedData.businessType || "Select an option");
          
          // Set document states if they exist in saved data
          setBirCertificateDocu(savedData.birCertificateDocu || { link: '', name: '' });
          setDtiPermitDocu(savedData.dtiPermitDocu || { link: '', name: '' });
          setBusinessPermitDocu(savedData.businessPermitDocu || { link: '', name: '' });
          setMayorsPermitDocu(savedData.mayorsPermitDocu || { link: '', name: '' });
      }
  }, []);
   

    const handleFileChange = async (ev, type) => {
      const files = ev.target.files;
      if (files?.length === 1) {
          const file = files[0]; // Get the selected file
          const data = new FormData();
          data.append('file', file);

          setIsUploading(true);
          try {
              const response = await axios.post('/api/upload', data, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });

              // Update the appropriate state based on the type
              const link = response.data.links;
              const fileName = file.name; // Get the file name
              switch (type) {
                  case 'birCertificate':
                      setBirCertificateDocu({ link, name: fileName });
                      break;
                  case 'dtiPermit':
                      setDtiPermitDocu({ link, name: fileName });
                      break;
                  case 'businessPermit':
                      setBusinessPermitDocu({ link, name: fileName });
                      break;
                  case 'mayorsPermit':
                      setMayorsPermitDocu({ link, name: fileName });
                      break;
                  default:
                      break;
              }

              // Show success toast
              toast.success('Upload complete');
          } catch (error) {
              console.error('Upload failed:', error);
              toast.error('Upload failed');
          } finally {
              setIsUploading(false);
          }
      }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = {
        businessName,
        businessEmail,
        businessContactNo,
        businessType: selectedBusinessType,
        documents: {
            birCertificate: birCertificateDocu.link,
            dtiPermit: dtiPermitDocu.link,
            businessPermit: businessPermitDocu.link,
            mayorsPermit: mayorsPermitDocu.link,
        },
    };
    console.log("Form submitted:", formData);

    try {
      console.log("Preparing to send email...");
      await emailjs.sendForm('service_ehzzg2c', 'template_xc2nmxt', form.current, 'XczVijVc-NaoUCGic')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        const signupResult = await axios.post('/api/signup', formData);
        console.log("Signup successful:", signupResult.data);
        toast.success("Form submitted successfully!");
    } catch (error) {
        console.error("Submission error:", error);
        toast.error("Submission failed.");
    }
    setIsSubmitting(false);
  };


    return (
        <React.Fragment>
            <div className="flex">
                {/* Left Side - Background Color/Image */}
                <div className="flex-1 bg-gray-200 relative">
                    {/* Optional: Add a background image */}
                    {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }} /> */}
                </div>

                {/* Right Side - Form Container */}
                <div className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-2">Tell us about your business</h1>
                    <h3 className="mb-4">
                        This information will be shown on the app so that customers can search and contact you if they have any questions.
                    </h3>
                  <form onSubmit={handleSubmit} ref={form}>
                    <div className="space-y-4">
                        {/* Business Name */}
                        <div>
                            <label className="mb-2 block">Business Name:</label>
                            <Input 
                                name='to_name' 
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                outline={true}
                                className="mb-4"
                            />
                        </div>

                        {/* Business Email */}
                        <div>
                            <label className="mb-2 block">Business Email</label>
                            <Input
                                name='to_email'
                                type="email"
                                value={businessEmail}
                                onChange={(e) => setBusinessEmail(e.target.value)}
                                className="mb-4"
                            />
                        </div>

                        {/* Business Type and Number of Branches */}
                        <div className="flex flex-row gap-4">
                            {/* Business Type Dropdown */}
                            <div className="flex flex-col w-1/2">
                                <label className="mb-2">Business Type:</label>
                                <Menu
                                    animate={{
                                        mount: { y: 0 },
                                        unmount: { y: 25 },
                                    }}
                                >
                                    <MenuHandler>
                                        <Button>{selectedBusinessType}</Button>
                                    </MenuHandler>
                                    <MenuList>
                                        <MenuItem onClick={() => setSelectedBusinessType("Product")}>Product</MenuItem>
                                        <MenuItem onClick={() => setSelectedBusinessType("Service")}>Service</MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>

                            {/* Number of Branches Input */}
                            <div className="flex flex-col w-1/2">
                                <label className="mb-2">Number of Branches</label>
                                <Input
                                    type="text"
                                    name="number_of_branches"
                                    id="number_of_branches"
                                    className="mb-4"
                                />
                            </div>
                        </div>

                        {/* Business Complete Address */}
                        <div>
                            <label className="mb-2 block">Business Complete Address:</label>
                            <Input
                                type="text"
                                name="business_complete_address"
                                id="business_complete_address"
                                placeholder="Enter Business Complete Address"
                                className="mb-4"
                            />
                        </div>

                        {/* Contact Number */}
                        <div>
                            <Typography className="mb-2 block">Business Contact Number:</Typography>
                            <PhoneInput
                                className="phone-input-container mt-2 mb-4 w-full px-3 py-2 border border-gray-300 rounded-2xl"
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry="PH"
                                placeholder="Enter phone number"
                                value={businessContactNo}
                                onChange={setBusinessContactNo}
                            />
                        </div>

                        {/* Business Documents */}
                        <h1 className="text-2xl font-bold mt-6 mb-2">Business Documents</h1>
                        <div>
                            <p className="text-gray-600 mb-2">
                                *Note: Only document-type files are accepted. If you have a picture, kindly convert it to a document format.
                            </p>
                            <Typography 
                                as="a"
                                href="#"
                                color="white"
                                className="font-medium !text-red-500 transition-colors hover:!text-red-300"
                                onClick={openDrawer}>
                                See Sample BIR Form
                            </Typography>
                            <Drawer open={open} onClose={closeDrawer} placement="right" className="p-4">
                                <div className="mb-6 flex items-center justify-between">
                                    <Typography variant="h5" color="blue-gray">
                                        Material Tailwind
                                    </Typography>
                                    <IconButton color="blue-gray" className='h-6 w-6 rounded-full flex items-center justify-center' onClick={closeDrawer}>
                                        <IoCloseCircleOutline className="h-5 w-5 "/>
                                    </IconButton>
                                </div>
                                <Typography color="gray" className="mb-8 pr-4 font-normal">
                                    Material Tailwind features multiple React and HTML components, all written with Tailwind CSS classes and Material Design guidelines.
                                </Typography>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outlined">
                                        Documentation
                                    </Button>
                                    <Button size="sm">Get Started</Button>
                                </div>
                            </Drawer>
                        </div>
                      </div>

                    {/* Upload files */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                          <label className="w-1/3 text-right font-medium">BIR Certificate:</label>
                          <input
                              type="file"
                              accept=".pdf, .doc, .docx, .txt"
                              onChange={(e) => handleFileChange(e, 'birCertificate')}
                              style={{ display: 'none' }}
                              id="birCertificateDocu"
                          />
                          <label htmlFor="birCertificateDocu" className="btn">Upload</label>
                          <span>{birCertificateDocu.name || 'No file selected'}</span>
                      </div>
                      <div className="flex items-center gap-4">
                          <label className="w-1/3 text-right font-medium">DTI Permit:</label>
                          <input
                              type="file"
                              accept=".pdf, .doc, .docx, .txt"
                              onChange={(e) => handleFileChange(e, 'dtiPermit')}
                              style={{ display: 'none' }}
                              id="dtiPermitDocu"
                          />
                          <label htmlFor="dtiPermitDocu" className="btn">Upload</label>
                          <span>{dtiPermitDocu.name || 'No file selected'}</span>
                      </div>
                      <div className="flex items-center gap-4">
                          <label className="w-1/3 text-right font-medium">Business Permit:</label>
                          <input
                              type="file"
                              accept=".pdf, .doc, .docx, .txt"
                              onChange={(e) => handleFileChange(e, 'businessPermit')}
                              style={{ display: 'none' }}
                              id="businessPermitDocu"
                          />
                          <label htmlFor="businessPermitDocu" className="btn">Upload</label>
                            <span>{businessPermitDocu.name || 'No file selected'}</span>   
                      </div>                         
                      <div className="flex items-center gap-4">
                          <label className="w-1/3 text-right font-medium">Mayor Permit:</label>
                          <input
                              type="file"
                              accept=".pdf, .doc, .docx, .txt"
                              onChange={(e) => handleFileChange(e, 'mayorsPermit')}
                              style={{ display: 'none' }}
                              id="mayorsPermitDocu"
                          />
                          <label htmlFor="mayorsPermitDocu" className="btn">Upload</label>
                          <span>{mayorsPermitDocu.name || 'No file selected'}</span>
                      </div>    
                    </div>
                    {isUploading && <p>Uploading...</p>}
                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </Button>
                  </form>
                </div>
            </div>
        </React.Fragment>
    );
    
}
