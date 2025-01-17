// We know that there will be 3 pokemon per row in the table, so we need to have an appropriate number of rows
// In the future, 898 will be replaced with the number of lines in the txt file (which we will do in an upcoming commit) and this is
// so that in future generations when more pokemon are added, we can account for the new ones instead of having to manually change the number
let rows = (898 - 898 % 3) / 3;

// Keeping track of what pokedex number we are on
let counter = 1;

// Will need to change the file path here
const filePath = "masterpokedex.txt";
let fileContents;

// Variable that keeps track of whether or not the pokedex is in its open or closed position
let open = false;

// Composition of the dictionary will be as follows:
// "name": [pokedex number, [typing], mass, height, [evolutionary info], img src, description, abilities, [stats], total stats, region]
let pokemonDict = {};

// A list that contains the name of all Pokemon, this is so that setting the id of each button is easier
let pokemonNames = [];

// A dictionary that will contain the types and their respective RGBA colours
let pokemonColours = {
    "Normal": "rgba(170,170,153,255)",
    "Fire": "rgba(255,68,34,255)",
    "Water": "rgba(51,153,255,255)",
    "Electric": "rgba(255,204,51,255)",
    "Grass": "rgba(119,204,85,255)",
    "Ice": "rgba(102,204,255,255)",
    "Fighting": "rgba(187,85,68,255)",
    "Poison": "rgba(170,85,153,255)",
    "Ground": "rgba(221,187,85,255)",
    "Flying": "rgba(136,153,255,255)",
    "Psychic": "rgba(255,85,153,255)",
    "Bug": "rgba(170,187,34,255)",
    "Rock": "rgba(187,170,102,255)",
    "Ghost": "rgba(102,102,187,255)",
    "Dragon": "rgba(119,102,238,255)",
    "Dark": "rgba(119,85,68,255)",
    "Steel": "rgba(170,170,187,255)",
    "Fairy": "rgba(238,153,238,255)"
};

// Creating the :hover functionality using javascript becuase I could not figure out how to use the "+" operator in CSS
// Fades the caption in and out when the pokeball is hovered over
let welcomeNav = document.getElementById("welcome-navigation");
let introNav = document.getElementById("intro-nav");
let btsNav = document.getElementById("how-it-works-nav");
let footerNav = document.getElementById("footer-nav");

welcomeNav.addEventListener("mouseover", function(event){
    document.getElementById("welcome-navigation-caption").style.display = "table-cell";
});

introNav.addEventListener("mouseover", function(event){
    document.getElementById("intro-navigation-caption").style.display = "table-cell";
});

btsNav.addEventListener("mouseover", function(event){
    document.getElementById("how-it-works-navigation-caption").style.display = "table-cell";
})

footerNav.addEventListener("mouseover", function(event){
    document.getElementById("footer-navigation-caption").style.display = "table-cell";
})

welcomeNav.addEventListener("mouseleave", function(event){
    document.getElementById("welcome-navigation-caption").style.display = "none";
});

introNav.addEventListener("mouseleave", function(event){
    document.getElementById("intro-navigation-caption").style.display = "none";
})

btsNav.addEventListener("mouseleave", function(event){
    document.getElementById("how-it-works-navigation-caption").style.display = "none";
})

footerNav.addEventListener("mouseleave", function(event){
    document.getElementById("footer-navigation-caption").style.display = "none";
})

// Creating an animation to make it appear as though the pokedex opens and closes at the click of the central button
function openPokedex(){
    let topCurtain = document.getElementById("up");
    let bottomCurtain = document.getElementById("down");

    if (open == false){
        bottomCurtain.style.transform = "translateY(101%)";
        topCurtain.style.transform = "translateY(-101%)";
        open = true;
    } else {
        topCurtain.style.transform = "translateY(0%)";
        bottomCurtain.style.transform = "translateY(0%)";
        open = false;
    }
}

