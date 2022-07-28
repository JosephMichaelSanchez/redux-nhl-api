import React from 'react';

function TeamItem({ team }) {
    return (<>
        <p>Team ID: {team.id} Team Name: {team.name} </p>
    </>
    )
}

export default TeamItem;