import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import EditEvent from "../components/EditEvent";
import { useNavigate } from "react-router-dom";

export default function EventsPage() {
    const navigate = useNavigate(); // Initialize navigate
    const [packages, setPackages] = useState([]); 
    const [updatedData, setUpdatedData] = useState({
        packages: '',
        price: '',
        paymentOptions: '',
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuests: '',
        date: '', 
        timestamp: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState(null);  

    function formatTimestamp(timestamp) {
        return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }    
    
    function formatTime(time) {
        if (time && typeof time === 'object' && 'hours' in time && 'minutes' in time) {
            return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;
        }
        return '';
    }

    const handleTACreateBooking = () => {
      navigate('/account/admin/bookings/add'); // Navigate to add staff page
    };
    const handleAddPackageClick = () => {
        navigate('/account/events/adminTrails'); // Navigate to PackageForm
    };

    useEffect(() => {
        axios.get('http://localhost:4000/packages', { withCredentials: true })
            .then(({ data }) => {
                console.log("Fetched packages:", data);
                setPackages(data); 
            })
            .catch((err) => {
                console.error("Error fetching packages:", err);
            });
    }, []);
    
    const handleEdit = (pkg) => {
        setEditMode(true);
        setSelectedPackageId(pkg._id);
        setUpdatedData({
            packages: pkg.packages.join(', '),
            price: pkg.price,
            paymentOptions: pkg.paymentOptions,
            extraInfo: pkg.extraInfo,
            checkIn: pkg.checkIn,
            checkOut: pkg.checkOut,
            maxGuests: pkg.maxGuests,
            date: pkg.date, // Ensure this points to the correct date field
            timestamp: pkg.timestamp // Ensure this points to the correct timestamp field
        });
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/packages/${selectedPackageId}`, updatedData, { withCredentials: true })
            .then((response) => {
                console.log("Package updated:", response.data);
                setEditMode(false);
                setPackages(packages.map(pkg => 
                    pkg._id === selectedPackageId ? response.data : pkg
                ));
            })
            .catch((error) => {
                console.error("Error updating package:", error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/packages/${id}`, { withCredentials: true })
            .then((response) => {
                console.log("Package deleted:", response.data);
                setPackages(packages.filter(pkg => pkg._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting package:", error);
            });
    };

    return (
        <div className="p-2">
            <div>
                {editMode ? (
                    <form onSubmit={handleSaveEdit} className="mb-6">
                        <EditEvent 
                            updatedData={updatedData} 
                            setUpdatedData={setUpdatedData} 
                            setEditMode={setEditMode} 
                            packageId={selectedPackageId} />
                    </form>
                ) : (
                    <div>
                        <div className="text-center mb-6">
                            <button 
                                className="inline-flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105" 
                                onClick={handleTACreateBooking}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Create Booking
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto border bg-white shadow-lg rounded-xl p-6">  
                            <h2 className="text-xl mb-4">Booking List</h2>  
                            {packages.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mountain Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packages</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Extra Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EST. Call Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EST. End Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Guests</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time Created</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {packages.map((pkg) => {
                                            const formattedDate = dayjs(pkg.date).format('YYYY-MM-DD'); // Move inside map
                                            return (
                                                <tr key={pkg._id}>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <h2>{pkg.trailId?.title || 'Trail Title Not Available'}</h2>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        <ul className="list-disc list-inside">
                                                            {pkg.packages.map((item, index) => (
                                                                <li key={index} className="py-1">{item}</li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.price}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.paymentOptions}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.extraInfo}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatTime(pkg.checkIn)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatTime(pkg.checkOut)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.maxGuests}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formattedDate}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatTimestamp(pkg.timestamp)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        <div className="flex flex-col items-start space-y-2">
                                                            <button className="flex items-center space-x-1 bg-transparent text-blue-600 hover:text-blue-900 md:font-semibold" onClick={() => handleEdit(pkg)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                </svg>
                                                                <span>Edit</span>
                                                            </button>
                                                            <button className="flex items-center space-x-1 bg-transparent text-red-600 hover:text-red-900 md:font-semibold" onClick={() => handleDelete(pkg._id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                                </svg>
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div>No packages available</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
