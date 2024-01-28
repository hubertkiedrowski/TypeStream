import React from 'react';
import "./css/navbar.css";
import { Link } from 'react-router-dom';

const ueberUns = () => {

    return (
        <>
            <div>
                <>
                    <div style={{ background: "rgba(0, 0, 0, 0.5)", padding: "3em"}}>
                        <h2 style={{ textAlign: "center", fontWeight: "bold", color: "white", padding: "1em"}}>
                            Über uns
                        </h2>
                        <h4 style={{fontSize: "25px"}}>
                            Wir sind Team 4, bestehend aus:
                        </h4>
                        <h3>
                            Magnus Béla Brix
                        </h3>
                        <h3>
                            Hubert Kiedrowski
                        </h3>
                        <h3>
                            Marcus Constantin Möller
                        </h3>
                        <h3>
                            Leonie Pfaff
                        </h3>
                        <p style={{fontSize: "20px", color: "white", padding: "1em"}}>
                            Dieses Projekt ist im Rahmen des Moduls "Software Engineering" entstanden.
                            <br/>
                            Viel Spaß beim Tippen lernen!
                        </p>

                        <div>
                            <p className="socials">
                                Folge uns auf Social Media:
                            </p>
                            <a href="https://www.instagram.com/marcusnurderhsv?igsh=MW12NGxhYTlyYW9vOA==">
                                <img src={"src/components/img/socials.png"} alt="Socials" width={200}/>
                            </a>
                        </div>
                    </div>

                </>
                
                
            </div>
        </>
    );
}

export default ueberUns;