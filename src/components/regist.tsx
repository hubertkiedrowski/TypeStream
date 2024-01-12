import React, { FormEvent, useState } from 'react';
import "./css/regist.css";
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    repeatpassword: string,
  }

const Regist = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        repeatpassword: '',
    });

    const [registrationError, setRegistrationError] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleButtonClickLogin = () => {

        navigate('/login');

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            const response = await fetch('http://localhost:3000/regist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if(response.ok) {

                console.log('Benutzer erfolgreich registriert!');
                navigate('/login');

            } else {

                console.error('Fehler bei der Registrierung', response.statusText);
                setRegistrationError(true);

            }
        } catch (error) {

            console.error('Fehler bei Registrierung:', error);
            setRegistrationError(true);

        }
    };

    return (
        <>  
            <div className="warpper">

                <div className="formular">

                <h2>Regist</h2>

                <form onSubmit={handleSubmit}>

                    <label className="innerForm" >Firstname</label>
                    <input 
                        type="text"
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="innerForm" />

                    <label className="innerForm" >Lastname</label>
                    <input 
                        type="text"
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="innerForm" />

                    <label className="innerForm" >E-Mail</label>
                    <input 
                        type="email"
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="innerForm" />

                    <label className="innerForm" >Username</label>
                    <input 
                        type="text"
                        name="userName" 
                        value={formData.userName}
                        onChange={handleInputChange}
                        className="innerForm" />

                    <label className="innerForm" >Password</label>
                    <input 
                        type="password"
                        name="password" 
                        value={formData.password}
                        onChange={handleInputChange}
                        className="innerForm" />

                    <label className="innerForm" >Repeat Password</label>
                    <input 
                        type="password"
                        name="repeatpassword" 
                        value={formData.repeatpassword}
                        onChange={handleInputChange}
                        className="innerForm" />


                    <a href="" className="forget">Forget password?</a>

                    {registrationError && <p>Registrierung fehlgeschlagen!</p>}
                    
                    <button type="submit">Registrieren</button>

                    <button onClick={handleButtonClickLogin}>Back to Login</button>

                </form>

                </div>

            </div>
        </>
    );
}

export default Regist;