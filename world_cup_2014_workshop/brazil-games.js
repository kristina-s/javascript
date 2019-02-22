const brazil = new Squad("Brazil", [], new Person("Luis Felipe", "Scolari"));
const croatia = new Squad("Croatia", [], new Person("Niko", "Kovač"));
const mexico = new Squad("Mexico", [], new Person("Miguel", "Herrera"));
const cameroon = new Squad("Cameroon", [], new Person("Volker", "Finke"));

const group_a = [brazil, croatia, mexico, cameroon];

const playMatch = (id, firstSquad, secondSquad, arena, date, score) => {
    const match = new Match(id, firstSquad.name, secondSquad.name, arena, date);
    match.setScore(score);

    firstSquad.addMatch(match);
    secondSquad.addMatch(match);
}

playMatch(1, brazil, croatia, "Arena de São Paulo, São Paulo", "Thu Jun/12 17:00", new Score({ first: 3, second: 1 }))
playMatch(17, brazil, mexico, "Estádio Castelão, Fortaleza", "Tue Jun/17 16:00", new Score({ first: 0, second: 0 }))
playMatch(33, cameroon, brazil, "Estádio Nacional Mané Garrincha, Brasília", "Mon Jun/23 17:00", new Score({ first: 1, second: 4 }))

const displayMatches = (squad) => {
    const results = document.getElementById("results");
    for (const match of squad.matches) {
        const matchContainer = document.createElement("div");
        matchContainer.className = "match";
        const firstPart = document.createElement("div");
        const secondPart = document.createElement("div");
        results.appendChild(matchContainer);
        matchContainer.appendChild(firstPart);
        matchContainer.appendChild(secondPart);

        const score = match.score.regularScore;
        const resultType = getResultType(score);

        const firstSquad = group_a.find(squad => squad.name === match.firstSquad);
        const firstCoach = firstSquad ? firstSquad.coach.getFullName() : "N/A";

        const secondSquad = group_a.find(squad => squad.name === match.secondSquad);
        const secondCoach = secondSquad ? secondSquad.coach.getFullName() : "N/A";

        firstPart.textContent = `In the match #${match.id} of the world cup 
            ${match.firstSquad} led by ${firstCoach} 
            ${resultType} ${match.secondSquad} led by ${secondCoach}`;
        secondPart.textContent = `The result was ${score.first}:${score.second}`
    }
}

displayMatches(brazil);


function getResultType(score) {
    if (score.first > score.second) {
        return "beat"
    }
    if (score.first < score.second) {
        return "lost to"
    }
    return "draw with";
}

console.log(brazil.getMatch(croatia.name));