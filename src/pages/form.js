import React, { useState } from 'react';
import * as Yup from 'yup';
import { db } from '../config';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumber } from 'libphonenumber-js';

const Form = () => {
    const [details, setDetails] = useState({});
    const [isDisable, setIsDisable] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (phone) => {
        setDetails({ ...details, phone });
    };

    const validationSchema = Yup.object({
        firstname: Yup.string()
            .matches(/^[A-Za-z]+$/, "Only Alphabets")
            .required("First name is required"),
        lastname: Yup.string()
            .matches(/^[A-Za-z]+$/, "Only Alphabets")
            .required("Last name is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Must be a valid email"),
        phone: Yup.string().required("Phone number is required"),
        // specialize: Yup.string()
        //     .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed")
        //     .required("Company's specialization is required"),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(details, { abortEarly: false });

            // Format phone number
            const phoneNumber = parsePhoneNumber(details.phone, 'GB'); // Default country is UK
            const formattedPhoneNumber = phoneNumber ? phoneNumber.formatInternational() : details.phone;

            // If validation passes, proceed to submit the data
            await addDoc(collection(db, "userinputs"), {
                email: details.email,
                firstname: details.firstname,
                lastname: details.lastname,
                phone: formattedPhoneNumber, // Save the formatted phone number
                // specialization: details.specialize
            });

            setErrors({});
            navigate(`/details/${details.firstname}`);
        } catch (error) {
            const newErrors = {};
            error.inner.forEach(err => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
            setIsDisable(false);
        }
    };

    return (
        <>
            <div className='flex items-center justify-center'>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 justify-center leading-tight">
                    Sign up here for great marketing content from HubSpot!
                </h1>
            </div>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <p className='text-red-500'>{errors.firstname && <p>{errors.firstname}</p>}</p>
                            <label htmlFor="firstname" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                                First Name <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                value={details.firstname || ''}
                                className="w-full p-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setDetails({ ...details, firstname: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <p className='text-red-500'>{errors.lastname && <p>{errors.lastname}</p>}</p>
                            <label htmlFor="lastname" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                                Last Name <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                value={details.lastname || ''}
                                className="w-full p-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setDetails({ ...details, lastname: e.target.value })}
                            />
                        </div>

                        <div className="mb-6">
                            <p className='text-red-500'>{errors.email && <p>{errors.email}</p>}</p>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                                Email <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={details.email || ''}
                                className="w-full p-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                            />
                        </div>

                        <div className="mb-6">
                            <p className="text-red-500">
                                {errors.phone && <p>{errors.phone}</p>}
                            </p>

                            <label
                                htmlFor="phone"
                                className="block text-sm font-semibold text-gray-700 mb-1 text-left"
                            >
                                Phone <span className="text-red-500">*</span>
                            </label>

                            <PhoneInput
                                country={'gb'} // Set default country to UK
                                value={details.phone || ''}
                                onChange={handleChange} // Update 'details' state directly
                                inputProps={{
                                    name: 'phone',
                                    id: 'phone',
                                    required: true,
                                    autoFocus: true
                                }}
                                inputStyle={{
                                    width: '100%',
                                    paddingLeft: '60px',
                                    padding: '10px',
                                    border: '1px solid #D1D5DB',
                                    backgroundColor: '#F3F4F6',
                                    outline: 'none',
                                    borderRadius: '4px',
                                }}
                            />
                        </div>

                        {/* <div className="mb-4">
                            <p className='text-red-500'>{errors.specialize && <p>{errors.specialize}</p>}</p>
                            <label htmlFor="specialize" className="block text-sm font-semibold text-gray-700 mb-1 text-left">
                                What does your company specialize in <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="text"
                                id="specialize"
                                value={details.specialize || ''}
                                className="w-full p-2 border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setDetails({ ...details, specialize: e.target.value })}
                            />
                        </div> */}

                        <p className="text-sm text-left text-gray-600 mb-6">
                            We're committed to your privacy. HubSpot uses the information you provide to us to contact you about our relevant content, products, and services. You may unsubscribe from these communications at any time. For more information, check out our{' '}
                            <a href="#" className="text-blue-700 underline">
                                Privacy Policy.
                            </a>
                        </p>

                        <div className="flex">
                            <button
                                type="submit"
                                disabled={isDisable}
                                className={`w-36 py-2 px-4 font-semibold transition-colors ${isDisable ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                            >
                                Let's go!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Form;
