import { players } from "./players.js";

// console.log(players[0].name)
const team1 = {
    players: [],
    runs: 0,
    fantasy: 0,
    capName: [],
    viceCapName: [],
    totalCredit: 0,
};

const team2 = {
    players: [],
    runs: 0,
    fantasy: 0,
    capName: [],
    viceCapName: [],
    totalCredit: 0,
};
const short = [1, 2, 3, 4, 6, 0, "W"];
var tossArray = [];
// console.log(players[1])
// alert(players[1])
document.getElementById("startGame").style.display = "none";
document.getElementById("summary").style.display = "none";
document.getElementById("addTeamBtn").addEventListener(
    "click",
    () => {
        let firstTeam = document.getElementById("firstTeamName").value;
        let secondTeam = document.getElementById("secondTeamName").value;

        if (firstTeam == "" ||
            secondTeam == "" ||
            firstTeam == secondTeam ||
            !isNaN(firstTeam) ||
            !isNaN(secondTeam)

        ) {
            return alert("ENTER VALID TEAM NAMES");
        }

        tossArray = [firstTeam, secondTeam];
        let randomWinner = Math.floor(Math.random() * 2);
        document.getElementById("winnerTeam").value = tossArray[randomWinner];
        alert(`${tossArray[randomWinner]} winn the toss`);

        team1.name = tossArray[randomWinner];
        if (tossArray[randomWinner] == secondTeam) {
            team2.name = firstTeam;
        } else {
            team2.name = secondTeam;
        }

        setTimeout(() => {
            document.getElementById('startGame').style.display = 'inline';
            document.getElementById('chooseTeam').style.display = 'none';
        }, 3000);

    }
)

var allPlayer = [];
var playerCard = document.getElementById("playerCard");
var addButtonTeam2;

display();

function display() {
    // Initialize allPlayer with all players from the 'players' array
    allPlayer = [...players];

    // Clear the previous content
    playerCard.innerHTML = '';

    for (let i = 0; i < allPlayer.length; i++) {
        // Create a new div for each player
        let playerItem = document.createElement("div");
        playerItem.id = `player-${i}`;
        playerItem.classList.add("player-item");

        // Set the player's information as text content
        let playerInfo = `${allPlayer[i].name},${allPlayer[i].playingRole},${allPlayer[i].credit}`;
        playerItem.textContent = playerInfo;

        // Create and append the "Add to Team 1" button
        let addButtonTeam1 = document.createElement("button");
        addButtonTeam1.textContent = "+";
        addButtonTeam1.id = "addToTeam1";
        addButtonTeam1.onclick = function () {
            addPlayerToTeam(allPlayer[i], team1, i);  // Add player to Team 1
            // teamDisplay(allPlayer[i], team1);
        };

        // Create and append the "Add to Team 2" button (disabled until Team 1 is full)
        addButtonTeam2 = document.createElement("button");
        addButtonTeam2.textContent = "+";
        addButtonTeam2.id = "addToTeam2";
        // addButtonTeam2.disabled = team1.players.length < 11; // Disable until Team 1 is full

        addButtonTeam2.onclick = function () {
            addPlayerToTeam(allPlayer[i], team2, i);  // Add player to Team 2
        };

        // Append the buttons to the player item div
        playerItem.appendChild(addButtonTeam1);
        playerItem.appendChild(addButtonTeam2);

        // Append the player item to the playerCard container
        playerCard.appendChild(playerItem);
    }
}

let batsmanCount = 0;
let wicketkeeperCount = 0;
let bowlerCount = 0;
// let teamIsDone = true;


