import React, { useState } from 'react';
import PhoneInput from "react-phone-input-2";
import { toast, Toaster } from "react-hot-toast";


const YourComponent = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [name, setName] = useState('');
  const [dob, setDOB] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onAddVoter = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          aadhaarNumber,
          name,
          dob,
          phoneNumber
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add voter');
      }
      toast.success("voter added successfully!");
      // Assuming response contains the new voter data
      const data = await response.json();
      setPhoneNumber(data.phoneNumber);
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
<section className="container d-flex align-items-center justify-content-center vh-100">
    <div className='text-white bg-dark-transparent p-4'>
        <form>
            <div className="mb-3">
                <label htmlFor="aadhaarNumber" className="form-label">Aadhaar Number</label>
                <input type="text" className="form-control" id="aadhaarNumber" value={aadhaarNumber} onChange={(e) => setAadhaarNumber(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input type="date" className="form-control" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                <PhoneInput country={"in"} inputClass="form-control" value={phoneNumber} onChange={setPhoneNumber} />
            </div>
            <button type="button" className="btn btn-primary" onClick={onAddVoter} disabled={loading}>Add Voter</button>
            {phoneNumber && <p>Phone Number: {phoneNumber}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    </div>

</section>

  );
};

export default YourComponent;
