const teamUrl = `https://us-central1-sedc-world-cup.cloudfunctions.net/webApi/team`;

const dataService = {
    getSquad: async (squadName) => {
        const response = await fetch (`${teamUrl}/${squadName}`);
        const squadData = await response.json();
        const coach = dataMapper.getCoachFromServerData(squadData);
        const players = squadData.players.map(sp => dataMapper.fromServerPlayerToFootballer(sp));
        const result = new Squad(squadName, players, coach);
        console.log(result)
        result.teamImage = squadData.teamImageUrl;

        return result;
    },
    getMatches: (squadName) => {

    },
    getAllTeamNames: async () => {
        const url = "https://us-central1-sedc-world-cup.cloudfunctions.net/webApi/team-list?fbclid=IwAR3v7YZC_UqBMs5qwbHyVUD67hPcHst7Ugvb-JVnYnXmsMGF6ZVWyDCLmFo";
        const response = await fetch (url);
        const squadNames = await response.json();
        //console.log(squadNames);
        return squadNames; 
    },
    getPlayer: async (squadName, squadNumber) => {
        const response = await fetch(`${teamUrl}/${squadName}/${squadNumber}`);
        const serverPlayer = await response.json();
        const player = dataMapper.fromServerPlayerToFootballer(serverPlayer);
        return player;
    },
    setPlayer: async (squadName, squadNumber, player) => {
        $.post(`${teamUrl}/${squadName}/${squadNumber}`, {
            json_string: JSON.stringify({
                caps: this.caps,
                club: this.club,
                clubCountry: this.clubCountry,
                imageUrl: this.imageUrl,
                name: this.name,
                squadNumber: player.squadNumber,
                position: player.position
            })
        });
        // use a POST request on the same url for get
        // put a server player object in the body
        // and call away
    }
}

