import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


function TeamItem({ team }) {

    const dispatch = useDispatch();
    const gamesPlayed = useSelector(store => store.statsReducer.gamesPlayed)
    const teamWins = useSelector(store => store.statsReducer.wins);
    const teamLosses = useSelector(store => store.statsReducer.losses);
    const teamPoints = useSelector(store => store.statsReducer.pts)
    const teamGoalsPerGame = useSelector(store => store.statsReducer.goalsPerGame)
    const gameDate = useSelector(store => store.dateReducer)

    const logState = () => {
        
            console.log(team.id, team.name, gamesPlayed, teamWins, teamLosses, teamPoints, teamGoalsPerGame, gameDate);
            
    }


    const getStats = async () => {

        try {
            const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}?expand=team.stats`);
            console.log(res.data.teams[0].teamStats[0]);
            
            dispatch ({
                type: 'SET_STATS',
                payload: res.data.teams[0].teamStats[0].splits[0].stat
            })

        } catch (err) {
            console.log(err);

        }
        try {
            const response = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}?expand=team.schedule.next`)
            console.log(response.data.teams[0].nextGameSchedule.dates[0].date)
            
            dispatch ({
                type: 'SET_DATE',
                payload: response.data.teams[0].nextGameSchedule.dates[0].date
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