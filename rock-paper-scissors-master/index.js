const ROCK_PAPER_STORAGE = "rock-paper";

const listPlayableOptions = $(".list-playable-options");
const playableOptions = $(".playable-options .playable-option");
const counterScore = $(".score>span");
const results = $(".results");
const buttonPlayAgain = $("#playAgain")

//modal variables
const buttonRules = $("#rules");
const modalRules = $(".modal");
const overlayModalRules = $("#overlay");
const btnCloseModalRules = $("#closeModal");

//modal start
const toggleModal = () => {
    overlayModalRules.toggle();
    modalRules.toggle();
}

btnCloseModalRules.on('click', () => toggleModal());
buttonRules.on('click', () => toggleModal());
overlayModalRules.on('click', () => toggleModal());
//modal end

const updateScore = (result) => {

    switch (result) {
        case 'win':
            let currentScore = localStorage.getItem(ROCK_PAPER_STORAGE) | 0;
            localStorage.setItem(ROCK_PAPER_STORAGE, ++currentScore);
            break;
        case 'lose':
            localStorage.setItem(ROCK_PAPER_STORAGE, 0);
            break;
        default:
            break;
    }

    loadScore();
}

const loadScore = () => {
    const currentScore = localStorage.getItem(ROCK_PAPER_STORAGE) | 0;
    counterScore.text(currentScore);
}

const selectedRandomOption = (yourSelectedOptionId,isBonusGame = false) => {
    const max = isBonusGame ? 4 : 2;
    const optionSelected = Math.floor(Math.random() * max);

    let options = ["paper","rock","scissors","lizard","spock"].filter(option => option != yourSelectedOptionId);
    return options[optionSelected];
}

const checkWinnerSide = (leftSideOption, rightSideOption) => {
    const leftSide = results.find('.left-side');
    const rightSide = results.find('.right-side');

    switch (leftSideOption) {
        case "paper":
            switch (rightSideOption) {
                case "rock":
                    return leftSide;
                case "scissors":
                    return rightSide;
                case "lizard":
                    return "lizard";
                case "spock":
                    return "spock";
                default:
                    return null;
            }
        case "rock":
            switch (rightSideOption) {
                case "paper":
                    return rightSide;
                case "scissors":
                    return leftSide;
                case "lizard":
                    return "lizard";
                case "spock":
                    return "spock";
                default:
                    return null;
            }
        case "scissors":
            switch (rightSideOption) {
                case "paper":
                    return leftSide;
                case "rock":
                    return rightSide;
                case "lizard":
                    return "lizard";
                case "spock":
                    return "spock";
                default:
                    return null;
            }
        case "lizard":
            return "lizard";
        case "spock":
            return "spock";
    }
}

playableOptions.on('click', (event) => {
    const yourSelectedOptionId = event.target.id;

    results.css('display', 'flex');
    listPlayableOptions.toggle();

    const yourPicked = results.find('.left-side .playable-option');
    yourPicked.prop('id', yourSelectedOptionId);

    const houseSelectedOptionId = selectedRandomOption(yourSelectedOptionId);

    setTimeout(() => {
        results.find('.right-side').find('.playable-option').removeClass('selecting').prop('id', houseSelectedOptionId).addClass('growing');
    }, 1500);

    setTimeout(() => {
        results.find('.right-side').addClass('translating')
        results.find('.left-side').addClass('translating')

        results.find('.left-side').one('animationend', () => {
            const winnerSide = checkWinnerSide(yourSelectedOptionId, houseSelectedOptionId);
            const middleSide = results.find('.middle-side');

            middleSide.css('display', 'flex');
            winnerSide.find('.playable-option').addClass('winner');
            if (winnerSide.hasClass('left-side')) {
                middleSide.find('h2').text('YOU WIN');
                updateScore('win');
            } else {
                middleSide.find('h2').text('YOU LOSE');
                updateScore('lose');
            }
        });

    }, 3200);
});

buttonPlayAgain.on('click', () => {
    results.hide();
    results.find('.middle-side').hide();
    results.find('.playable-option').removeClass('winner');
    results.find('.right-side').find('.playable-option').removeClass('growing').prop('id', '').addClass('selecting');
    results.find('.right-side').removeClass('translating');
    results.find('.left-side').removeClass('translating');
    listPlayableOptions.toggle();
});

loadScore();