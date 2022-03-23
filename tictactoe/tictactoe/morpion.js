/* global playerName1:writable, playerName2:writable, winner:writable */

const randomBoolean = Math.random() < 0.5;

const game = {

    player_1: [],
    player_2: [],
    player_1_Turn: randomBoolean,

    // combination of the possibilities to win the game
    winPossibilities: [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],
        ['2', '5', '8'],
        ['1', '4', '7'],
        ['0', '3', '6'],
        ['0', '4', '8'],
        ['2', '4', '6'],
        ['2', '4', '6'],
    ],
};

function validateForm(e) {
    e.preventDefault();
    playerName1 = document.querySelector('.p1').value;
    playerName2 = document.querySelector('.p2').value;
    document.querySelector('.user1').innerHTML = playerName1;
    document.querySelector('.user2').innerHTML = playerName2;
    const name = document.querySelectorAll('.player');

    if (name[0].value === '' || name[0].value.length < 6 || name[1].value === '' || name[1].value.length < 6 || playerName1 === playerName2) {
        const xo = document.querySelectorAll('.xo');
        let i;
        for (i = 0; i < xo.length; i += 1) {
            xo[i].style.color = '#FD668D';
        }

        const enterName = document.querySelectorAll('.error');
        let x;
        for (x = 0; x < enterName.length; x += 1) {
            enterName[x].innerHTML = 'please enter a name';
            console.log(name[x]);
            if (playerName1 === playerName2) {
                enterName[x].innerHTML = 'names are the same';
            } else if (name[x].value.length < 6) {
                enterName[x].innerHTML = '6 characters minimum';
            }
        }
    } else {
        document.querySelector('.wrapper-player').style.display = 'none';
        document.getElementById('first-turn').innerHTML = game.player_1_Turn ? `${playerName1}` : `${playerName2}`;
        document.querySelector('.whoBegin').style.display = 'flex';
        document.querySelector('.whoBegin').classList.add('animFirstTurn');
    }
}

document.getElementById('formAction').addEventListener('submit', (e) => validateForm(e));

const toAdd = document.createDocumentFragment();
const toAdd1 = document.createDocumentFragment();
const toAdd2 = document.createDocumentFragment();

function scoreBoard(key = null) {
    if (key == null) {
        let i;
        for (i = 0; i < localStorage.length; i += 1) {
            key = localStorage.key(i);
            const newDiv = document.createElement('div');
            newDiv.id = [key];
            newDiv.className = 'scoreBlock';
            toAdd.appendChild(newDiv);
            document.querySelector('.score').appendChild(toAdd);
            document.getElementById([key]).innerHTML = key;

            const newDivSecond = document.createElement('div');
            newDivSecond.id = [key];
            newDivSecond.className = 'cardGradient';
            toAdd1.appendChild(newDivSecond);
            document.getElementById([key]).appendChild(toAdd1);
            const test2 = localStorage.getItem(key);
            const d2 = test2.replace(`${localStorage.getItem(key)}`, `${localStorage.getItem(key)[0]}`);
            document.getElementsByClassName('cardGradient')[key].innerHTML += d2;

            const newDivThird = document.createElement('div');
            newDivThird.id = [key];
            newDivThird.className = 'dateWin';
            toAdd2.appendChild(newDivThird);
            document.getElementById([key]).appendChild(toAdd2);
            const test = localStorage.getItem(key);
            const d1 = test.replace(`${localStorage.getItem(key)[0]},`, '');
            document.getElementsByClassName('dateWin')[key].innerHTML += d1;
        }
    } else {
        const newDiv = document.createElement('div');
        newDiv.id = [key];
        newDiv.className = 'scoreBlock';
        toAdd.appendChild(newDiv);
        document.querySelector('.score').insertBefore(toAdd, document.querySelector('.score').firstChild);
        document.getElementById([key]).innerHTML = key;

        const newDivSecond = document.createElement('div');
        newDivSecond.id = [key];
        newDivSecond.className = 'cardGradient';
        toAdd1.appendChild(newDivSecond);
        document.getElementById([key]).appendChild(toAdd1);
        const test2 = localStorage.getItem(key);
        const d2 = test2.replace(`${localStorage.getItem(key)}`, `${localStorage.getItem(key)[0]}`);
        document.getElementsByClassName('cardGradient')[key].innerHTML += d2;

        const newDivThird = document.createElement('div');
        newDivThird.id = [key];
        newDivThird.className = 'dateWin';
        toAdd2.appendChild(newDivThird);
        document.getElementById([key]).appendChild(toAdd2);
        const test = localStorage.getItem(key);
        const d1 = test.replace(`${localStorage.getItem(key)[0]},`, '');
        document.getElementsByClassName('dateWin')[key].innerHTML += d1;
    }
}

