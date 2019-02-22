const dataMapper = {
    fromServerPlayerToFootballer: (serverPlayer) => {
        const {firstName, lastName} = dataMapper.splitName(serverPlayer.name);
        return new Footballer(firstName, lastName, {
            squadNumber: serverPlayer.squadNumber,
            position: serverPlayer.position,
            caps: serverPlayer.caps,
            team: `${serverPlayer.club} (${serverPlayer.clubCountry})`,
            image: serverPlayer.imageUrl
        });
    },
    splitName: (serverName) => {
        const nameParts = serverName.split(" ");
        let firstName, lastName;
        if (nameParts.length === 1) {
            firstName = nameParts[0];
            lastName = "";
        } else {
            firstName = nameParts.slice(0, nameParts.length - 1).join(" ");
            lastName = nameParts[nameParts.length-1];
        }
        return {
            firstName,
            lastName
        }
    },
    getCoachFromServerData: (serverData) => {
        const {firstName, lastName} = dataMapper.splitName(serverData.coach);
        return new Person(firstName, lastName);
    }
}