function addPlayerToTeam(player, teamName, index) {

    if (teamName.totalCredit <= 100) {
        if (teamName.players.length < 11) {

            if (player.playingRole === "Batsman" && batsmanCount >= 5) {
                alert("You can only select 5 batsmen.");
                return;  // Stop execution if the limit is exceeded
            } else if (player.playingRole === "Wicketkeeper" && wicketkeeperCount >= 1) {
                alert("You can only select 1 wicketkeeper.");
                return;
            } else if (player.playingRole === "Bowler" && bowlerCount >= 5) {
                alert("You can only select 5 bowlers.");
                return;
            }
        } else {
            alert("maximum 11 player in team");
            return;
        }
    } else {
        alert("You have no credit");
        return;
    }

    // Increase the count if validation passes
    if (player.playingRole === "Batsman") {
        batsmanCount++;
    } else if (player.playingRole === "Wicketkeeper") {
        wicketkeeperCount++;
    } else if (player.playingRole === "Bowler") {
        bowlerCount++;
    }
    teamName.players.push(player);
    document.getElementById(`player-${index}`).style.display = 'none'; // Hide the player card after adding
    teamName.totalCredit += player.credit; // Update the total credit for the team
    console.log("Total Credits: ", teamName.totalCredit);
    document.querySelector(".credits").innerHTML = ""; // Clear the previous content
    document.querySelector(".credits").innerHTML = "Total Credits: " + teamName.totalCredit; // Set the new content    


    displayAllTeams(teamName);

    if (teamName == team1) {
        team1ReadyCheck();
        captainBtnHide1();
        vcBtnHide1();
    } else if (teamName == team2) {
        team2ReadyCheck();
        captainBtnHide2();
        vcBtnHide2();
    }
}

function displayAllTeams(teamName) {

    if (teamName == team1) {
        team1PlayerCard.innerHTML = "";

        // Display players for Team 1
        team1.players.forEach((player, index) => {
            teamDisplay(player, team1, index);
        });
    } else if (teamName == team2) {
        team2PlayerCard.innerHTML = "";

        // Display players for Team 2
        team2.players.forEach((player, index) => {
            teamDisplay(player, team2, index);
        });
    }
}

function teamDisplay(player, teamName, index) {
    let playerCard = document.createElement("div");
    let removeButton1 = document.createElement("button");
    let removeButton2 = document.createElement("button");
    let captain1 = document.createElement("button");
    let captain2 = document.createElement("button");
    let viceCaptain1 = document.createElement("button");
    let viceCaptain2 = document.createElement("button");
    let selPlayersItem = document.createElement("div");


    removeButton1.id = "removeButton1";
    removeButton2.id = "removeButton2";
    captain1.id = "captain1";
    captain2.id = "captain2";
    viceCaptain1.id = "viceCaptain1";
    viceCaptain2.id = "viceCaptain2";
    selPlayersItem.id = "selPlayersItem";

    captain1.textContent = "C";
    viceCaptain1.textContent = "VC";
    captain2.textContent = "C";
    viceCaptain2.textContent = "VC";


    // sort the player first Batsman ,Wicketkeeper ,Bowler 
    teamName.players.sort((a, b) => {
        const roleOrder = {
            "Batsman": 1,
            "Wicketkeeper": 2,
            "Bowler": 3,
        };

        return roleOrder[a.playingRole] - roleOrder[b.playingRole];
    });

    // Create the player card with details
    playerCard.classList.add("teamPlayer");
    playerCard.textContent = `${player.name},${player.playingRole},${player.credit}`;
    if (teamName == team1) {
        removeButton1.textContent = "-";
    } else {
        removeButton2.textContent = "-";
    }

    // Remove player from team when the button is clicked
    removeButton1.onclick = function () {
        removePlayerFromTeam(player, teamName, index);  // Remove player from team
    };

    removeButton2.onclick = function () {
        removePlayerFromTeam(player, teamName, index);  // Remove player from team
    };

    captain1.onclick = function () {
        makeCaptain(player, teamName, index);
    }
    captain2.onclick = function () {
        makeCaptain(player, teamName, index);
    }
    viceCaptain1.onclick = function () {
        makeViceCaptain(player, teamName, index);
    }
    viceCaptain2.onclick = function () {
        makeViceCaptain(player, teamName, index);
    }



    if (teamName === team1) {
        team1PlayerCard.appendChild(selPlayersItem);
        selPlayersItem.appendChild(removeButton1);
        selPlayersItem.appendChild(captain1);
        selPlayersItem.appendChild(viceCaptain1);
        selPlayersItem.appendChild(playerCard);
    } else {
        team2PlayerCard.appendChild(selPlayersItem);
        selPlayersItem.appendChild(removeButton2);
        selPlayersItem.appendChild(captain2);
        selPlayersItem.appendChild(viceCaptain2);
        selPlayersItem.appendChild(playerCard);

    }

    captainBtnHide1();
    captainBtnHide2();
    vcBtnHide1();
    vcBtnHide2();
}

