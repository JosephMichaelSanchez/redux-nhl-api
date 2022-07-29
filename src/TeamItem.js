import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";



function TeamItem({ team }) {

    const dispatch = useDispatch();
    const gamesPlayed = useSelector(store => store.statsReducer.gamesPlayed)
    const teamWins = useSelector(store => store.statsReducer.wins);
    const teamLosses = useSelector(store => store.statsReducer.losses);
    const teamPoints = useSelector(store => store.statsReducer.pts)
    const teamGoalsPerGame = useSelector(store => store.statsReducer.goalsPerGame)
    const gameDate = useSelector(store => store.dateReducer);
    const firstOpponent = useSelector(store => store.opponentReducer);

    const data = [
        ['Team ID', 'Team Name', 'Team Venue Name', 'Games Played', 'Wins', 'Losses', 'Points', 'Goals Per Game', 'Date of 1st Game', '1st Game Opponent'],
        [team.id, team.name, team.venue.name, gamesPlayed, teamWins, teamLosses, teamPoints, teamGoalsPerGame, gameDate, firstOpponent]
    ];


    const getStats = async () => {

        try {
            const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}?expand=team.stats`);
            
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
        
        try {
            const r = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}?expand=team.schedule.next`)
            console.log(r.data.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name)

            if (r.data.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name != team.name) {

                dispatch ({
                    type: 'SET_OPPONENT',
                    payload: r.data.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name
                })
            } else {
                try {
                    const resp = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}?expand=team.schedule.next`)
                    dispatch ({
                        type: 'SET_OPPONENT',
                        payload: resp.data.teams[0].nextGameSchedule.dates[0].games[0].teams.home.team.name
                    })
                } catch (err) {
                    console.log(err);
                    
                }
            }
        } catch (err) {
            console.log(err);
            
        }
    }
    return (<>
        <p>Team ID: {team.id} Team Name: {team.name} <button onClick={getStats}>Get Team Stats</button><CSVLink data={data} filename={`${team.name} Stats`} target="_blank">Download Stats CSV</CSVLink></p>
    </>
    )
}

export default TeamItem;