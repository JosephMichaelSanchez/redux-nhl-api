import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


function TeamItem({ team }) {

    const dispatch = useDispatch();
    const [teamStats, setTeamStats] = useState({});
    const gamesPlayed = useSelector(store => store.statsReducer.gamesPlayed)
    

    const logState = () => {
        
            console.log(gamesPlayed);
            
    }


    const getStats = async () => {

        try {
            const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}?expand=team.stats`);
            console.log(res.data.teams[0].teamStats[0].splits[0].stat);
            
            dispatch ({
                type: 'SET_STATS',
                payload: res.data.teams[0].teamStats[0].splits[0].stat
            })

        } catch (err) {
            console.log(err);

        }
        
    }
    return (<>
        <p>Team ID: {team.id} Team Name: {team.name} <button onClick={getStats}>Get Team Stats</button><button onClick={logState}>Download CSV</button></p>
    </>
    )
}

export default TeamItem;