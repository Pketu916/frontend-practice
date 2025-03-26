import { players } from "./players.js";

const team1 = {
    players: [],
    runs: 0,
    capName: {},
    viceCapName: {},
    totalCredit: 0,
};

const team2 = {
    players: [],
    runs: 0,
    capName: {},
    viceCapName: {},
    totalCredit: 0,
};
const shots = [1, 2, 3, 4, 6, 0, "W"];
var teamName = [];

document.getElementById("toss").addEventListener(
    "click",
    () => {
        let firstTeamName = document.getElementById("firstTeamName").value;
        let secondTeamName = document.getElementById("secondTeamName").value;

        if (firstTeamName == "" ||
            secondTeamName == "" ||
            firstTeamName == secondTeamName ||
            !isNaN(firstTeamName) ||
            !isNaN(secondTeamName)

        ) {
            return alert("ENTER VALID TEAM NAMES");
        }

        let toss = [firstTeamName, secondTeamName];
        let randomWinner = Math.floor(Math.random() * 2);
        let winningTeam = toss[randomWinner];
        let otherTeam = toss[1 - randomWinner];

        teamName = [winningTeam, otherTeam];

        document.getElementById("winnerTeam").value = teamName[0];
        alert(`${teamName[0]} wins the toss`);

        team1.name = teamName[0];
        team2.name = teamName[1];

        setTimeout(() => {
            document.getElementById('startGame').style.display = 'inline';
            document.getElementById('chooseTeam').style.display = 'none';
            document.getElementById("teamName").innerHTML = `<h2>Create Team ${teamName[0]}<h2/>`;
        }, 1000);

    }
)

var allPlayer = [];
var playerCard = document.getElementById("playerCard");

allPlayersListDisplay();

function allPlayersListDisplay() {

    let addPlayerBtnForTeam2;

    allPlayer = [...players];

    playerCard.innerHTML = '';

    for (let i = 0; i < allPlayer.length; i++) {

        let playerItem = document.createElement("div");
        playerItem.id = `player-${i}`;
        playerItem.classList.add("player-item");

        let playerInfo = `${allPlayer[i].name},${allPlayer[i].playingRole},${allPlayer[i].credit}`;
        playerItem.textContent = playerInfo;

        let addPlayerBtnForTeam1 = document.createElement("button");
        addPlayerBtnForTeam1.textContent = "+";
        addPlayerBtnForTeam1.id = "addToTeam1";
        addPlayerBtnForTeam1.onclick = function () {
            addPlayerToTeam(allPlayer[i], team1, i);
        };

        addPlayerBtnForTeam2 = document.createElement("button");
        addPlayerBtnForTeam2.textContent = "+";
        addPlayerBtnForTeam2.id = "addToTeam2";

        addPlayerBtnForTeam2.onclick = function () {
            addPlayerToTeam(allPlayer[i], team2, i);
        };

        playerItem.appendChild(addPlayerBtnForTeam1);
        playerItem.appendChild(addPlayerBtnForTeam2);

        playerCard.appendChild(playerItem);
    }
}

let batsmanCount = 0;
let wicketkeeperCount = 0;
let bowlerCount = 0;

function addPlayerToTeam(player, team, index) {

    if (team.players.length >= 11) {
        alert("Maximum 11 players in the team");
        return;
    }

    if ((player.playingRole === "Batsman" && batsmanCount >= 5) ||
        (player.playingRole === "Wicketkeeper" && wicketkeeperCount >= 1) ||
        (player.playingRole === "Bowler" && bowlerCount >= 5)) {
        alert(`You can only select ${player.playingRole === "Wicketkeeper" ? 1 : 5} ${player.playingRole.toLowerCase()}${player.playingRole === "Wicketkeeper" ? "" : "s"}.`);
        return;
    }

    team.totalCredit += player.credit;
    document.querySelector(".credits").textContent = "Total Credits: " + team.totalCredit;

    if (team.totalCredit > 100) {
        alert("You have no credit");
        team.totalCredit -= player.credit;
        document.querySelector(".credits").textContent = "Total Credits: " + team.totalCredit;
        return;
    }

    team.players.push(player);
    if (player.playingRole === "Batsman") batsmanCount++;
    if (player.playingRole === "Wicketkeeper") wicketkeeperCount++;
    if (player.playingRole === "Bowler") bowlerCount++;

    document.getElementById(`player-${index}`).style.display = 'none';
    bothTeamPlayerDisplayUpdate(team);

    if (team === team1) {
        hideCaptainAndViceCaptainBtn("#captain1");
        hideCaptainAndViceCaptainBtn("#viceCaptain1");

    } else if (team === team2) {
        hideCaptainAndViceCaptainBtn("#captain2");
        hideCaptainAndViceCaptainBtn("#viceCaptain1");

    }
    showAndHideSubmitBtn(team);
}


