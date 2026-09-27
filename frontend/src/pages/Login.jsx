import { useState } from 'react';
import {Link} from 'react-router-dom'
import api from '../api/axios';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post('/api/v1/auth/login', { email, password });
            console.log(response.data);
        } 
        catch(error){
            console.error('Error logging in user:', error);
        }
    }

    return(
        <div>
            <h1>Login Page</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" 
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>

            <p>New User? <Link to="/register"><button>Register</button></Link></p>
        </div>
    )
}

export default Login;