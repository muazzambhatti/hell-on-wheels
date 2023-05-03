(async function () {
    const response = await fetch("garages.json");
    const allPlayers = await response.json();

    let PlayerCarsD;
    let PlayerCarsC;
    let PlayerCarsB;
    let PlayerCarsA;
    let PlayerCarsS;

    document.getElementById("searchbtn").addEventListener("click", search);
    document.getElementById("playerSelect").addEventListener("change", findPlayerName);
    document.getElementById("brandSelect").addEventListener("change", filter);

    // document.getElementById("d_cars_list").style.display = "none";
    // document.getElementById("c_cars_list").style.display = "none";
    // document.getElementById("b_cars_list").style.display = "none";
    // document.getElementById("a_cars_list").style.display = "none";
    // document.getElementById("s_cars_list").style.display = "none";

    function findPlayerName() {
        PlayerCarsD = "";
        PlayerCarsC = "";
        PlayerCarsB = "";
        PlayerCarsA = "";
        PlayerCarsS = "";
        document.getElementById("D_car_container").innerHTML = "";
        document.getElementById("C_car_container").innerHTML = "";
        document.getElementById("d_cars_list").style.display = "none";
        document.getElementById("c_cars_list").style.display = "none";
        let player = document.getElementById("playerSelect").value.toLowerCase();
        for (let index = 0; index < allPlayers.length; index++) {
            if (allPlayers[index].player_name == player) {
                PlayerCarsD = allPlayers[index].cars_d;
                PlayerCarsC = allPlayers[index].cars_c;
            }
        }
        createCards(PlayerCarsD, PlayerCarsC);
    }

    function search() {
        let player = document.getElementById("playerSelect").value;
        if (player == "") {
            return alert("no player selected");
        }
    }

    function filter() {
        let player = document.getElementById("playerSelect").value;
        if (player == "") {
            return alert("no player selected");
        }
    }

    function createCards(carsD, carsC) {
        if (carsD != "") {
            document.getElementById("d_cars_list").style.display = "block";
            for (let index = 0; index < carsD.length; index++) {

                let thisCar = document.createElement("div");

                let totalStars = "";
                let actualStars = "";
                let gold = "";
                let locked = "";

                for (var i = 0; i < carsD[index].max_stars; i++) {
                    totalStars += '&#9733;';
                }
                for (var i = 0; i < carsD[index].stars; i++) {
                    actualStars += '&#9733;';
                }

                if (carsD[index].is_max == true) {
                    gold = "maxtrue";
                }
                // if (carsD[index].stars == 0) {
                //     locked = ",url(body-images/locked-car.png)"
                // }
                thisCar.innerHTML = `
            <div class="main" style="background-image: url(${carsC[index].car_image}); background-repeat: no-repeat;
            background-size: 100% 100%;">
                <div class="name">${carsD[index].car_name.toUpperCase()}</div>
                <div class="totalstars">${totalStars}</div>
                <div class="actualstars ${gold}" >${actualStars}</div>
            </div>
            
            `
                document.getElementById("D_car_container").appendChild(thisCar);
            }
        } if (carsC != "") {
            document.getElementById("c_cars_list").style.display = "block";
            for (let index = 0; index < carsC.length; index++) {

                let thisCar = document.createElement("div");

                let totalStars = "";
                let actualStars = "";
                let gold = "";
                let locked = "";

                for (var i = 0; i < carsC[index].max_stars; i++) {
                    totalStars += '&#9733;';
                }
                for (var i = 0; i < carsC[index].stars; i++) {
                    actualStars += '&#9733;';
                }

                if (carsC[index].is_max == true) {
                    gold = "maxtrue";
                }
                if (carsC[index].stars == 0) {
                    locked = "url('body-images/locked-car.png'),"
                }

                thisCar.innerHTML = `
            <div class="main" style="background-image: ${locked} url( ${carsC[index].car_image}); background-repeat: no-repeat;
            background-size: 100% 100%;">
                <div class="name">${carsC[index].car_name.toUpperCase()}</div>
                <div class="totalstars">${totalStars}</div>
                <div class="actualstars ${gold}" >${actualStars}</div>
            </div>
            
            `
                document.getElementById("C_car_container").appendChild(thisCar);
            }
        }

    }
})();