(async function () {
    const response = await fetch("garages.json");
    const allPlayers = await response.json();

    document.getElementById("searchbtn").addEventListener("click", search);
    document.getElementById("searchbox").addEventListener("keypress", function (event) {
        if (event.key === "Enter" && document.getElementById("searchbox").value !== "") {
            search();
        }
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

            if (player =="all") {
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

                newArrayItem = createNewObject(requiredGarages[index].player_name, carsD, carsC, carsB, carsA, carsS)

                filteredArray.push(newArrayItem);

            }

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

    function createCards(playerArray) {
        console.log(playerArray);
    }
})();