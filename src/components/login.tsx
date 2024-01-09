import React, { FormEvent, useState } from 'react';
import "./css/login.css";
import { useNavigate } from 'react-router-dom';
import * as bcrypt from 'bcryptjs';


interface FormData {
    userName: string;
    email: string;
    password: string
}

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        userName: '',
        email: '',
        password: '',
    });

    const [loginError, setLoginError] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const authString = `${formData.email}:${formData.userName}:${formData.password}`;
            const base64Auth = btoa(authString);
            console.log('Authentifizierungszeichenkette:', authString);

            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${base64Auth}`,
                },
                body: JSON.stringify(formData),
            });

            if(response.ok) {
                
                console.log('Benutzer erfolgreich eingeloggt!');
                navigate('/loginErfolgreich', { state: { userName: formData.userName } });

            } else {

                console.error('Fehler beim Einloggen', response.statusText);

                console.log('Fehlerobjekt:', await response.json());

                setLoginError(true);
            }
        } catch (error) {

            console.error('Fehler beim Einloggen:', error);
            setLoginError(true);

        }
    }; 

    const handleButtonClick = () => {

        navigate('/regist');

    }

    return (
        <>  
            <div className="warpper">

                <div className="formular">

                <h2>Login</h2>

                <form onSubmit={handleSubmit}>

                    <label className="innerForm" >Username</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        className="innerForm" />

                    <label className="innerForm" >Email</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="innerForm" />

                    <label className="innerForm" >Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="innerForm" />

                    <a href="" className="forget">Forget password?</a>

                    {loginError && <p>Login fehlgeschlagen!</p>}

                    <button type="submit">Login</button>

                    <button onClick={handleButtonClick}>Regist</button>

                </form>

                </div>

            </div>
        </>
    );
}

export default Login;