// This function gathers the data from the txt file when the webpage loads to ensure that the information is readily available
function loadFile(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();

    if (xmlhttp.status == 200){
        fileContents = xmlhttp.responseText;

        // We know that each entry is separated by the "δ" character
        let pokedexEntries = fileContents.split("δ");

        // Will have to process the elements here
        pokedexEntries.forEach(element => {
            let individualEntries = element.split("\n");

            if (individualEntries[1] == "Bulbasaur"){
                let pokedexNumber = individualEntries[0];
                let typing = individualEntries[2];
                let weight = individualEntries[3];
                let height = individualEntries[4];
                let evolutionaryInfo = individualEntries[5];
                let imageSrc = individualEntries[6];
                let description = individualEntries[7];
                let abilities = individualEntries[9];
                let baseStats = individualEntries[10];
                let totalStats = individualEntries[8];
                let region = individualEntries[11];

                pokemonDict[individualEntries[1]] = [pokedexNumber, typing, weight, height, evolutionaryInfo, imageSrc, description, abilities, baseStats, totalStats, region];
                let pokemonName = individualEntries[1];
                pokemonNames.push(pokemonName);
            } else {
                let pokedexNumber = individualEntries[1];
                let typing = individualEntries[3];
                let weight = individualEntries[4];
                let height = individualEntries[5];
                let evolutionaryInfo = individualEntries[6];
                let imageSrc = individualEntries[7];
                let description = individualEntries[8];
                let abilities = individualEntries[10];
                let baseStats = individualEntries[11];
                let totalStats = individualEntries[9];
                let region = individualEntries[12];

                pokemonDict[individualEntries[2]] = [pokedexNumber, typing, weight, height, evolutionaryInfo, imageSrc, description, abilities, baseStats, totalStats, region];
                let pokemonName = individualEntries[2];
                pokemonNames.push(pokemonName);
            }
        });

    }
}

