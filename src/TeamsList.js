import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import TeamItem from './TeamItem';

function TeamsList() {

    const dispatch = useDispatch();
    const [teamList, setTeamList] = useState([]);

    const nhlTeams = useSelector(store => store.teamsReducer);

    const getTeams = () => {
        axios.get('https://statsapi.web.nhl.com/api/v1/teams').then(res => {
            // the data portion of the response will be the new value of the tealList array
            setTeamList(res.data.teams);
        });

    }

    // function to send the teamList to the reducer
    const setTeams = () => {
        dispatch({
            type: 'SET_TEAMS',
            payload: teamList
        })
    }

    useEffect(() => {
        getTeams();
    }, [])

    return (
        <>
            
            <button onClick={setTeams}>Click to Show NHL Team List</button>
            {/* loop through the teamList array if it has at least one object inside it */}
            {nhlTeams.map(team => {
                return (
                    // each team will map as a TeamItem component with the team.is as it's key
                    <TeamItem
                    key={team.id}
                    team={team}
                    />
                )
            })}
        </>
    )
}

export default TeamsList;