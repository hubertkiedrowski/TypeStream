import React from 'react';
import "./css/leaderboard.css";
import { Link } from 'react-router-dom';
import { fetchPoints, fetchUserdata } from './api';
import { Point, User } from '@prisma/client';




const Profiles = () => {

    return (
        <>  
            <div id="profile">
                {Item()}
            </div>
        
        </>
    );
}

export default Profiles;

const Item = () => {
    const points = fetchPoints("/points/leaderboard/5");
    const userPoints = fetchPoints("/points/0");
    const userData = fetchUserdata("/users/3");

    const userData1 = fetchUserdata("/users/" +points?.[0].userId)
    const userData2 = fetchUserdata("/users/" +points?.[1].userId)
    const userData3 = fetchUserdata("/users/" +points?.[2].userId)
    const userData4 = fetchUserdata("/users/" +points?.[3].userId)
    const userData5 = fetchUserdata("/users/" +points?.[4].userId)

    console.log(userData1,userData2,userData3,userData4,userData5)
    //console.log(userData);
    const top5Users: (User | null)[] = [];
    top5Users.push(userData1,userData2,userData3,userData4,userData5)
    
    

    return(
            <>
                {top5Users.map((user, index) => ( 
                    <div className="flex" >
                    <div className="item">
                        <img src="https://www.amaraventures.in/assets/uploads/testimonial/user.png"alt="picture" />

                <div className="info">
                    <h3 className="name text-dark">{user?.userName}</h3>
                    <span>{"Score: " +points?.[index].score}</span>
                </div>
                </div>
                <div className="item">
                <span>{"Time Played: " +points?.[index].timePlayed}</span>
            </div>
        </div>
    ))}
    </>
            
)}