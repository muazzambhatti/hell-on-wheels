(async function () {
    const response = await fetch("garages.json");
    const allPlayers = await response.json();
    document.getElementById("searchbtn").addEventListener("click", search);
    document.getElementById("searchbox").addEventListener("keypress", function (event) {
        if (event.key === "Enter" && document.getElementById("searchbox").value !== "") {
            search();
        }
    });
    document.getElementById("filtersSwitch").addEventListener("click", function () {
        filterShowToggle("SectionHide", "filtersHideShow");
    });
    document.getElementById("playerSelect").addEventListener("change", filter);
    document.getElementById("brandSelect").addEventListener("change", filter);
    document.getElementById("starsSelect").addEventListener("change", filter);
    document.getElementById("classSelect").addEventListener("change", filter);
    document.getElementById("maxSelect").addEventListener("change", filter); // checkbox
    document.getElementById("unlockSelect").addEventListener("change", filter); // checkbox
    function search() {
        let player = document.getElementById("playerSelect").value;
        let searchString = document.getElementById("searchbox").value.toLowerCase();
        if (player == "") {
            return alert("no player selected");
        } else {
            if (player == "all") {
                requiredGarages = allPlayers;
            } else {
                requiredGarages = getplayer(player);
            }
            filteredArray = [];
            for (let index = 0; index < requiredGarages.length; index++) {
                carsD = requiredGarages[index].cars_d.filter(function (car) {
                    return car.car_name.toLowerCase().includes(searchString);
                })
                carsC = requiredGarages[index].cars_c.filter(function (car) {
                    return car.car_name.toLowerCase().includes(searchString);
                })
                carsB = requiredGarages[index].cars_b.filter(function (car) {
                    return car.car_name.toLowerCase().includes(searchString);
                })
                carsA = requiredGarages[index].cars_a.filter(function (car) {
                    return car.car_name.toLowerCase().includes(searchString);
                })
                carsS = requiredGarages[index].cars_s.filter(function (car) {
                    return car.car_name.toLowerCase().includes(searchString);
                })
                if (carsD.length === 0 && carsC.length === 0 && carsB.length === 0 && carsA.length === 0 && carsS.length === 0) {
                    return createCards(filteredArray);
                } else {
                    newArrayItem = createNewObject(requiredGarages[index].player_name, carsD, carsC, carsB, carsA, carsS)
                    filteredArray.push(newArrayItem);
                }
            }
            console.log(filteredArray.length);
            createCards(filteredArray);
        }
    }
    function getplayer(playerName) {
        let matchingPlayers = [];
        for (let index = 0; index < allPlayers.length; index++) {
            if (allPlayers[index].player_name == playerName) {
                matchingPlayers.push(allPlayers[index]);
            }
        }
        return matchingPlayers;
    }
    function filter() {
        let player = document.getElementById("playerSelect").value;
        let brand = document.getElementById("brandSelect").value;
        let stars = "" + document.getElementById("starsSelect").value;
        let carClass = document.getElementById("classSelect").value;
        let isMax = document.getElementById("maxSelect").checked;
        let isUnlocked = document.getElementById("unlockSelect").checked;
        if (player == "") {
            document.getElementById("realResults").innerHTML = "";
            document.getElementById("userGuide").style.display = "block";
            return;
        }
        if (player == "all") {
            document.getElementById("userGuide").style.display = "none";
            requiredGarages = allPlayers;
        } else if (player != "all") {
            document.getElementById("userGuide").style.display = "none";
            requiredGarages = getplayer(player);
        }
        if (brand != "all") {
            filteredArray = [];
            for (let index = 0; index < requiredGarages.length; index++) {
                carsD = requiredGarages[index].cars_d.filter(function (car) {
                    return car.brand_name.toLowerCase().includes(brand);
                })
                carsC = requiredGarages[index].cars_c.filter(function (car) {
                    return car.brand_name.toLowerCase().includes(brand);
                })
                carsB = requiredGarages[index].cars_b.filter(function (car) {
                    return car.brand_name.toLowerCase().includes(brand);
                })
                carsA = requiredGarages[index].cars_a.filter(function (car) {
                    return car.brand_name.toLowerCase().includes(brand);
                })
                carsS = requiredGarages[index].cars_s.filter(function (car) {
                    return car.brand_name.toLowerCase().includes(brand);
                })
                newArrayItem = createNewObject(requiredGarages[index].player_name, carsD, carsC, carsB, carsA, carsS)
                filteredArray.push(newArrayItem);
            }
            requiredGarages = filteredArray;
        }
        if (stars != "all") {
            filteredArray = [];
            for (let index = 0; index < requiredGarages.length; index++) {
                carsD = requiredGarages[index].cars_d.filter(function (car) {
                    return car.stars == stars;
                })
                carsC = requiredGarages[index].cars_c.filter(function (car) {
                    return car.stars == stars;
                })
                carsB = requiredGarages[index].cars_b.filter(function (car) {
                    return car.stars == stars;
                })
                carsA = requiredGarages[index].cars_a.filter(function (car) {
                    return car.stars == stars;
                })
                carsS = requiredGarages[index].cars_s.filter(function (car) {
                    return car.stars == stars;
                })
                newArrayItem = createNewObject(requiredGarages[index].player_name, carsD, carsC, carsB, carsA, carsS)
                filteredArray.push(newArrayItem);
            }
            requiredGarages = filteredArray;
        }
        if (carClass != "all") {
            filteredArray = [];
            for (let index = 0; index < requiredGarages.length; index++) {
                carsD = requiredGarages[index].cars_d.filter(function (car) {
                    return car.car_class.toLowerCase().includes(carClass);
                })
                carsC = requiredGarages[index].cars_c.filter(function (car) {
                    return car.car_class.toLowerCase().includes(carClass);
                })
                carsB = requiredGarages[index].cars_b.filter(function (car) {
                    return car.car_class.toLowerCase().includes(carClass);
                })
                carsA = requiredGarages[index].cars_a.filter(function (car) {
                    return car.car_class.toLowerCase().includes(carClass);
                })
                carsS = requiredGarages[index].cars_s.filter(function (car) {
                    return car.car_class.toLowerCase().includes(carClass);
                })
                newArrayItem = createNewObject(requiredGarages[index].player_name, carsD, carsC, carsB, carsA, carsS)
                filteredArray.push(newArrayItem);
            }
            requiredGarages = filteredArray;
        }
        if (isMax == true) {
            filteredArray = [];
            for (let index = 0; index < requiredGarages.length; index++) {
                carsD = requiredGarages[index].cars_d.filter(function (car) {
                    return car.is_max == isMax;
                })
                carsC = requiredGarages[index].cars_c.filter(function (car) {
                    return car.is_max == isMax;
                })
                carsB = requiredGarages[index].cars_b.filter(function (car) {
                    return car.is_max == isMax;
                })
                carsA = requiredGarages[index].cars_a.filter(function (car) {
                    return car.is_max == isMax;
                })
                carsS = requiredGarages[index].cars_s.filter(function (car) {
                    return car.is_max == isMax;
                })
                newArrayItem = createNewObject(requiredGarages[index].player_name, carsD, carsC, carsB, carsA, carsS)
                filteredArray.push(newArrayItem);
            }
            requiredGarages = filteredArray;
        }
        if (isUnlocked === true) {
            filteredArray = [];
            for (let index = 0; index < requiredGarages.length; index++) {
                carsD = requiredGarages[index].cars_d.filter(function (car) {
                    return car.stars != 0;
                })
                carsC = requiredGarages[index].cars_c.filter(function (car) {
                    return car.stars != 0;
                })
                carsB = requiredGarages[index].cars_b.filter(function (car) {
                    return car.stars != 0;
                })
                carsA = requiredGarages[index].cars_a.filter(function (car) {
                    return car.stars != 0;
                })
                carsS = requiredGarages[index].cars_s.filter(function (car) {
                    return car.stars != 0;
                })
                newArrayItem = createNewObject(requiredGarages[index].player_name, carsD, carsC, carsB, carsA, carsS)
                filteredArray.push(newArrayItem);
            }
            requiredGarages = filteredArray;
        }
        createCards(requiredGarages);
    }
    function createNewObject(name, D, C, B, A, S) {
        return object = {
            player_name: name,
            cars_d: D,
            cars_c: C,
            cars_b: B,
            cars_a: A,
            cars_s: S,
        }
    }


    function filterShowToggle(block, blockArrow) {
        // console.log(blockArrow);
        var element = document.getElementById(block);
        if (element.style.height != "0px") {
            document.getElementById(blockArrow).style.transform = "rotate(0deg)";
            element.style.height = "0px";
        } else if (element.style.height == "0px") {
            document.getElementById(blockArrow).style.transform = "rotate(90deg)";
            element.style.height = "max-content";
        }
    }

    function createCards(playerArray) {
        document.getElementById("realResults").innerHTML = "";
        if (playerArray.length == 0) {
            document.getElementById("realResults").innerHTML = `
                <div style="padding: 150px;color:white;text-align:center;"><h4>No Results</h4></div>`
        } else {
            for (let index = 0; index < playerArray.length; index++) {

                let blockPlayerTitle = document.createElement("div");
                let allCarsBlock = document.createElement("div");

                blockPlayerTitle.classList.add("blockTitle");
                blockPlayerTitle.id = "blockTitle" + index;
                allCarsBlock.classList.add("carBlock");
                allCarsBlock.id = "bigBlock" + index;

                blockPlayerTitle.innerHTML = `
                    <h4 class="h4">${playerArray[index].player_name.toUpperCase()}'s Garage</h4>
                    <img class="arrow-image" src="body-images/filter_arrow.png" id="arrowOfBlockTitle${index}">
                    `
                document.getElementById("realResults").appendChild(blockPlayerTitle);
                document.getElementById("realResults").appendChild(allCarsBlock);

                let currentPlayer = playerArray[index];
                let currentBlock = "bigBlock" + index;

                if (currentPlayer.cars_d.length != 0) {

                    let classHeading = document.createElement("div");
                    let classDCars = document.createElement("div");

                    classHeading.classList.add("class_headings");
                    classDCars.classList.add("all_cars_box");
                    classDCars.id = "D_block_"+index;

                    classHeading.innerHTML = `
                        <h4 class="h4">Class D</h4>
                        <img class="arrow-image" src="body-images/filter_arrow.png" id="D_class_${index}_arrow">
                    `
                    document.getElementById(currentBlock).appendChild(classHeading);
                    document.getElementById(currentBlock).appendChild(classDCars);

                    let forD = "D_block_"+index;

                    for (let thisindex = 0; thisindex < currentPlayer.cars_d.length; thisindex++) {

                        let thisCar = document.createElement("div");

                        totalStars = "";
                        actualStars = "";
                        gold = "";
                        locked = "";

                        for (var i = 0; i < currentPlayer.cars_d[thisindex].max_stars; i++) {
                            totalStars += '&#9733;';
                        }
                        for (var i = 0; i < currentPlayer.cars_d[thisindex].stars; i++) {
                            actualStars += '&#9733;';
                        }

                        if (currentPlayer.cars_d[thisindex].is_max == true) {
                            gold = "maxtrue";
                        }
                        if (currentPlayer.cars_d[thisindex].stars == 0) {
                            locked = "url(body-images/locked-car.png),"
                        }

                        thisCar.innerHTML = `
                            <div class="car_info" style="background-image: ${locked} url(${currentPlayer.cars_d[thisindex].car_image}); background-repeat: no-repeat;
                            background-size: 100% 100%;">
                            <div class="car_name">${currentPlayer.cars_d[thisindex].car_name.toUpperCase()}</div>
                            <div class="totalstars">${totalStars}</div>
                            <div class="actualstars ${gold}" >${actualStars}</div>
                            </div>
                                        
                        `
                        document.getElementById(forD).appendChild(thisCar);
                    }

                }
                // if (currentPlayer.cars_c.length != 0) {

                // }
                // if (currentPlayer.cars_b.length != 0) {

                // }
                // if (currentPlayer.cars_a.length != 0) {

                // }
                // if (currentPlayer.cars_s.length != 0) {

                // }

                document.getElementById("blockTitle" + index).addEventListener("click", function () {
                    filterShowToggle("bigBlock" + index, "arrowOfBlockTitle" + index);
                });

            }
        }
    }
})();