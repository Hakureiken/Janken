// test du localstorage

let resumeScore = document.querySelector('#resumeScore');
if (localStorage.getItem("autosave")) {
    resumeScore.innerHTML = localStorage.getItem("autosave");
} else {
    resumeScore.innerHTML = 0
}

// déclaration des variables
let phaseOne = document.getElementById('phaseOne');
let phaseChoix = document.getElementById('phaseChoix');

// random du choix de l'ordinateur
let resumeScoreFinal
const choix = ['pierre', 'feuille', 'ciseaux']
let rand
let choixBot
console.log(typeof (parseInt(resumeScore.innerHTML, 10)));

function janken(id) {
    rand = Math.floor(Math.random() * choix.length);
    choixBot = choix[rand];
    resumeScoreFinal = parseInt(resumeScore.innerHTML, 10);

    // ici je fais décaler ma première div et la suivante de toute leurs largeur, ce qui a pour effet que la div phaseOne prend la place de la div phaseChoix
    phaseOne.style.transform = 'translateX(-100%)';
    phaseChoix.style.transform = 'translateX(-100%)';

    // ici je récupère le svg lié à mon choix dans le janken, le [1] c'est parce que j'ai indenté le code, donc le [0] et [2] sont considérés comme du texte
    let choixPhaseOne = document.getElementById(id);

    let yourChoice = document.getElementById('yourChoice')
    yourChoice.insertAdjacentHTML('afterbegin', choixPhaseOne.childNodes[1].innerHTML);

    // on ajoute la classe pour designer la nouvelle div en fonction du choix fait par le joueur

    let circleOne = document.getElementById('circleOne');
    circleOne.classList.add(`${id}One`);


    setTimeout(() => {

        // ici, nous allons designer/ajouter les classes pour le choix du bot de la phaseOne

        let empty = document.getElementById('empty');
        let emptySvg = document.getElementById('emptySvg');

        empty.classList.remove('empty');
        empty.classList.add('circle', 'scale', `${choixBot}One`);

        emptySvg.insertAdjacentHTML('afterbegin', document.getElementById(choixBot).childNodes[1].innerHTML);


        // ici on va check si le joueur ou le bot gagne au janken ou s'il y a draw et on va actualiser les points en direct.
        // le setTimeout est là pour mettre un delais avant la fonction à l'intérieur ne se fasse, permettant ainsi d'avoir comme un "temps" de reflexion pour le bot
        setTimeout(() => {

            // si le joueur clique sur pierre
            if (id === 'pierre') {
                if (choixBot === 'pierre') {
                    resumeScoreFinal = resumeScoreFinal;
                } else if (choixBot === 'ciseaux') {
                    resumeScoreFinal += 1;
                    circleOne.classList.add('shadowsWin')
                } else {
                    resumeScoreFinal -= 1;
                    empty.classList.add('shadowsWin')
                }
            }

            // si le joueur clique sur feuille
            if (id === 'feuille') {
                if (choixBot === 'feuille') {
                    resumeScoreFinal = resumeScoreFinal;
                } else if (choixBot === 'pierre') {
                    resumeScoreFinal += 1;
                    circleOne.classList.add('shadowsWin')
                } else {
                    resumeScoreFinal += -1;
                    empty.classList.add('shadowsWin')
                }
            }

            // si le joueur clique sur ciseaux
            if (id === 'ciseaux') {
                if (choixBot === 'ciseaux') {
                    resumeScoreFinal = resumeScoreFinal;
                } else if (choixBot === 'feuille') {
                    resumeScoreFinal += 1;
                    circleOne.classList.add('shadowsWin')
                } else {
                    resumeScoreFinal += -1;
                    empty.classList.add('shadowsWin')
                }
            }
            resumeScore.innerHTML = resumeScoreFinal;

            // on va créer et intégrer le boutton "replay" et tout ce qui sera lié à ce bouton

            let divBot = document.getElementById('divBot');
            divBot.insertAdjacentHTML('beforebegin', '<div id="remove"><button>Play again</button></div>');
            // on va reset certains paramètre si on veut rejouer (des classes à remove etc)
            document.querySelector('button').addEventListener('click', function reset() {
                circleOne.classList.remove('shadowsWin');
                empty.classList.remove('shadowsWin','circle', 'scale', `${choixBot}One`);
                empty.classList.add('empty');

                emptySvg.removeChild(document.querySelector('#emptySvg path'));
                yourChoice.removeChild(document.querySelector('#yourChoice path'));
                phaseOne.removeChild(document.getElementById('remove'));
                circleOne.classList.remove('ciseauxOne', 'pierreOne', 'feuilleOne');
                divBot.classList.remove('ciseauxOne', 'pierreOne', 'feuilleOne')
                phaseOne.style.transform = 'translateX(0%)';
                phaseChoix.style.transform = 'translateX(0%)';
            })



            // je stock la variable qui donne le score dans un localstorage, même si on ferme le navigateur on gardera le score !
            localStorage.setItem("autosave", resumeScoreFinal)
            
            return resumeScoreFinal;
        }, 2000
        )


    }, 3000)






}

