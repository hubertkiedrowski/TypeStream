import React from 'react';
import "./css/navbar.css";
import { Link } from 'react-router-dom';

const ueberUns = () => {

    return (
        <>
            <div>
                <>
                    <div style={{ background: "rgba(0, 0, 0, 0.5)", padding: "5em"}}>
                        <h2 style={{ textAlign: "center", fontWeight: "bold", color: "white", padding: "1em"}}>
                            Über uns
                        </h2>
                        <h4>
                            Wir sind Team 4, bestehend aus:
                        </h4>
                        <h3>
                            Magnus Béla Brix
                        </h3>
                        <h3>
                            Hubert Kiedrowski
                        </h3>ß
                        <h3>
                            Marcus Constantin Möller
                        </h3>
                        <h3>
                            Leonie Pfaff
                        </h3>
                        <p style={{fontSize: "15px", color: "white", padding: "1em"}}>
                            Dieses Projekt ist im Rahmen des Moduls "Software Engineering" entstanden.
                            <br/>
                            Viel Spaß beim Tippen lernen!
                        </p>
                    </div>
                </>
            </div>
        </>
    );
}

export default ueberUns;