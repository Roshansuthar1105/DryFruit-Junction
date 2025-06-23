// src/components/VisitorCounter.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const VisitorCounter = ({ location = 'footer' }) => {
    const [count, setCount] = useState(null);
    const { BACKEND_API } = useAuth();
    useEffect(() => {
        const updateCounter = async () => {
            try {
                // Use POST for homepage to increment, GET for footer to just display
                const endpoint = location === 'home' ? `${BACKEND_API}/api/visitors` : `${BACKEND_API}/api/visitors/count`;
                const method = location === 'home' ? 'post' : 'get';

                const response = await axios[method](endpoint);
                if (response.data.success) {
                    setCount(response.data.count);
                }
            } catch (error) {
                console.error('Error updating visitor count:', error);
            }
        };

        updateCounter();
    }, [location]);

    if (count === null) return null;

    return (
        <div className={`${location === 'footer' ? 'text-gray-400 text-sm' : 'text-white bg-pink-600 px-3 py-1 rounded-full'}`}>
            {location === 'footer' ? 'Total Visitors: ' : ''}
            {count.toLocaleString()}
        </div>
    );
};

export default VisitorCounter;