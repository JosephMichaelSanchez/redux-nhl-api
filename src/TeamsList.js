import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function TeamsList() {

    const [teamList, setTeamList] = useState([]);

    const getTeams = () => {
        axios.get('https://statsapi.web.nhl.com/api/v1/teams').then(res => {
            // the data portion of the response will be the new value of the tealList array
            setTeamList(res.data.teams);
        });
    }

    return (
        <>
            <h3>TeamsList goes here:</h3>
            <button onClick={getTeams}>Get NHL Team Info</button>
            {/* loop through the teamList array if it has at least one object inside it */}
            {teamList.length >= 1 ? teamList.map((team, i) => {
                return <p key={i}>Team ID: {team.id} - Team Name: {team.name} </p>
            }) : ''}
        </>
    )
}

export default TeamsList;