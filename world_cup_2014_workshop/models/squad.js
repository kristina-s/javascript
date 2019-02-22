class Squad {
    constructor (name, players, coach) {
        this.name = name;
        this.players = players;
        this.coach = coach;
        this.matches = [];
    }

    addMatch(match) {
        this.matches.push(match);
    }

    getMatch(opponentName) {
        const opponentMatch = this.matches
            .find(match => (match.secondSquad === opponentName) || (match.firstSquad === opponentName));
        return opponentMatch;
    }
}