// Looping through the table, and adding the table rows and table data elements accordingly
function loadTable(){
    // Retrieving the data from the file
    loadFile();
    for (let i = 0; i < rows+1; i++){
        var row = document.createElement("tr");
        for (let j = 0; j < 3; j++){
            // Creating the td element that will contain all the data
            var cell = document.createElement("td");

            // Adding left padding only if the cell is the first one in the row
            if (j == 0){
                cell.style.paddingLeft = "10px";
            }
            // Creating a button that will be added to the td element
            var button = document.createElement("button");

            // Creating the sprite and the pokedex number for the pokemon
            var spritePokemon = document.createElement("img");
            var pokedexNumber = document.createElement("p");
            // Assigning the id for the pokedex number
            pokedexNumber.id = "banner";
            // Assigning the inner text for the pokedex number
            pokedexNumber.innerHTML = pokemonDict[pokemonNames[counter - 1]][0];

            // Getting the sprite for each pokemon, for some reason Calyrex does not want to work, so we have to create a separate condition for it
            if (counter < 898){
                spritePokemon.src = "https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/" + pokemonNames[counter - 1].toLowerCase() + ".png";
            } else {
                spritePokemon.src = "https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/calyrex.png";
            }

            // Setting the id for the sprite
            spritePokemon.id = "buttonSprite";

            // Adding the pokedex number and sprite to the button
            button.appendChild(pokedexNumber);
            button.appendChild(spritePokemon);
            button.id = pokemonNames[counter - 1];

            // Setting the on click functionality of the button. If a user clicks a specific button, it is the same as them selecting a
            // specific pokemon to learn more about. Only makes sense for us to display the information the user might be looking for.
            button.onclick = function(){
                document.getElementById("pokedexEntries").style.display = "none";
                document.getElementById("searchbar").style.display = "none";

                // Creating a back button to allow the user to get back to the general pokedex screen
                var backButton = document.getElementById("back");

                // Adding the functionality for the back button, allows the user to go between the specific Pokemon's pokedex entry and the
                // general pokedex
                backButton.onclick = function(){
                    document.getElementById("back").style.display = "none";
                    document.getElementById("specific_pokemon").style.display = "none";
                    document.getElementById("pokedexEntries").style.display = "table";
                    document.getElementById("searchbar").style.display = "block";
                    document.getElementById("type1").remove();
                    document.getElementById("ability1").remove();

                    // Getting rid of the second type if and only if the pokemon is dual-type
                    if (typeof typing !== 'string'){
                        document.getElementById("type2").remove();
                    }

                    if (typeof abilities !== 'string'){
                        document.getElementById("ability2").remove();
                    }
                }

                // Adding all the elements to the webpage for the users to see
                document.getElementById("specific_pokemon").style.display = "block";
                document.getElementById("back").style.display = "block";

                // Adding the necessary information to the screen
                document.getElementById("pokedex-number").innerHTML = "No. " + pokemonDict[this.id][0];
                document.getElementById("name").innerHTML = this.id;

                // Setting the sprite for the pokemon
                //let imageSrc = pokemonDict[this.id][5].slice(1, pokemonDict[this.id][5].length - 1);
                document.getElementById("spriteImage").src = "Images/" + this.id + ".png";
                // Setting the description for the pokemon
                document.getElementById("description").innerHTML = pokemonDict[this.id][6];
                // Setting the typing for the pokemon
                let typing = getTyping(pokemonDict[this.id][1]);

                // Means there is only one type
                if (typeof typing === 'string'){
                    let typingElement = document.createElement("p");
                    typingElement.innerHTML = typing;
                    typingElement.id = "type1";
                    typingElement.style.backgroundColor = pokemonColours[typing];
                    document.getElementById("typing").appendChild(typingElement);
                // Means there are two types
                } else {
                    let typingElement1 = document.createElement("p");
                    typingElement1.innerHTML = typing[0];
                    typingElement1.id = "type1";
                    typingElement1.style.backgroundColor = pokemonColours[typing[0]];
                    document.getElementById("typing").appendChild(typingElement1);

                    let typingElement2 = document.createElement("p");
                    typingElement2.innerHTML = typing[1];
                    typingElement2.id = "type2";
                    typingElement2.style.backgroundColor = pokemonColours[typing[1]];
                    document.getElementById("typing").appendChild(typingElement2);
                }

                // Using the same function as above as they are formatted the same way in the txt file. Why rebuild the wheel?
                let abilities = getTyping(pokemonDict[this.id][7]);

                // Means there is only one ability
                if (typeof abilities === 'string'){
                    let abilitiesElement = document.createElement("p");
                    abilitiesElement.innerHTML = abilities;
                    abilitiesElement.id = "ability1";
                    document.getElementById("abilities").appendChild(abilitiesElement);
                // Means there are two or more abilities
                } else {
                    // Will need to edit this later, add IDs and everything to make the typing look a lot nicer
                    //document.getElementById("abilities").innerHTML = abilities[0] + "\n" + abilities[1];
                    let ability1 = document.createElement("p");
                    ability1.innerHTML = abilities[0];
                    ability1.id = "ability1"
                    document.getElementById("abilities").appendChild(ability1);

                    let ability2 = document.createElement("p");
                    ability2.innerHTML = abilities[1];
                    ability2.id = "ability2";
                    document.getElementById("abilities").appendChild(ability2);
                }

                // Getting the region it was introduced in
                let regionIntroduced = getRegion(pokemonDict[this.id][10]);
                document.getElementById("region-introduced").innerHTML = regionIntroduced;

                // Assigning the height and weight of the pokemon
                document.getElementById("height").innerHTML = pokemonDict[this.id][3];
                document.getElementById("weight").innerHTML = pokemonDict[this.id][2];

                // The current pokemon's base stat for each stat
                let stats = getStats(pokemonDict[this.id][8]);

                var hp = stats[0];
                var attack = stats[1];
                var defense = stats[2];
                var specialattack = stats[3];
                var specialdefense = stats[4];
                var speed = stats[5];

                // The max base stat for any pokemon
                const max = 255;

                var hpColour = assignColour(hp);
                var attackColour = assignColour(attack);
                var defenseColour = assignColour(defense);
                var specialAttackColour = assignColour(specialattack);
                var specialDefenseColour = assignColour(specialdefense);
                var speedColour = assignColour(speed);

                // Calculating the percentage of the bar that must be filled in
                var healthpercentage = (hp / max) * 100 + "%";
                var attackpercentage = (attack / max) * 100 + "%";
                var defensepercentage = (defense / max) * 100 + "%";
                var specialattackpercentage = (specialattack / max) * 100 + "%";
                var specialdefensepercentage = (specialdefense / max) * 100 + "%";
                var speedpercentage = (speed / max) * 100 + "%";

                // Setting the size of the div and colour of the bar accordingly, and adding the value for the base stat
                document.getElementById("value-hp").innerHTML = hp;
                document.getElementById("health-bar-diagram").style.width = healthpercentage;
                document.getElementById("health-bar-diagram").style.backgroundColor = hpColour;

                document.getElementById("value-attack").innerHTML = attack;
                document.getElementById("attack-bar-diagram").style.width = attackpercentage;
                document.getElementById("attack-bar-diagram").style.backgroundColor = attackColour;

                document.getElementById("value-defense").innerHTML = defense;
                document.getElementById("defense-bar-diagram").style.width = defensepercentage;
                document.getElementById("defense-bar-diagram").style.backgroundColor = defenseColour;

                document.getElementById("value-special-attack").innerHTML = specialattack;
                document.getElementById("special-attack-bar-diagram").style.width = specialattackpercentage;
                document.getElementById("special-attack-bar-diagram").style.backgroundColor = specialAttackColour;

                document.getElementById("value-special-defense").innerHTML = specialdefense;
                document.getElementById("special-defense-bar-diagram").style.width = specialdefensepercentage;
                document.getElementById("special-defense-bar-diagram").style.backgroundColor = specialDefenseColour;

                document.getElementById("value-speed").innerHTML = speed;
                document.getElementById("speed-bar-diagram").style.width = speedpercentage;
                document.getElementById("speed-bar-diagram").style.backgroundColor = speedColour;

                document.getElementById("value-total").innerHTML = pokemonDict[this.id][9];
            };
            // Ensuring that buttons that are more than necessary are not displayed on screen.
            if (counter < 899){
                cell.appendChild(button);
                row.appendChild(cell);
            }
            counter += 1;
        }

        // Adding the row with all the elements to the table
        var table = document.getElementById("pokedexEntries")
        table.appendChild(row);
    }

}

