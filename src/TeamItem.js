import React, { useState } from 'react';
import axios from 'axios';

function TeamItem({ team }) {

    const [teamStats, setTeamStats] = useState([]);

    
    const getStats = () => {
        console.log('get stats clicked');
        axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}?expand=team.stats`).then(res => {
            setTeamStats(res.data.teams)

        })
        getStats();
        
        
    }
    return (<>
        <p>Team ID: {team.id} Team Name: {team.name} <button onClick={getStats}>Get Team Stats</button></p>
    </>
    )
}

export default TeamItem;