function removePlayerFromTeam(player, teamName, index) {
    // document.getElementById(`player-${index}`).style.display = 'block';
    players.forEach((playerId, indexId) => {
        if (playerId === player) {
            document.getElementById(`player-${indexId}`).style.display = 'flex';
            console.log(player);
        }
    });

    if (index !== -1) {
        teamName.players.splice(index, 1);
        teamName.totalCredit -= player.credit;
        console.log("Total Credits after removal: ", teamName.totalCredit);
        document.querySelector(".credits").innerHTML = ""; // Clear the previous content
        document.querySelector(".credits").innerHTML = "Total Credits: " + teamName.totalCredit; // Set the new content

    }

    if (player.playingRole === "Batsman") {
        batsmanCount--;
    } else if (player.playingRole === "Wicketkeeper") {
        wicketkeeperCount--;
    } else if (player.playingRole === "Bowler") {
        bowlerCount--;
    }

    // Update the display for both teams
    if (teamName == team1) {
        team1ReadyCheck();
    } else {
        team2ReadyCheck();
    }
    displayAllTeams(teamName);
}

///////// team is ready and make captain 

let team1Ready = document.getElementById("submitTeam1Btn");
let team2Ready = document.getElementById("submitTeam2Btn");
document.getElementById("hit").style.display = "none";  // hide button hide

var addToTeam1Btn = document.querySelectorAll('#addToTeam1');
var addToTeam2Btn = document.querySelectorAll('#addToTeam2');
//  hide add to team 2 but
addToTeam2Btn.forEach(hideBtn => {
    hideBtn.style.display = 'none';
});

document.getElementById("submitTeam1Btn").style.display = "none";
document.getElementById("submitTeam2Btn").style.display = "none";

function team1ReadyCheck() {
    if (team1.totalCredit <= 100 && team1.players.length == 11) {
        document.getElementById("submitTeam1Btn").style.display = "flex";
    } else {
        document.getElementById("submitTeam1Btn").style.display = "none";
    }
}

function team2ReadyCheck() {
    if (team2.totalCredit <= 100 && team2.players.length == 11) {
        document.getElementById("submitTeam2Btn").style.display = "flex";
    } else {
        document.getElementById("submitTeam2Btn").style.display = "none";
    }
}

function captainBtnHide1() {
    document.querySelectorAll("#captain1").forEach(element => {
        element.style.display = "none";
    });
}
function captainBtnHide2() {
    document.querySelectorAll("#captain2").forEach(element => {
        element.style.display = "none";
    });
}
function vcBtnHide1() {
    document.querySelectorAll("#viceCaptain1").forEach(element => {
        element.style.display = "none";
    });
}
function vcBtnHide2() {
    document.querySelectorAll("#viceCaptain2").forEach(element => {
        element.style.display = "none";
    });
}
function captainBtnshow1() {
    document.querySelectorAll("#captain1").forEach(element => {
        element.style.display = "inline";
    });
}
function captainBtnshow2() {
    document.querySelectorAll("#captain2").forEach(element => {
        element.style.display = "inline";
    });
}
function vcBtnshow1() {
    document.querySelectorAll("#viceCaptain1").forEach(element => {
        element.style.display = "inline";
    });
}
function vcBtnshow2() {
    document.querySelectorAll("#viceCaptain2").forEach(element => {
        element.style.display = "inline";
    });
}


//  click team1 submit button
team1Ready.onclick = () => {

    alert("Team1 is submitted");
    alert("select captain and vice captain ")

    // addToTeam2Btn.forEach(card => {
    //     card.style.display = 'inline';
    // });
    addToTeam1Btn.forEach(card => {
        card.style.display = 'none';
    });

    batsmanCount = 0;
    wicketkeeperCount = 0;
    bowlerCount = 0;
    teamIsReady(team1);

    team1Ready.style.display = "none";
    // document.getElementById("team1PlayerCard").style.display="none";  //team 1 hide
    captainBtnshow1();

}

