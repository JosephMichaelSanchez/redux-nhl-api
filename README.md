# Redux NHL API

## Installation

1. Clone the repository to your workstation and open it in the code editor of your choice.
2. Open a terminal and type `npm install`. 
3. Once installation is complete, type `npm start` and the application will launch in a browser.


## Instructions

1. Once the application launches, press the 'Click to Show NHL Team List' button to retrieve each current NHL team's name and their Team ID. The results will display on the DOM. 

[![Screen-Shot-2022-07-29-at-2-13-41-PM.png](https://i.postimg.cc/cLqy9GQM/Screen-Shot-2022-07-29-at-2-13-41-PM.png)](https://postimg.cc/HVthnKvV)

[![Screen-Shot-2022-07-29-at-2-15-24-PM.png](https://i.postimg.cc/7PGqmVF4/Screen-Shot-2022-07-29-at-2-15-24-PM.png)](https://postimg.cc/K4bXYncp)

2. Each team has a 'Get Team Stats' button next to their name. Clicking the button will retrieve the following information for that team from the NHL API:
<ul>
    <li>Team ID</li>
    <li>Team Name</li>
    <li>Team Venue Name</li>
    <li>Games Played</li>
    <li>Wins</li>
    <li>Losses</li>
    <li>Points</li>
    <li>Goals Per Game</li>
    <li>Date of 1st Game of the Season</li>
    <li>Opponent for the first game of the season</li>
</ul>

After the button is clicked, a 'Download Stats CSV' link will appear next to it.

[![Screen-Shot-2022-07-29-at-2-16-40-PM.png](https://i.postimg.cc/KzTsgRH6/Screen-Shot-2022-07-29-at-2-16-40-PM.png)](https://postimg.cc/Q9Xq2xsm)

3. Clicking the 'Download Stats CSV' link will download a CSV file of the team's stats to your workstation.

[![Screen-Shot-2022-07-29-at-2-18-25-PM.png](https://i.postimg.cc/C5PDh44S/Screen-Shot-2022-07-29-at-2-18-25-PM.png)](https://postimg.cc/m19hVCq5)


## Built With
* React
* React Redux
* react-csv
* Axios
* redux-logger