function bothTeamPlayerDisplayUpdate(teamName) {

    if (teamName == team1) {
        document.getElementById("team1PlayerCard").innerHTML = "";

        team1.players.forEach((player, index) => {
            createTeamStructure(player, team1, index);
        });
    } else {
        document.getElementById("team2PlayerCard").innerHTML = "";

        team2.players.forEach((player, index) => {
            createTeamStructure(player, team2, index);
        });
    }
}

function createTeamStructure(player, teamName, index) {
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

    teamName.players.sort((a, b) => {
        const roleOrder = {
            "Batsman": 1,
            "Wicketkeeper": 2,
            "Bowler": 3,
        };
        return roleOrder[a.playingRole] - roleOrder[b.playingRole];
    });

    playerCard.classList.add("teamPlayer");
    playerCard.textContent = `${player.name},${player.playingRole},${player.credit}`;
    if (teamName == team1) {
        removeButton1.textContent = "-";
    } else {
        removeButton2.textContent = "-";
    }

    removeButton1.onclick = function () {
        removePlayerFromTeam(player, teamName, index);
    };

    removeButton2.onclick = function () {
        removePlayerFromTeam(player, teamName, index);
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
        document.getElementById("team1PlayerCard").appendChild(selPlayersItem);
        selPlayersItem.appendChild(removeButton1);
        selPlayersItem.appendChild(captain1);
        selPlayersItem.appendChild(viceCaptain1);
        selPlayersItem.appendChild(playerCard);
    } else {
        document.getElementById("team2PlayerCard").appendChild(selPlayersItem);
        selPlayersItem.appendChild(removeButton2);
        selPlayersItem.appendChild(captain2);
        selPlayersItem.appendChild(viceCaptain2);
        selPlayersItem.appendChild(playerCard);

    }

    hideCaptainAndViceCaptainBtn("#captain1");
    hideCaptainAndViceCaptainBtn("#captain2");
    hideCaptainAndViceCaptainBtn("#viceCaptain1");
    hideCaptainAndViceCaptainBtn("#viceCaptain2");
}

function removePlayerFromTeam(player, teamName, index) {
    // document.getElementById(`player-${index}`).style.display = 'block';
    players.forEach((teamPlayer, players) => {
        if (teamPlayer === player) {
            document.getElementById(`player-${players}`).style.display = 'flex';
        }
    });

    teamName.players.splice(index, 1);
    teamName.totalCredit -= player.credit;
    // document.querySelector(".credits").innerHTML = "";
    document.querySelector(".credits").innerHTML = "Total Credits: " + teamName.totalCredit;


    if (player.playingRole === "Batsman") {
        batsmanCount--;
    } else if (player.playingRole === "Wicketkeeper") {
        wicketkeeperCount--;
    } else if (player.playingRole === "Bowler") {
        bowlerCount--;
    }

    bothTeamPlayerDisplayUpdate(teamName);
    showAndHideSubmitBtn(teamName);
}


let submitTeam1 = document.getElementById("submitTeam1Btn");
let submitTeam2 = document.getElementById("submitTeam2Btn");

var addPlayerToTeam1Btn = document.querySelectorAll('#addToTeam1');
var addPlayerToTeam2Btn = document.querySelectorAll('#addToTeam2');

addPlayerToTeam2Btn.forEach(hideBtn => {
    hideBtn.style.display = 'none';
});

function showAndHideSubmitBtn(teamName) {
    if (teamName.totalCredit <= 100 && teamName.players.length == 11) {
        if (teamName == team1) {
            document.getElementById("submitTeam1Btn").style.display = "flex";
        } else {
            document.getElementById("submitTeam2Btn").style.display = "flex";
        }
    } else {
        if (teamName == team1) {
            document.getElementById("submitTeam1Btn").style.display = "none";
        } else {
            document.getElementById("submitTeam2Btn").style.display = "none";
        }
    }
}