//  click team2 submit button
team2Ready.onclick = () => {

    // document.getElementById("submitTeam2Btn").style.display = "none";
    alert("Team2 is submitted");
    // let addToTeam2Btn = document.querySelectorAll('#addToTeam2');
    addToTeam1Btn.forEach(card => {
        card.style.display = 'none';
    });
    addToTeam2Btn.forEach(card => {
        card.style.display = 'none';
    });

    playerCard.style.display = "none";
    teamIsReady(team2);

    document.getElementById("submitTeam2Btn").style.display = "none";
    captainBtnshow2();
}

function addToTeam2Display() {
    addToTeam2Btn.forEach(card => {
        card.style.display = 'inline';
    });
}

function teamIsReady(teamName) {
    if (teamName == team1) {
        let removeBtnHide1 = document.querySelectorAll('#removeButton1');
        removeBtnHide1.forEach(remove1 => {
            remove1.style.display = 'none';
        });
    }
    if (teamName == team2) {
        let removeBtnHide2 = document.querySelectorAll('#removeButton2');
        removeBtnHide2.forEach(remove2 => {
            remove2.style.display = 'none';
        });
    }
}
// Captain and viceCaptain choice

function makeCaptain(player, teamName, index) {
    let isConfirmed = false;
    isConfirmed = confirm("Are you sure you want to select this player as captain?");

    if (teamName == team1) {
        if (isConfirmed) {
            teamName.capName.push(player);
            document.querySelectorAll("#captain1").forEach(c => {
                c.style.display = 'none';
            });
            vcBtnshow1();
        }
    }
    if (teamName == team2) {
        if (isConfirmed) {
            teamName.capName.push(player);
            document.querySelectorAll("#captain2").forEach(c => {
                c.style.display = 'none';
            });
            vcBtnshow2();
        }
    }
}

function makeViceCaptain(player, teamName, index) {
    let isConfirmed = false;
    if (teamName.capName[0] == player) {
        alert("captain and vice captain not same")
    } else {
        isConfirmed = confirm("Are you sure you want to select this player as vice captain?");

        if (isConfirmed) {
            if (teamName == team1) {
                teamName.viceCapName.push(player);
                document.querySelectorAll("#viceCaptain1").forEach(vc => {
                    vc.style.display = 'none';
                });
            } else {
                teamName.viceCapName.push(player);
                // document.querySelectorAll("#viceCaptain2").forEach(vc => {
                //     vc.style.display = 'none';
                // });
                document.getElementById("team2PlayerCard").style.display = "none";
                document.getElementById("team1PlayerCard").style.display = "none";

                document.getElementById("hit").style.display = "flex";

            }
        }
        if (teamName == team1) {
            addToTeam2Display()
            alert("create second team");
            document.getElementById("team1PlayerCard").style.display = "none";
        } else if (teamName == team2) {
            document.getElementById("selectPlayers").style.display = "none";
            document.getElementById("credits").style.display = "none"
            alert("Press Hit Button Your Game Is Start");
        }
    }
}


// Start the game

// create a hit button

// let team1BatsmenPoints = [];
// let team2BatsmenPoints = [];
let team1BatsmenPoints = Array(11).fill(0);
let team2BatsmenPoints = Array(11).fill(0);

let team1BowlingPoints = 0;
let team2BowlingPoints = 0;

let currentBatsmanIndex = 0;
let currentBowlerIndex = 6;
let balls = 0;
let over = 0;
let totalBalls = 0;
let team1Points = 0;
let team2Points = 0;

let isTeam1Batting = true;

