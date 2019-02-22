class Match {
    constructor(id, firstSquad, secondSquad, stadium, date) {
        this.id = id;
        this.firstSquad = firstSquad;
        this.secondSquad = secondSquad;
        this.stadium = stadium;
        this.date = date;
    }

    setScore(score) {
        this.score = score;
    }
}

class Score {
    constructor (finalScore, hasPenalties = false, regularScore = undefined) {
        this.finalScore = finalScore;
        this.hasPenalties = hasPenalties;
        this.regularScore = hasPenalties ? regularScore : finalScore;
    }
}