import { useEffect } from 'react';
import axios from 'axios';
import Packages from '../components/Packages'; // Import the Packages component

export default function EditEvent({ updatedData, setUpdatedData, setEditMode, packageId }) {
    useEffect(() => {
        const fetchPackageData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/packages/${packageId}`, { withCredentials: true });
                setUpdatedData(response.data);
            } catch (err) {
                console.error('Error fetching package data:', err);
                alert('Failed to fetch package data. Please try again.');
            }
        };

        if (packageId) { // Only fetch if packageId is defined
            fetchPackageData();
        }
    }, [packageId, setUpdatedData]);

    const handleSave = async () => {
        try {
            // Ensure updatedData has the correct structure and all required fields
            if (!updatedData.packages || updatedData.packages.length === 0) {
                alert('Please select at least one package.');
                return;
            }
            // Make the API call to update the package
            const response = await axios.put(`http://localhost:4000/packages/${packageId}`, updatedData, { withCredentials: true });
            if (response.status === 200) {
                alert('Package updated successfully!');
                setEditMode(false); // Exit edit mode after saving
            }
        } catch (err) {
            console.error('Error updating package:', err);
            if (err.response) {
                alert(`Failed to update package: ${err.response.data.message || 'Unknown error occurred.'}`);
            } else {
                alert('Failed to update package. Please try again later.');
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Edit Package</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Packages</label>
                <Packages 
                    selected={updatedData.packages || []} // Assuming updatedData.packages is an array
                    onChange={(newSelected) => setUpdatedData({ ...updatedData, packages: newSelected })}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                <input 
                    type="number" 
                    value={updatedData.price || ''} // Ensure value is controlled
                    onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })} 
                    className="w-full px-3 py-2 border rounded-md" 
                    placeholder="Enter price" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Payment Options</label>
                <input 
                    type="text" 
                    value={updatedData.paymentOptions || ''} // Ensure value is controlled
                    onChange={(e) => setUpdatedData({ ...updatedData, paymentOptions: e.target.value })} 
                    className="w-full px-3 py-2 border rounded-md" 
                    placeholder="Enter payment options" 
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Extra Info</label>
                <textarea 
                    value={updatedData.extraInfo || ''} // Ensure value is controlled
                    onChange={(e) => setUpdatedData({ ...updatedData, extraInfo: e.target.value })} 
                    className="w-full px-3 py-2 border rounded-md" 
                    placeholder="Enter extra information" 
                />
            </div>
            <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save</button>
            <button type="button" className="bg-gray-500 text-white p-2 rounded ml-4" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
    );
}
