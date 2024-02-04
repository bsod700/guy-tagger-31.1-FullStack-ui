import React, { useState } from 'react';
import userService from '../services/userService'; // Adjust the import path as necessary

const Login = ({ onLoginSuccess }: { onLoginSuccess: (userName: string, userId: number) => void }) => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');

    const handleLogin = async () => {
        try {
            const userIdNumber = parseInt(userId, 10);
            if (isNaN(userIdNumber)) {
                alert('Please enter a valid user ID');
                return;
            }

            const userResponse = await userService.getUser(userIdNumber);
            
            if (userResponse.notFound) {
                // User not found, add a new user
                await userService.setUser(name, userIdNumber);
            }
            // Regardless of whether the user was found or added, proceed with login success logic
            onLoginSuccess(name, userIdNumber);
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to login');
        }
    };

    return (
        <div className='container'>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
