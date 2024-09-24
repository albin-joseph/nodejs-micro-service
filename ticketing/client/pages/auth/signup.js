import { useState } from "react";
import axios from "axios";

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        
       const response = await axios.post('/api/users/signup', {
            email,
            password
        });

        console.log(response.data)
    };

    return (
        <div className="contaimer m-5">
           <form onSubmit={onSubmit}>
                <h1>Sign Up</h1>
                <div className="form-group row mb-5">
                    <label>Email Address</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} className="form-control"/>
                </div>
                <div className="form-group row mb-5">
                    <label>Password</label>
                    <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="form-control"/>
                </div>
                <button className="btn btn-primary">Sign Up</button>
            </form> 
        </div>
    )
}

export default SignUp;