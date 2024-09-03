import React from 'react';
import { useParams } from 'react-router-dom';

function Call() {
    const { name } = useParams();
    console.log(name)
    return (
        
        <div className="flex items-center justify-center h-screen bg-blue-500">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    Hi {name}! you will get a call from one of our employees.
                </h1>
            </div>
        </div>
    );
}

export default Call;
