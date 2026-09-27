import { useState } from 'react';
import {Link} from 'react-router-dom'
import api from '../api/axios';

function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Passwords do not match');
            return;
        }

        try{
            const response = await api.post('/api/v1/auth/register', { name, email, password });
            console.log(response.data);
        } 
        catch(error){
            console.error('Error registering user:', error);
        }
    }

    return(
        <div>
            <h1>Register Page</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" 
                    value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" 
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" 
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>

            <p>Already have an account? <Link to="/login"><button>Login</button></Link></p>
        </div>
    )
}

export default Register;