function hideCaptainAndViceCaptainBtn(buttonId) {
    document.querySelectorAll(buttonId).forEach(element => {
        element.style.display = "none";
    });
}

function showCaptainAndViceCaptainBtn(buttonId) {
    document.querySelectorAll(buttonId).forEach(element => {
        element.style.display = "inline";
    });
}

submitTeam1.onclick = () => {

    alert("Team1 is submitted");
    alert("select captain and vice captain ")

    addPlayerToTeam1Btn.forEach(element => {
        element.style.display = 'none';
    });

    batsmanCount = 0;
    wicketkeeperCount = 0;
    bowlerCount = 0;
    removeBtnHide('#removeButton1');

    submitTeam1.style.display = "none";
    // document.getElementById("team1PlayerCard").style.display="none";
    showCaptainAndViceCaptainBtn("#captain1");
}


submitTeam2.onclick = () => {
    // document.getElementById("submitTeam2Btn").style.display = "none";
    alert("Team2 is submitted");
    addPlayerToTeam1Btn.forEach(element => {
        element.style.display = 'none';
    });
    addPlayerToTeam2Btn.forEach(element => {
        element.style.display = 'none';
    });

    playerCard.style.display = "none";
    removeBtnHide('#removeButton2');

    document.getElementById("submitTeam2Btn").style.display = "none";
    showCaptainAndViceCaptainBtn("#captain2");
}

// [ add player to team 2 (+) ] button display inline
function addPlayerToTeam2BtnDisplay() {
    addPlayerToTeam2Btn.forEach(btn => {
        btn.style.display = 'inline';
    });
}

function removeBtnHide(teamName) {
        let removeBtnHide1 = document.querySelectorAll(teamName);
        removeBtnHide1.forEach(removeBtnHide => {
            removeBtnHide.style.display = 'none';
        });
}


function makeCaptain(player, teamName) {
    let isConfirmed = false;
    isConfirmed = confirm("Are you sure you want to select this player as captain?");

    if (teamName == team1) {
        if (isConfirmed) {
            teamName.capName.name = player.name;
            document.querySelectorAll("#captain1").forEach(c => {
                c.style.display = 'none';
            });
            showCaptainAndViceCaptainBtn("#viceCaptain1");
        }
    } else {
        if (isConfirmed) {
            teamName.capName.name = player.name;
            document.querySelectorAll("#captain2").forEach(c => {
                c.style.display = 'none';
            });
            showCaptainAndViceCaptainBtn("#viceCaptain2");
        }
    }
}