let hit = document.getElementById("hit");
hit.onclick = () => {

    if (balls >= 30) {
        isTeam1Batting = false;
        return;
    }

    let x = Math.floor(Math.random() * 7);
    let currentBatsman;
    let currentBowler;

    if (totalBalls >= 30 && isTeam1Batting) {
        isTeam1Batting = false;
        currentBatsmanIndex = 0;  // Reset for team 2 batting
        currentBowlerIndex = 6;  // Reset for team 1 bowling
        over = 0;  // Reset overs for second innings
        totalBalls = 0;  // Reset total balls for second innings
        alert("Team 1's innings is over! Team 2 is now batting.");
        return;
    }

    // Check if Team 2 innings is over
    if (totalBalls >= 30 && !isTeam1Batting) {
        captainPoints();
        alert("Team 2's innings is over! Match finished.");
        document.getElementById("hit").style.display = "none";  // hide button hide
        document.getElementById("summary").style.display = "block";
        return;
    }

    // Set current batsman and bowler based on who's batting
    if (isTeam1Batting) {
        currentBatsman = team1.players[currentBatsmanIndex];
        currentBowler = team2.players[currentBowlerIndex];
    } else {
        currentBatsman = team2.players[currentBatsmanIndex];
        currentBowler = team1.players[currentBowlerIndex];
    }

    // If a wicket is taken
    if (short[x] === "W") {
        if (isTeam1Batting) {
            team1.players[currentBatsmanIndex].balls += 1;    // Increment balls face
            team2.players[currentBowlerIndex].wickets += 1;  // Increment wickets for Team 2's bowler
            team2.players[currentBowlerIndex].bowlingPoints += 10;  // Add points for the wicket
        } else {
            team2.players[currentBatsmanIndex].balls += 1;    // Increment balls face
            team1.players[currentBowlerIndex].wickets += 1;  // Increment wickets for Team 1's bowler
            team1.players[currentBowlerIndex].bowlingPoints += 10;  // Add points for the wicket
        }
    }

    if (short[x] === "W") {
        console.log(`${currentBatsman.name} is out!`);
        isTeam1Batting ? team2BowlingPoints += 10 : team1BowlingPoints += 10;

        // Move to next batsman if current one is out
        currentBatsmanIndex += 1;
        if (currentBatsmanIndex >= 11) {
            // If all batsmen are out, finish the innings
            totalBalls = 30; // End the innings
            return;
        }
    } else {
        let runs = short[x];
        console.log(`${currentBatsman.name} scored ${runs} runs!`);
        console.log(`${currentBowler.name}`)

        // Update team points
        isTeam1Batting ? team1Points += runs : team2Points += runs;

        // Update individual player stats for batsmen
        if (isTeam1Batting) {
            team1.players[currentBatsmanIndex].runs += runs;  // Update runs
            team1.players[currentBatsmanIndex].balls += 1;    // Increment balls faced
            team1.players[currentBatsmanIndex].battingPoints += runs + (runs === 4 ? 1 : runs === 6 ? 2 : 0);  // Bonus points for boundaries
        } else if (!isTeam1Batting) {
            team2.players[currentBatsmanIndex].runs += runs;  // Update runs
            team2.players[currentBatsmanIndex].balls += 1;    // Increment balls faced
            team2.players[currentBatsmanIndex].battingPoints += runs + (runs === 4 ? 1 : runs === 6 ? 2 : 0);  // Bonus points for boundaries
        }
        // if(isTeam1Batting){
        //     (team1.players[currentBatsmanIndex].name == team1.capName[0].name) {
        //         team1.players[currentBatsmanIndex].battingPoints += 
        //     }
        // }


        // Bonus point for bowlers if the ball was a dot
        if (runs === 0) {
            if (isTeam1Batting) {
                team2.players[currentBowlerIndex].bowlingPoints += 1; // Dot ball bonus for Team 2 bowler
            } else {
                team1.players[currentBowlerIndex].bowlingPoints += 1; // Dot ball bonus for Team 1 bowler
            }
        }
    }

    // Increment the ball count
    over += 1;
    totalBalls += 1;

    // After 6 balls, reset over count and change bowler
    if (over === 6) {
        over = 0;
        currentBowlerIndex += 1;
        if (currentBowlerIndex >= (isTeam1Batting ? team2.players.length : team1.players.length)) {
            currentBowlerIndex = 0;
        }
    }

    // captain and vice captain point
    function captainPoints() {
        const team1Captain = team1.capName[0];
        const team1ViceCaptain = team1.viceCapName[0];
        const team2Captain = team2.capName[0];
        const team2ViceCaptain = team2.viceCapName[0];

        team1.players.forEach(player => {
            if (player.name === team1Captain.name) {
                player.battingPoints *= 2;
                player.bowlingPoints *= 2;
            }
            if (player.name === team1ViceCaptain.name) {
                player.battingPoints *= 1.5;
                player.bowlingPoints *= 1.5;
            }
        });

        team2.players.forEach(player => {
            if (player.name === team2Captain.name) {
                player.battingPoints *= 2;
                player.bowlingPoints *= 2;
            }
            if (player.name === team2ViceCaptain.name) {
                player.battingPoints *= 1.5;
                player.bowlingPoints *= 1.5;
            }
        });

        showSummary();
    }
    function showSummary() {
        // document.getElementById("summary").style.display = "block";

        let summary1 = document.getElementById("summary1");
        let summary2 = document.getElementById("summary2");
        let result = document.getElementById("result");
        let firstTeam = document.getElementById("firstTeamName").value;
        let secondTeam = document.getElementById("secondTeamName").value;

        // Reset content to avoid appending on multiple calls
        summary1.innerHTML = "";
        summary2.innerHTML = "";
        result.innerHTML = "";

        // Calculate Team 1 points, runs, and wickets
        let team1BattingPoints = team1.players.reduce((total, player) => total + player.battingPoints, 0);
        let team1BowlingPoints = team1.players.reduce((total, player) => total + player.bowlingPoints, 0);
        let team1TotalPoints = team1BattingPoints + team1BowlingPoints;
        let totalRuns1 = team1.players.reduce((sum, player) => sum + player.runs, 0);
        let totalWickets1 = team1.players.reduce((sum, player) => sum + player.wickets, 0);

        // Display Team 1 Summary
        summary1.innerHTML += `<h4>${firstTeam} Players</h4>`;
        summary1.innerHTML += `<p>Total Points: ${team1TotalPoints}</p>`;
        summary1.innerHTML += `<p>Total Runs: ${totalRuns1}, Total Wickets: ${totalWickets1}</p>`;

        team1.players.forEach((player) => {
            summary1.innerHTML += `<p>${player.name} - 
                Runs: ${player.runs}, 
                Balls Played: ${player.balls}, 
                Wickets: ${player.wickets}, 
                Bowling Points: ${player.bowlingPoints}, 
                Batting Points: ${player.battingPoints}</p>`;
        });

        // Calculate Team 2 points, runs, and wickets
        let team2BattingPoints = team2.players.reduce((total, player) => total + player.battingPoints, 0);
        let team2BowlingPoints = team2.players.reduce((total, player) => total + player.bowlingPoints, 0);
        let team2TotalPoints = team2BattingPoints + team2BowlingPoints;
        let totalRuns2 = team2.players.reduce((sum, player) => sum + player.runs, 0);
        let totalWickets2 = team2.players.reduce((sum, player) => sum + player.wickets, 0);

        // Display Team 2 Summary
        summary2.innerHTML += `<h4>${secondTeam} Players</h4>`;
        summary2.innerHTML += `<p>Total Points: ${team2TotalPoints}</p>`;
        summary2.innerHTML += `<p>Total Runs: ${totalRuns2}, Total Wickets: ${totalWickets2}</p>`;

        team2.players.forEach((player) => {
            summary2.innerHTML += `<p>${player.name} - 
                Runs: ${player.runs}, 
                Balls Played: ${player.balls}, 
                Wickets: ${player.wickets}, 
                Bowling Points: ${player.bowlingPoints}, 
                Batting Points: ${player.battingPoints}</p>`;
        });

        // Display the match result
        if (team1TotalPoints > team2TotalPoints) {
            result.innerHTML = `<h4>Result: ${firstTeam} wins!</h4>`;
        } else if (team1TotalPoints < team2TotalPoints) {
            result.innerHTML = `<h4>Result: ${secondTeam} wins!</h4>`;
        } else {
            result.innerHTML = "<h4>Result: It's a tie!</h4>";
        }
    }

}