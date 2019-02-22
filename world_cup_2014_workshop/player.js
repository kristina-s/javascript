$(async () => {
    const urlParams = new URLSearchParams(location.search);
    const team = urlParams.get("team");
    const squadNumber = urlParams.get("squadNum");

    const player = await loadPlayer(team, squadNumber);
    displayPlayer(player);
})

const loadPlayer = async (team, squadNumber) => {
    const player = dataService.getPlayer(team, squadNumber);
    return player;
}


const displayPlayer = (player) => {
    $("#player-name").text(player.getFullName());
    $("#player-details").append(`
    <li> <img src="${player.image ? player.image : "./img/noimage.jpg"}" /> </li>
    <form>
    <li> Squad Number : <input type="text" name="squadNumber" value="${player.squadNumber}" </input> </li>
    <li> Position :
     <select id="position">
        <option value="GK">GK</option>
        <option value="DF">DF</option>
        <option value="MD">MD</option>
        <option value="FW">FW</option>
    </select></li>
    <li> Caps : ${player.caps} </li>
    <li> Club : ${player.team} </li>
    <button class="save">Save changes</button>
    </form>
    `);

    $(".save").click(function (event) {
        event.preventDefault();
        const newPlayer = {};
        newPlayer.squadNumber = $(":input")
            .serializeArray()[0].value;
            // .map( item => 
            //     item.value
            // );
        newPlayer.position = $("select").val();
        console.log(newPlayer);

        // const urlParams = new URLSearchParams(location.search);
        // const team = urlParams.get("team");
        // const squadNumber = urlParams.get("squadNum");

        // dataService.setPlayer(team, squadNumber, newPlayer);


    })
}

