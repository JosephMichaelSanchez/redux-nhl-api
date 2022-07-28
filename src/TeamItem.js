import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function TeamItem({ team }) {

    const dispatch = useDispatch();
    const [teamStats, setTeamStats] = useState([]);

    const setStats = () => {
        dispatch({
            type: 'SET_STATS',
            payload: teamStats
        })
    }


    const getStats = () => {
        console.log('get stats clicked');
        axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}?expand=team.stats`).then(res => {
            console.log(res.data.teams[0].teamStats[0].splits[0].stat);

        })
        setStats();
        
        
    }
    return (<>
        <p>Team ID: {team.id} Team Name: {team.name} <button onClick={getStats}>Get Team Stats</button></p>
    </>
    )
}

export default TeamItem;