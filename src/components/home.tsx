import React from 'react';
import "./css/homenew.css";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const onClickStart = () => {
        navigate("/chooseKeyboard");
    }

    return (
        <>
            <div className="content-container">
                <div className={"textleft"}>
                    <div className={"homeheadline"}>
                        <h1>Erlerne schnelleres Tippen kostenlos und spielerisch!</h1>
                    </div>
                    <div className={"hometext"}>
                        <p>
                            Die Beherrschung eines zügigen Tippstils ist in der heutigen digitalen Ära sehr hilfreich, um Schritt zu halten.
                            Unser Tipplerner ermöglicht selbst den jüngsten Nutzern, das Schreiben am Computer auf spielerische Weise zu erlernen.
                            Unser Lernprogramm ist für alle Altersgruppen ansprechend und völlig kostenfrei.
                        </p>
                    </div>
                    <div className="startButton">
                        <button onClick={onClickStart}>Los geht's!</button>
                    </div>
                </div>

                <div className={"textright"}>
                    <div className={"bild"}>
                        <img src={"src/components/img/apple-wireless-keyboard-with-css3.png"} alt="unsere Anwendung" width={650}/>
                    </div>
                </div>
            </div>

            
        </>
    );
}

export default Home;
