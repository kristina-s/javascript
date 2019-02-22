$(async () => {

    await loadTeamNames();

    $("#team-selector").on("click", async (event) => {
        event.preventDefault();
        const teamName = event.target.textContent;
        console.log(teamName)
        const squad = await loadSquad(teamName);
        displaySquad(squad);
    })
})

const loadTeamNames = async () => {
    const teamNames = await dataService.getAllTeamNames();
    const select = $("#team-selector");
    for (const name of teamNames) {
        select.append(`<a class="dropdown-item" href="#" value="${name}">${name}</a>`);
    }
}
const loadSquad = async (teamName) => {
    const squad = await dataService.getSquad(teamName);
    return squad;
}
const displaySquad = (squad) => {
    
    $(".welcome-card").css("display", "none");
    $(".pagination").css("visibility", "visible");
    $("#countries-container").html("");
    $("#players").html("");
    $("#countries-container").append(`
        <div class="card" style="width: 12rem;">
        <img src="${squad.teamImage}" class="card-img-top squad-image" alt="squad image">
        <div class="card-body">
            <p class="card-text"><b style="font-size: 40px" >${squad.name}</b></p>
            <p class="card-text">${squad.coach.getFullName()}</p>

        </div>
  </div>
    `);
    
    let playerPart01 = squad.players.slice(0, 12);
    console.log(playerPart01);
    let playerPart02 = squad.players.slice(12, 23);
    console.log(playerPart02);
    for (const player of playerPart01) {
        $("#players").append(`
        <div class="card" style="width: 14rem;">
        <a href="player.html?team=${squad.name}&squadNum=${player.squadNumber}">
        <img src="${player.image ? player.image : "./img/noimage.jpg"}" class="card-img-top" alt="player picture">
        </a>
        
        <div class="card-body">
            <p class="card-text"><b>${player.getFullName()}</b></p>
        </div>
  </div>`)
  
    }
    
    $(".page-item").on("click", function(e) {
        e.preventDefault();
        $("#players").html("");
        if (e.target.text == "Next") {
            for (const player of playerPart02) {
                $("#players").append(`
                <div class="card" style="width: 14rem;">
                <a href="player.html?team=${squad.name}&squadNum=${player.squadNumber}">
                <img src="${player.image ? player.image : "./img/noimage.jpg"}" class="card-img-top" alt="player picture">
                </a>
                <div class="card-body">
                    <p class="card-text"><b>${player.getFullName()}</b></p>
                    
                </div>
        </div>`)
            }
        }else{
            for (const player of playerPart01) {
                $("#players").append(`
                <div class="card" style="width: 14rem;">
                <a href="player.html?team=${squad.name}&squadNum=${player.squadNumber}">
                <img src="${player.image ? player.image : "./img/noimage.jpg"}" class="card-img-top" alt="player picture">
                </a>
                <div class="card-body">
                    <p class="card-text"><b>${player.getFullName()}</b></p>
                    
                </div>
          </div>`)
            }
        }

    })
   
}
const myOb01 = {
    name: "Roman Weidenfeller",
    imageUrl: undefined,
    position: "GK",
    squadNumber: 22,
    club: "Borussia Dortmund",
    clubCountry: "GER",
    caps: 2
};
//const teamUrl = `https://us-central1-sedc-world-cup.cloudfunctions.net/webApi/team`;
