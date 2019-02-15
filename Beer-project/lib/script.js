
class Beer
{
	constructor(name, tagline, firstBrewed, description, image, abv, ibu, foodPairing)
	{
		this.name = name;
		this.tagline = tagline;
		this.firstBrewed = firstBrewed;
		this.description = description;
        this.image = image;
        this.abv = abv;
        this.ibu = ibu;
        this.foodPairing = foodPairing;
	}
	getImage(image)
	{
        const linkToImage = `${image}`;
        return linkToImage;
	}
}

let beersCollection = [];
let beerPage = 0;
let showPageBeers = [];


$("#beers-btn").click(async function(){
    $(".welcome-card").css("display", "none");
    $("#dropdown-lists").css("visibility", "visible");
    $(".pagination").css("visibility", "visible")
    if (beersCollection.length === 0){
        await getBeerData();
    }

    displayBeers(pageData(beersCollection)[0].beersToShow, beerPage);
    console.log(showPageBeers);

    //pagination
    $(".page-item").on("click", function(e) {
        e.preventDefault();
    
        if (e.target.text == "Next") {
            beerPage++;
            let counter = beerPage;
            if (beerPage > 25) {
                $("#showPage").text(`No next page!`);
                e.target.css("pointer-events", "none")
            }
            $("#showPage").text(`Showing page ${beerPage} of 26`)
            displayBeers(pageData(beersCollection)[counter].beersToShow, beerPage);
        } else {
            beerPage--;
            let counter = beerPage;
           if (beerPage <= 0) {
                beerPage = 0;
            }          
            $("#showPage").text(`Showing page ${beerPage} of 26`)
            displayBeers(pageData(beersCollection)[counter].beersToShow, beerPage);
        }
    });
    
    $("#sorting-menu").click(function(event){
        event.preventDefault();
        let typeOfSort = event.target.textContent;
        console.log(typeOfSort);
        switch (typeOfSort){
            case "Name A-Z":
                displayBeers(pageData(sortData(beersCollection, "Name A-Z"))[beerPage].beersToShow, beerPage )
                break;
            case "Name Z-A":
                displayBeers(pageData(sortData(beersCollection, "Name Z-A"))[beerPage].beersToShow, beerPage )
                break;
            case "Alcohol % (asc)":
                displayBeers(pageData(sortData(beersCollection, "Alcohol % (asc)"))[beerPage].beersToShow, beerPage )
                break;
            case "Alcohol % (desc)":
                displayBeers(pageData(sortData(beersCollection, "Alcohol % (desc)"))[beerPage].beersToShow, beerPage )
                break;
            case "Brewing (asc)":
                displayBeers(pageData(sortData(beersCollection, "Brewing (asc)"))[beerPage].beersToShow, beerPage )
                break;
            case "Brewing (desc)":
                displayBeers(pageData(sortData(beersCollection, "Brewing (desc)"))[beerPage].beersToShow, beerPage )
                break;
            case "Bitterness (asc)":
                displayBeers(pageData(sortData(beersCollection, "Bitterness (asc)"))[beerPage].beersToShow, beerPage )
                break;
            case "Bitterness (desc)":
                displayBeers(pageData(sortData(beersCollection, "Bitterness (desc)"))[beerPage].beersToShow, beerPage )
                break;
        }
    })
})


$("#random-beer").click(async function(){
    $(".welcome-card").css("display", "none");
    const url = `https://api.punkapi.com/v2/beers/random`;
    const response = await fetch(url);
    const result = await response.json();
    const objResult = result[0];
    let randomBeer = new Beer (objResult.name, objResult.tagline, objResult.first_brewed, objResult.description, objResult.image_url, objResult.abv, objResult.ibu, objResult.food_pairing);
    await displayOneBeerWithDetails(randomBeer, $("#beer-container"));
})

async function getBeerData(){
    let page = 1;
    do {
        console.log(`Loading page ${page}`);
        const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=25`;
        const response = await fetch(url);
        const result = await response.json();
        
        // map the results into objects 
        const pageBeers = result.map(beer => 
            new Beer (beer.name, beer.tagline, beer.first_brewed, beer.description, beer.image_url, beer.abv, beer.ibu, beer.food_pairing)  
        );
        
        beersCollection.push(...pageBeers);
        page += 1;
    } while(page < 11);
    
    return beersCollection;
}

console.log(beersCollection);

function pageData (data) {
    showPageBeers = [];
    for (let i = 0; i < data.length / 9; i++) {
        showPageBeers.push({
            page: i,
            beersToShow: data.slice(i * 9, (i + 1) * 9)
    })
    }
    return showPageBeers;

};

function displayBeers(array, page){
    $("#beer-container").html("");
        for (const beer of array) {
        $("#beer-container").append(`
            
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${beer.image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${beer.name}</h5>
                        <p class="card-text">${beer.tagline}.</p>
                        <a href="#" class="btn btn-primary details-btn">More Details</a>
                    </div>
                </div>
            <br/>
        `);
    };
    let detailsBtn = $('.details-btn');
    for (let a = 0; a < detailsBtn.length; a++) {
      detailsBtn[a].addEventListener('click', (e) => {
          let beerToShow = beersCollection[(page*9)+a];
          displayOneBeerWithDetails(beerToShow, $("#beer-container"));
      });
    }

}
async function displayOneBeerWithDetails(beer, element){
    element.html("");
    element.append(`
    <img src="${beer.image}" class="card-img-beer-to-show" alt="image of a beer" width="200" height="500">

        <div class="card-of-beer-to-show"  style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${beer.name}&nbsp; "${beer.tagline}"</h5>
                <p class="card-text">${beer.description}.</p>
                <p class="card-text">Alcohol %: ${beer.abv}</p>
                <p class="card-text">Bitterness: ${beer.ibu}</p>
                <p class="card-text">First brewed: ${beer.firstBrewed}</p>
            </div>
            <h2>Food Pairing</h2>
            <ul class="list-group list-group-flush addFoodPairing"> 
            </ul>
        </div>
    `);
    for (let index = 0; index < beer.foodPairing.length; index++) {
        $(".addFoodPairing").append(`
        <li class="list-group-item">${beer.foodPairing[index]}</li>
        `);
    };
};

function sortData (array, target) {
    switch (target) {
        case "Name A-Z":
            array.sort((f, s) => f.name.localeCompare(s.name));
            return array;
        case "Name Z-A":
            array.sort((f, s) => s.name.localeCompare(f.name))
            return array;
        case "Alcohol % (asc)":
            array.sort((f, s) => f.abv - s.abv);
            return array;
        case "Alcohol % (desc)":
            array.sort((f, s) => s.abv - f.abv);
            return array;
        case "Brewing (asc)":
            array.sort((f, s) => f.firstBrewed.localeCompare(s.firstBrewed));
            return array;
        case "Brewing (desc)":
            array.sort((f, s) => s.firstBrewed.localeCompare(f.firstBrewed));
            return array;
        case "Bitterness (asc)":
            array.sort((f, s) => f.ibu - s.ibu);
            return array;
        case "Bitterness (desc)":
            array.sort((f, s) => s.ibu - f.ibu);
            return array;
        default:
            break;
    }
}