// This function is here so that users can search up specific pokemon. For the time being, you can only search up by pokedex number,
    // but we hope to allow users to search up via the name of the Pokemon.
    function search(){
        let input = document.getElementById("searchbar").value.toLowerCase();
        let pokedex = document.getElementById("pokedexEntries");

        for (let i = 0; i < pokedex.rows.length; i++){
            let data = pokedex.rows.item(i).cells;

            for (let j = 0; j < data.length; j++){
                if (data[j].innerHTML.toLowerCase().includes(input) == false){
                    // If the current cell does not contain the pokedex number the user is searching, its display is set to none, making it invisible
                    data[j].style.display = "none";
                } else {
                    // If the current cell does contain the pokedex number, its visibility is set to table-cell, mimicking a <td> element
                    data[j].style.display = "table-cell";
                }
            }
        }
    }

function assignColour(percentage){
    // Returning the colour based on what percentage the stat is relative to the max base stat. Will need to change some of the weightings
    // as the colours don't match up. Using the Pokemondb colours for reference.

    // stat < 30 -> bad
    // stat >= 30 and stat < 60 -> mediocre 
    if (percentage < 30){
        return "rgba(243, 68, 68, 255)";
    } else if (percentage >= 30 && percentage < 60){
        return "rgba(255, 127, 15, 255)";
    } else if (percentage >= 60 && percentage < 90){
        return "rgba(255, 221, 87, 255)";
    } else if (percentage >= 90 && percentage < 120){
        return "rgba(160, 229, 21, 255)";
    } else if (percentage >= 120 && percentage < 150){
        return "rgba(35, 205, 94, 255)";
    } else {
        return "rgba(0, 194, 184, 255)";
    }
}


function getStats(listOfStats){
    // This function will take a list made up of the stats along with some additional text and will filter out the unnecessary pieces
    // of information so that we're left with the numbers
    let splitList = listOfStats.split(" ");

    // Would use a traditional for loop, but "Special Attack" and "Special Defense" messes everything up and doesn't allow for clean splitting 
    // on the space character
    let hp = parseInt(splitList[1]);
    let attack = parseInt(splitList[3]);
    let defense = parseInt(splitList[5]);
    let specialAttack = parseInt(splitList[8]);
    let specialDefense = parseInt(splitList[11]);
    let speed = parseInt(splitList[13]);

    // Returning a list with all the processed stats
    return [hp, attack, defense, specialAttack, specialDefense, speed];
}

// Getting the typing of the pokemon (same method is used to get the abiltiies of the pokemon as they are formatted the same in the txt file)
function getTyping(typeString){
    // This means the Pokemon has two types
    if (typeString.includes(",")){
        let listOfTypes = typeString.split(",");
        let firstType = listOfTypes[0].slice(2, listOfTypes[0].length - 1);
        let secondType = listOfTypes[1].slice(2, listOfTypes[1].length - 2);
        return [firstType, secondType];
    } else {
        return typeString.slice(2, typeString.length - 2);
    }
}

// Getting the region the pokemon was introduced in
function getRegion(regionString){
    let splitRegionString = regionString.split(", ");
    return splitRegionString[1].slice(1, splitRegionString[1].length - 2);
}

