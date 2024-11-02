import React , { useState } from 'react';
import { 
    Input, 
    Select, 
    Option, 
    Button, 
    Checkbox, 
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner
} from "@material-tailwind/react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FiUpload } from "react-icons/fi";
import { ReactSortable } from 'react-sortablejs';
import axios from 'axios';


function JoinerDetailsForm({packageId}) {
    const [proofPaymentImages, setProofPaymentImages] = useState([]);
    const [joinerContactNo, setJoinerContactNo] = useState("");
    const [emergencyContactNo, setEmergencyContactNo] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        joinerName: "",
        email: "",
        pickupLocation: "",
        age: "",
        homeAddress: "",
        emergencyContactNumber: "",
        medicalCondition: "",
        conditionDetails: "",
        paymentType: "Downpayment", // Default value
        termsAccepted: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle the checkbox for terms acceptance
    const handleTermsChange = () => {
        setFormData(prevState => ({
            ...prevState,
            termsAccepted: !prevState.termsAccepted
        }));
    };

    const handleSubmit = async () => {
        try {
            const bookingData = {
                ...formData,
                proofOfPayment: proofPaymentImages,
                contactNumber: joinerContactNo,
                emergencyContactNumber: emergencyContactNo,
                packageId
            };

            const response = await axios.post('/api/booking', bookingData);
            console.log('Booking response:', response.data);
            // Handle successful booking (e.g., show a success message or redirect)
        } catch (error) {
            console.error('Error submitting booking:', error);
            // Handle error (e.g., show an error message)
        }
    };


    //Sortable image upload
    async function uploadProofPayment(ev){
        const files = ev.target?.files;
        if(files?.length > 0){
            setIsUploading(true);
            const data = new FormData();
            for (const file of files){
                data.append('file', file);
            }
            try {
                const res = await axios.post('/api/upload', data);
                setProofPaymentImages(oldImages => {
                    return [...oldImages, ...res.data.links];
                });
            } catch (error) {
                console.error("Upload failed:", error);
            } finally {
                setIsUploading(false);
            }
        }
    }
    function updateProofImagesOrder(proofPaymentImages) {
        setProofPaymentImages(proofPaymentImages);
    }

    return (
        <div className="bg-green-800 p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">JOINER DETAILS:</h2>
            <div className="grid grid-cols-3 gap-6 mb-4">
                <div className="relative">
                    <Input
                        type="text"
                        label="Joiner Name(s) *"
                        color="black"
                        variant="outlined"
                        className="bg-gray-400 focus:bg-gray-400 text-black border-gray-400"
                        name="joinerName"
                        value={formData.joinerName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="relative">
                    <Input
                        type="email"
                        label="Email *"
                        color="black"
                        variant="outlined"
                        className="bg-gray-100 focus:bg-gray-50 text-black border-gray-300"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="relative">
                    <Select variant="outlined" 
                        label="Sex"
                        onChange={(value) => setFormData({...formData, sex: value})}
                    
                    >
                        <Option className='text-black' value='Male'>Male</Option>
                        <Option className='text-black' value='Female'>Female</Option>
                        <Option className='text-black' value='Prefer not to say'>Prefer not to say</Option>
                    </Select>
                </div>
                <div className="relative">
                    <PhoneInput
                        className="phone-input-container mt-2 mb-4 w-full px-3 py-2 border border-gray-300 text-black rounded-2xl"
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="PH"
                        placeholder="Enter phone number"
                        value={joinerContactNo}
                        onChange={setJoinerContactNo}
                    />  
                </div>
                <div className="relative">
                    <Input
                        type="text"
                        label="Pick-up Location"
                        color="black"
                        variant="outlined"
                        className="bg-gray-100 focus:bg-gray-50 text-black border-gray-300"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleInputChange}
                    
                    />
                </div>
                <div className="relative">
                    <Input
                        type="text"
                        label="Age"
                        color="black"
                        variant="outlined"
                        className="bg-gray-100 focus:bg-gray-50 text-black border-gray-300"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="relative">
                    <Input
                        type="text"
                        label="Home Address"
                        color="black"
                        variant="outlined"
                        className="bg-gray-100 focus:bg-gray-50 text-black border-gray-300"
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="relative">
                    <Select 
                        label="Have medical condition?" 
                        color="black" 
                        onChange={(value) => setFormData({...formData, medicalCondition: value})}
                    >
                        <Option className='text-black' value='Yes'>Yes</Option>
                        <Option className='text-black' value='No'>No</Option>
                    </Select>
                </div>
                <div className="relative">
                    <Input
                        type="text"
                        label="If yes, please state..."
                        color="black"
                        variant="outlined"
                        className="bg-gray-100 focus:bg-gray-50 text-black border-gray-300"
                        name="conditionDetails"
                        value={formData.conditionDetails}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="relative">
                    <Input
                        type="text"
                        label="Emergency Contact Person"
                        color="black"
                        variant="outlined"
                        className="bg-gray-100 focus:bg-gray-50 text-black border-gray-300"
                        name="emergencyContactPerson"
                        value={formData.emergencyContactPerson}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="relative">
                    <PhoneInput
                        className="phone-input-container mt-2 mb-4 w-full px-3 py-2 border border-gray-300 text-black rounded-2xl"
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="PH"
                        placeholder="Enter phone number"
                        value={emergencyContactNo}
                        onChange={setEmergencyContactNo}
                    />  
                </div>
                <div className="relative">
                    <Select 
                        label="Relationship" 
                        color="black" 
                        className="" 
                        onChange={(value) => setFormData({...formData, relationship: value})}
                    >
                        <Option className='text-black' value='Self'>Self</Option>
                        <Option className='text-black' value='Sibling'>Sibling</Option>
                        <Option className='text-black' value='Guardian'>Guardian</Option>
                        <Option className='text-black' value='Partner'>Partner</Option>
                    </Select>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <p className="text-lg mr-4">PAYMENT:</p>
                <input
                    type="file" 
                    onChange={uploadProofPayment}
                    accept="image/*"  
                    id="file-upload"
                    className="hidden" // Hide the actual file input
                />
                <label htmlFor="file-upload" className="flex items-center w-80 px-4 py-2 border border-gray-300 text-black rounded-2xl cursor-pointer">
                    <FiUpload className='w-5 h-5 mr-4' />
                    <span>{isUploading ? <Spinner size="sm" /> : "Upload Proof of Payment"}</span>
                </label>

                
                <Select label="Type Payment" color="black" className="">
                    <Option className='text-black'>Downpayment</Option>
                    <Option className='text-black'>Full Payment</Option>
                </Select>
            </div>

            <ReactSortable
                list={proofPaymentImages}
                className="flex flex-wrap gap-1"
                setList={updateProofImagesOrder}>
                {!!proofPaymentImages?.length && proofPaymentImages.map(link => {
                    return(
                        <div key={link} className=" w-36 h-36">
                            <img src ={link} alt="" className="w-full h-full object-cover rounded-lg"/>
                        </div>
                    );
                })}
                
            </ReactSortable>
            {/* {isUploading && (
            <div className="h-24 flex items-center">
                <Spinner size="sm" />
            </div>
            )} */}

            {/* Checkbox */}
                <Checkbox
                label={
                    <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal text-white"
                    >
                    I agree the
                    <a
                        onClick={handleOpen}
                        className="font-medium transition-colors hover:text-gray-900"
                    >
                        &nbsp;Terms and Conditions
                    </a>
                    </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
                onChange={handleTermsChange}
                />
            
            {/* Book Button */}
            <div className="flex justify-end">
                <Button 
                    color="red"
                    onClick={handleSubmit} 
                disabled={!formData.termsAccepted}
                >
                    Book
                </Button>
            </div>





            {/* Terms and Conditions Modal */}
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Its a simple modal.</DialogHeader>
                <DialogBody>
                The key to more success is to have a lot of pillows. Put it this way,
                it took me twenty five years to get these plants, twenty five years of
                blood sweat and tears, and I&apos;m never giving up, I&apos;m just
                getting started. I&apos;m up to something. Fan luv.
                </DialogBody>
                <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleOpen}>
                    <span>Confirm</span>
                </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default JoinerDetailsForm;
