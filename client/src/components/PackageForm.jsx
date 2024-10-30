import axios from "axios";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import dayjs from "dayjs"; 
import Packages from "../components/Packages";

export default function PackageForm({ trailId, onPackageCreated }) {
    const [packages, setPackages] = useState([]);
    const [price, setPrice] = useState('');
    const [paymentOptions, setPaymentOptions] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); 
    const [message, setMessage] = useState(''); 

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    // Helper function to convert 'HH:MM' to an object { hours, minutes }
    function timeStringToObject(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return { hours, minutes };
    }

    async function addNewPackage(ev) {
        ev.preventDefault();
        try {
            // Convert time strings to objects with hours and minutes
            const checkInTime = timeStringToObject(checkIn);
            const checkOutTime = timeStringToObject(checkOut);
    
            // Ensure the selected date is valid and create a timestamp
            if (!selectedDate) {
                alert('Please select an event date');
                return;
            }
            
            // Format the selected date
            const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
            
            // Create a timestamp with the local timezone
            const timestamp = new Date(); // This will already use local time
    
            // Sending package details to the server
            await axios.post('http://localhost:4000/packages', {
                trailId,
                packages,
                price, 
                paymentOptions, 
                extraInfo, 
                checkIn: checkInTime, 
                checkOut: checkOutTime, 
                maxGuests, 
                date: formattedDate, // Include the formatted date in the request
                timestamp: timestamp // Use the Date object directly
            }, { withCredentials: true });
    
            // Show success message and alert user
            setMessage('New package posted successfully!');
            alert('New package posted successfully!');
            
            // Call the onPackageCreated function to notify the parent component
            onPackageCreated(response.data);
            
            // Clear form fields after successful submission
            setPackages([]);
            setPrice('');
            setPaymentOptions('');
            setExtraInfo('');
            setCheckIn('');
            setCheckOut('');
            setMaxGuests('');
            setSelectedDate(null);
        } catch (err) {
            console.error('Error posting package:', err); // Log the error
            setMessage('Failed to post package.');
            alert('Failed to post package.');
        }
    }
    

    return (
        <>
        <div className="mt-8">
            {/* Show success message */}
            {message && (
                <div className="alert bg-green-200 text-green-800 px-4 py-2 mb-4 rounded">
                    {message}
                </div>
            )}

            {/* Use flex to arrange form content */}
            <div className="flex justify-between">
                {/* Left side: form inputs */}
                <div className="w-full md:w-7/12">
                    <form onSubmit={addNewPackage}>
                        {preInput('Packages Inclusions', 'Select all packages available')}
                        <div className="mt-2">
                            <Packages selected={packages} onChange={setPackages} />
                        </div>
    
                        {preInput('Extra Info', 'Hiking rules & regulations')}
                        <textarea
                            value={extraInfo}
                            onChange={ev => setExtraInfo(ev.target.value)}
                            className="w-full border mt-2 p-2 rounded"
                        />
    
                        {preInput('Tour start & end', 'Add tour estimated start and end for guests')}
                        <div className="grid gap-1 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check-in time</h3>
                                <input type="time"
                                    value={checkIn}
                                    onChange={ev => setCheckIn(ev.target.value)}
                                    placeholder="14:00"
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check-out time</h3>
                                <input type="time"
                                    value={checkOut}
                                    onChange={ev => setCheckOut(ev.target.value)}
                                    placeholder="11:00"
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of joiners</h3>
                                <input type="text"
                                    value={maxGuests}
                                    onChange={ev => setMaxGuests(ev.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                        </div>
                        <button className="primary my-4 w-full p-2 bg-blue-500 text-white rounded">Save</button>
                    </form>
                </div>
    
                {/* Right side: Date picker */}
                <div className="flex flex-col self-start max-w-sm mt-6"> {/* Changed to flex-col and self-start */}
                    <div className="p-4 border rounded-2xl w-auto">
                        {preInput('Event Date', 'Select event date')}
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate} // Update selected date state
                        />
                    </div>
                    <div>
                        {preInput('Price', 'Choose price of the tour')}
                        <input type="text"
                                    value={price}
                                    onChange={ev => setPrice(ev.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                    </div>
                    <div>
                        {preInput('Payment Method', 'Input payment method and details')}
                        <textarea
                            value={paymentOptions}
                            onChange={ev => setPaymentOptions(ev.target.value)}
                            className="w-full border mt-2 p-2 rounded"
                        />
                    </div>
                </div>
            </div>
        </div>         
        </>
    );    
}