function makeViceCaptain(player, teamName) {
    let isConfirmed = false;
    if (teamName.capName[0] == player) {
        alert("captain and vice captain not same")
    } else {
        isConfirmed = confirm("Are you sure you want to select this player as vice captain?");

        if (isConfirmed) {
            if (teamName == team1) {
                teamName.viceCapName.name = player.name;
                document.querySelectorAll("#viceCaptain1").forEach(vc => {
                    vc.style.display = 'none';
                });
                addPlayerToTeam2BtnDisplay();
                alert("create second team");
                document.getElementById("team1PlayerCard").style.display = "none";
                document.getElementById("teamName").innerHTML = `<h2>Create Team ${team2.name}<h2/>`;
            } else {
                teamName.viceCapName.name = player.name;
                document.getElementById("team2PlayerCard").style.display = "none";
                document.getElementById("team1PlayerCard").style.display = "none";

                document.getElementById("hit").style.display = "flex";
                document.getElementById("selectPlayers").style.display = "none";
                document.getElementById("credits").style.display = "none"
                document.getElementById("teamName").innerHTML = "";
                alert("Press Hit Button Your Game Is Start");

            }
        }
    }
}

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
    document.getElementById("score-summary").style.display = "flex";
    document.getElementById("match-update").style.display = "grid";

    if (balls >= 30) {
        isTeam1Batting = false;
        return;
    }

    let x = Math.floor(Math.random() * 7);
    let currentBatsman;
    let currentBowler;

    if (totalBalls >= 30 && isTeam1Batting) {
        isTeam1Batting = false;
        currentBatsmanIndex = 0;
        currentBowlerIndex = 6;
        over = 0;
        totalBalls = 0;
        alert("Team 1's innings is over! Team 2 is now batting.");
        return;
    }

    if (totalBalls >= 30 && !isTeam1Batting) {
        captainViceCaptainPoints(team1);
        captainViceCaptainPoints(team2);
        alert("Team 2's innings is over! Match finished.");
        document.getElementById("hit").style.display = "none";
        document.getElementById("summary").style.display = "block";
        return;
    }

    if (isTeam1Batting) {
        currentBatsman = team1.players[currentBatsmanIndex];
        currentBowler = team2.players[currentBowlerIndex];
    } else {
        currentBatsman = team2.players[currentBatsmanIndex];
        currentBowler = team1.players[currentBowlerIndex];
    }

    let shortType = shots[x];
    let commentaryText = "";

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    commentaryText += `<b>Commentary Date:</b> ${formattedDate} <b>Time:</b> ${formattedTime}<br>`;

    if (shortType === "W") {
        if (isTeam1Batting) {
            team1.players[currentBatsmanIndex].balls += 1;
            team2.players[currentBowlerIndex].wickets += 1;
            team2.players[currentBowlerIndex].bowlingPoints += 10;
            team1.players[currentBatsmanIndex].isOut = true;
        } else {
            team2.players[currentBatsmanIndex].balls += 1;
            team1.players[currentBowlerIndex].wickets += 1;
            team1.players[currentBowlerIndex].bowlingPoints += 10;
            team2.players[currentBatsmanIndex].isOut = true;
        }
        commentaryText += `${currentBatsman.name} is out! ${currentBowler.name} takes the wicket!`;
        currentBatsmanIndex += 1;
        if (currentBatsmanIndex >= 11) {
            totalBalls = 30;
            return;
        }
    } else {
        let runs = shortType;
        commentaryText += `${currentBatsman.name} scores ${runs} runs! Bowler: ${currentBowler.name}`;

        if (isTeam1Batting) {
            team1Points += runs;
            team1.players[currentBatsmanIndex].runs += runs;
            team1.players[currentBatsmanIndex].balls += 1;
            team1.players[currentBatsmanIndex].battingPoints += runs + (runs === 4 ? 1 : runs === 6 ? 2 : 0);
        } else {
            team2Points += runs;
            team2.players[currentBatsmanIndex].runs += runs;
            team2.players[currentBatsmanIndex].balls += 1;
            team2.players[currentBatsmanIndex].battingPoints += runs + (runs === 4 ? 1 : runs === 6 ? 2 : 0);
        }

        if (runs === 0) {
            commentaryText += ` - Dot ball!`;
            if (isTeam1Batting) {
                team2.players[currentBowlerIndex].bowlingPoints += 1;
            } else {
                team1.players[currentBowlerIndex].bowlingPoints += 1;
            }
        }
    }

    commentaryText += `<br>Batsman Points: ${currentBatsman.battingPoints}`;
    commentaryText += `<br>Bowler Points: ${currentBowler.bowlingPoints}`;

    const matchUpdateDiv = document.getElementById("match-update");
    matchUpdateDiv.innerHTML += `<p>${commentaryText}</p>`;
    matchUpdateDiv.scrollTop = matchUpdateDiv.scrollHeight;  // Auto scroll

    over += 1;
    totalBalls += 1;

    if (over === 6) {
        over = 0;
        currentBowlerIndex += 1;
        if (currentBowlerIndex >= (isTeam1Batting ? team2.players.length : team1.players.length)) {
            currentBowlerIndex = 0;
        }
    }

    const overs = Math.floor(totalBalls / 6) + '.' + (totalBalls % 6);
    const wickets = isTeam1Batting ? team1.players.filter(p => p.isOut).length : team2.players.filter(p => p.isOut).length;

    let score1 = document.getElementById("score1");
    let score2 = document.getElementById("score2");

    if (isTeam1Batting) {
        score1.innerHTML = `
        <strong>${teamName[0]}</strong><br>
        Score: ${team1Points}/${wickets}<br>
        Overs: ${overs}<br>
        Batsman: ${currentBatsman.name} - ${currentBatsman.runs}/${currentBatsman.balls}`

        score2.innerHTML = `
        <strong>${teamName[1]}</strong><br>
        Yet to bat<br>
        Bowler: ${currentBowler.name}`;
    } else {
        score1.innerHTML = `
        <strong>${teamName[0]}</strong><br>
        Final Score: ${team1Points}/${team1.players.filter(p => p.isOut).length}<br>
        Bowler: ${currentBowler.name} `;

        score2.innerHTML = `
        <strong>${teamName[1]}</strong><br>
        Score: ${team2Points}/${wickets}<br>
        Overs: ${overs}<br>
        Batsman: ${currentBatsman.name} - ${currentBatsman.runs}/${currentBatsman.balls}`;
    }
};

