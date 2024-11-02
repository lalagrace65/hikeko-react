import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaAngleDown } from "react-icons/fa";
import CredForm from '@/components/forms/CredForm';

export default function TravelAgencyCredentialsHome() {
  //material tailwind
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Cover photo and form */}
      <div className="relative flex-grow">
        {/* Cover photo */}
        <div className="relative h-[700px]">
          <img
            src="/credentials.jpg" // Ensure this path is correct and the image is in the public folder
            alt="Travel Curator Image"
            layout="fill"
            objectfit="cover"
            priority
            className="absolute inset-0"
          />
        </div>

        {/* Floating Text */}
        <div className="absolute top-[15%] left-8 z-10 ">
          <h1 className="text-3xl font-bold mb-2">
            Boost your revenue with Us!
          </h1>
          <p className="text-lg mb-4">
            Sign up now and start earning more with HikeKo.
          </p>
        </div>

        {/* Form Container */}
        <div className="absolute top-[30%] left-8 z-10">
          <div className="bg-white p-7 rounded-lg shadow-lg" style={{ width: '400px', minHeight: '450px' }}>
            <h2 className="text-xl font-semibold mb-4">
              Ready to grow your business?
            </h2>
              <CredForm />
          </div>
        </div>
      </div>

      {/* New Opportunities Section */}
      <div className="bg-white p-8 text-center shadow-lg mt-60 mx-auto max-w-4xl relative">
        <h2 className="text-2xl font-bold mb-4">Brings new opportunities</h2>
        <p className="text-lg">
          Expand your horizons and explore new business opportunities with HikeKo. Join us today and be part of something big!
        </p>
      </div>

      {/* Three Cards in a Row */}
      <div className="flex justify-center mt-10 space-x-8"> {/* Flexbox container for 3 cards */}
        <Card className="bg-gray-300 max-w-xs">
          <CardHeader>
            <CardTitle>Card 1</CardTitle>
            <CardDescription>Description 1</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </CardContent>
          <CardFooter>
            <p>Footer 1</p>
          </CardFooter>
        </Card>

        <Card className="bg-gray-300 max-w-xs">
          <CardHeader>
            <CardTitle>Card 2</CardTitle>
            <CardDescription>Description 2</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </CardContent>
          <CardFooter>
            <p>Footer 2</p>
          </CardFooter>
        </Card>

        <Card className="bg-gray-300 max-w-xs">
          <CardHeader>
            <CardTitle>Card 3</CardTitle>
            <CardDescription>Description 3</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </CardContent>
          <CardFooter>
            <p>Footer 3</p>
          </CardFooter>
        </Card>
      </div>

      {/* Image and Text Section */}
      <div className="flex flex-col mt-10 max-w-full mx-auto bg-slate-300">
        {/* First Row: Image on Left, Text on Right */}
        <div className="flex items-center mb-10 w-full">
          <div className="flex-1">
            <img
              src="/google.png" // Replace with the actual image path
              alt="Description of Image 1"
              width={600} // Adjust width as needed
              height={400} // Adjust height as needed
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="flex-1 p-4">
            <h3 className="text-xl font-bold mb-2">Unlock New Features</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.</p>
          </div>
        </div>

        {/* Second Row: Text on Left, Image on Right */}
        <div className="flex items-center w-full">
          <div className="flex-1 p-4">
            <h3 className="text-xl font-bold mb-2">Join a Community</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.</p>
          </div>
          <div className="flex-1">
            <img
              src="/image3.png" // Replace with the actual image path
              alt="Description of Image 2"
              width={600} // Adjust width as needed
              height={400} // Adjust height as needed
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Any questions? */}
      <div className='mt-10 flex flex-col items-center'>
        <h2 className="text-2xl font-bold mb-4 text-center">Any questions?</h2>
        
        <Accordion open={open === 1} icon={<FaAngleDown id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>What is Material Tailwind?</AccordionHeader>
        <AccordionBody>
          Step 1: Submit your restaurant information here <br />
              <br />
              Step 2: We will review your application request <br />
              <br />
              Step 3: Upload documents such as your ID Card, Menu, Business License, Bank Account Statements <br />
              <br />
              Step 4: Fill up the contract via the link in the email to complete your registration
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<FaAngleDown id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          How to use Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
              As a partner with Hikeko, you will enjoy brand exposure to more than 1 million customers
              via our platform and marketing channels, access to our rider fleet, 
              incremental revenue, and business insights to help track and analyze 
              your restaurant's performance!

        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<FaAngleDown id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          What can I do with Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
              You simply register your travel agency while we do all the rest! 
              Give us your delivery-optimized menu and food images (if you have),
              and we create your online profile. <br/>
              <br/>
              Receive orders via a Sunmi device (with data SIM card provided)
              and prepare your food within 15 mins! Our reliable and friendly 
              rider will pick up the order from your shop and deliver it to the 
              customer. It's that simple!
        </AccordionBody>
      </Accordion>      




      </div>
    </div>
  );
}
