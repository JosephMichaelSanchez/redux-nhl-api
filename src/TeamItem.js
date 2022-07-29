import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";



function TeamItem({ team }) {

    const dispatch = useDispatch();

    // variables for each piece of CSV data
    const gamesPlayed = useSelector(store => store.statsReducer.gamesPlayed)
    const teamWins = useSelector(store => store.statsReducer.wins);
    const teamLosses = useSelector(store => store.statsReducer.losses);
    const teamPoints = useSelector(store => store.statsReducer.pts)
    const teamGoalsPerGame = useSelector(store => store.statsReducer.goalsPerGame)
    const gameDate = useSelector(store => store.dateReducer);
    const firstOpponent = useSelector(store => store.opponentReducer);

    // variable for conditional rendering of CSV download link
    const [showLink, setShowLink] = useState(false);

    // create data for CSV file, first array will be headers, 2nd array will be data
    const data = [
        ['Team ID', 'Team Name', 'Team Venue Name', 'Games Played', 'Wins', 'Losses', 'Points', 'Goals Per Game', 'Date of 1st Game', '1st Game Opponent'],
        [team.id, team.name, team.venue.name, gamesPlayed, teamWins, teamLosses, teamPoints, teamGoalsPerGame, gameDate, firstOpponent]
    ];

    // function to hide download link after being clicked
    const hideLink = () => {
        setShowLink(!showLink);
    }

    // function to get all of the necessary data for the CSV file
    const getStats = async () => {

        try {
            // GET team stats and dispatch them to the stats reducer
            const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}?expand=team.stats`);
            
            dispatch ({
                type: 'SET_STATS',
                payload: res.data.teams[0].teamStats[0].splits[0].stat
            })

        } catch (err) {
            console.log(err);

        }
        try {
            // GET date of 1st game and dispatch it to the dateReducer
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
            // GET away team of 1st game
            const r = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}?expand=team.schedule.next`)
            console.log(r.data.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name)

            // if away team does not match team's name, it is the first opponent and is dispatched to the opponentReducer
            if (r.data.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name != team.name) {

                dispatch ({
                    type: 'SET_OPPONENT',
                    payload: r.data.teams[0].nextGameSchedule.dates[0].games[0].teams.away.team.name
                })
            } else {
                // if away team matched teams name, it is not the opponent. Do another GET to retrieve the home team and dispatch it to the opponentReducer
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

        setShowLink(!showLink)
    }
    return (<>
        {/* render team ID and team name */}
        <p>Team ID: {team.id} Team Name: {team.name}  
        {/* button to call getStats function */}
        <button onClick={getStats}>Get Team Stats</button>
        {/* conditional render to show link to download CSV if stats were retrieved */}
        { showLink ? <CSVLink onClick={hideLink} data={data} filename={`${team.name} Stats`} target="_blank">Download Stats CSV</CSVLink> : ''}</p>
    </>
    )
}

export default TeamItem;