function captainViceCaptainPoints(teamName) {

    teamName.players.forEach(player => {
        if (player.name === teamName.capName.name) {
            player.battingPoints *= 2;
            player.bowlingPoints *= 2;
        }
        if (player.name === teamName.viceCapName.name) {
            player.battingPoints *= 1.5;
            player.bowlingPoints *= 1.5;
        }
    });
    displaySummary();
}

function displaySummary() {
    // document.getElementById("score-summary").style.display = "none";
    // document.getElementById("match-update").style.display = "none";

    let team1Summary = document.getElementById("team1Summary");
    let team2Summary = document.getElementById("team2Summary");
    let result = document.getElementById("result");

    team1Summary.innerHTML = "";
    team2Summary.innerHTML = "";
    result.innerHTML = "";

    let team1BattingPoints = team1.players.reduce((total, player) => total + player.battingPoints, 0);
    let team1BowlingPoints = team1.players.reduce((total, player) => total + player.bowlingPoints, 0);
    let team1TotalPoints = team1BattingPoints + team1BowlingPoints;
    let totalRuns1 = team1.players.reduce((sum, player) => sum + player.runs, 0);
    let totalWickets1 = team1.players.reduce((sum, player) => sum + player.wickets, 0);

    team1Summary.innerHTML += `<h4>${teamName[0]} Players</h4>`;
    team1Summary.innerHTML += `<p>Total Points: ${team1TotalPoints}</p>`;
    team1Summary.innerHTML += `<p>Total Runs: ${totalRuns1}, Total Wickets: ${totalWickets1}</p>`;

    team1.players.forEach((player) => {
        team1Summary.innerHTML += `<p>${player.name} - 
                Runs: ${player.runs}, 
                Balls Played: ${player.balls}, 
                Wickets: ${player.wickets}, 
                Bowling Points: ${player.bowlingPoints}, 
                Batting Points: ${player.battingPoints}</p>`;
    });

    let team2BattingPoints = team2.players.reduce((total, player) => total + player.battingPoints, 0);
    let team2BowlingPoints = team2.players.reduce((total, player) => total + player.bowlingPoints, 0);
    let team2TotalPoints = team2BattingPoints + team2BowlingPoints;
    let totalRuns2 = team2.players.reduce((sum, player) => sum + player.runs, 0);
    let totalWickets2 = team2.players.reduce((sum, player) => sum + player.wickets, 0);

    team2Summary.innerHTML += `<h4>${teamName[1]} Players</h4>`;
    team2Summary.innerHTML += `<p>Total Points: ${team2TotalPoints}</p>`;
    team2Summary.innerHTML += `<p>Total Runs: ${totalRuns2}, Total Wickets: ${totalWickets2}</p>`;

    team2.players.forEach((player) => {
        team2Summary.innerHTML += `<p>${player.name} - 
                Runs: ${player.runs}, 
                Balls Played: ${player.balls}, 
                Wickets: ${player.wickets}, 
                Bowling Points: ${player.bowlingPoints}, 
                Batting Points: ${player.battingPoints}</p>`;
    });

    if (team1TotalPoints > team2TotalPoints) {
        result.innerHTML = `<h4>Result: ${teamName[0]} wins!</h4>`;
    } else if (team1TotalPoints < team2TotalPoints) {
        result.innerHTML = `<h4>Result: ${teamName[1]} wins!</h4>`;
    } else {
        result.innerHTML = "<h4>Result: It's a tie!</h4>";
    }
}