function setGradient() {
    let i;
    const colors = [
        ['#4F87E5', '#3895e8', '#31aee6', '#46B9E2'],
        ['#88F3B2', '#7df3ba', '#67f3c9', '#5CF3D1'],
        ['#F994DD', '#fe88b3', '#fb84a0', '#F5828D'],
        ['#F09B75', '#f48e71', '#f5887d', '#F58282'],
    ];
    const boxes = document.querySelectorAll('.cardGradient');
    for (i = 0; i < boxes.length; i += 1) {
        const colorIndex = colors[Math.floor(Math.random() * colors.length)];
        boxes[i].style.background = 'linear-gradient(to top, '+ colorIndex[0] +', '+ colorIndex[1] +', '+ colorIndex[2] +', '+ colorIndex[3] +')';
    }
}

// if player click on case

document.addEventListener('click', (event) => {
    const clickInCell = event.target;
    const cellEmpty = clickInCell.classList.contains('case');
    const unhauthorized = clickInCell.classList.contains('unhauthorized');

    // verify if the cell is empty to put an object

    if (cellEmpty && !unhauthorized) {
        const cellValue = clickInCell.dataset.value;
        let i;
        if (game.player_1_Turn === true) {
            game.player_1.push(cellValue);
            if (document.getElementById('h').classList.contains('case')) {
                for (i = 0; i < document.getElementsByClassName('p1').length; i += 1) {
                    document.getElementsByClassName('turnP1')[i].style.backgroundColor = '#fbe34f';
                }
            }
        } else {
            game.player_2.push(cellValue);
            if (document.getElementById('h').classList.contains('case')) {
                for (i = 0; i < document.getElementsByClassName('p2').length; i += 1) {
                    document.getElementsByClassName('turnP2')[i].style.backgroundColor = '#fbe34f';
                }
            }
        }

        clickInCell.classList.add('unhauthorized');
        clickInCell.classList.add(game.player_1_Turn ? 'p1' : 'p2');
        game.player_1_Turn = !game.player_1_Turn;
    }

    // check if all unhautohorised are presents
    const caseLength = document.querySelectorAll('.case:not(.unhauthorized)').length;

    if (!caseLength) {
        document.querySelector('.win-game').classList.add('visible');
        document.querySelector('.message').textContent = 'End of game';
        document.querySelector('.bottom_wrapper').style.display = 'flex';
    }

    // parcourir le tableau pour gagner
    // soit le joueur 1, soit le joueur 2

    game.winPossibilities.forEach((winPossibilities) => {
        // vérifie la condition pour le joueur 1
        const PLAYER_1_WIN = winPossibilities.every((state) => game.player_1.includes(state));
        // vérifie la condition pour le joueur 2
        const PLAYER_2_WIN = winPossibilities.every((state) => game.player_2.includes(state));

        if (PLAYER_1_WIN || PLAYER_2_WIN) {
            document.querySelectorAll('.case').forEach((cell) => cell.classList.add('unhauthorized'));
            document.querySelector('.win-game').classList.add('visible');
            winner = document.querySelector('.message').textContent = PLAYER_1_WIN ? `${playerName1} win` : `${playerName2} win`;
            document.querySelector('.bottom_wrapper').style.display = 'flex';
            const keyName = winner.replace('win', '');
            const counter = localStorage.getItem(`${keyName}`);
            if (counter !== null) {
                localStorage.setItem(`${keyName}`, [parseInt(counter, 10) + 1, new Date().toLocaleString()]);
                localStorage.getItem(keyName);
                localStorage.getItem(keyName)[0];
            } else {
                localStorage.setItem(`${keyName}`, [1, new Date().toLocaleString()]);
                localStorage.getItem(keyName);
                localStorage.getItem(keyName)[0];
            }

            game.player_1 = [];
            game.player_2 = [];
            scoreBoard(`${keyName}`);
            setGradient();
        }
    });
});

function restart() {
    document.querySelector('.restart').addEventListener('click', () => {
        document.querySelector('.win-game').classList.remove('visible');
        document.querySelectorAll('.case').forEach((cell) => {
            cell.classList.remove('unhauthorized', 'p1', 'p2');
        });

        window.location.reload();
        game.player_1_Turn = randomBoolean;
        game.player_1 = [];
        game.player_2 = [];
        document.querySelectorAll('.user').innerHTML = '';
        document.querySelector('.p1').value = '';
        document.querySelector('.p2').value = '';
    });
}

function displayBlock() {
    const x = document.querySelector('.wrapper-player');
    if (window.getComputedStyle(x).display === 'flex') {
        document.querySelector('.bottom_wrapper').style.display = 'none';
    }
}

window.onload = scoreBoard(); setGradient(); displayBlock();
restart();
