const listPlayableOptions = $(".list-playable-options");
const playableOptions = $(".playable-options .playable-option");
const counterScore = $(".score>span");
const results = $(".results");

//modal variables
const rules = $("#rules");
const modalRules = $(".modal");
const overlayModalRules = $("#overlay");
const btnCloseModalRules = $("#closeModal");

//modal start
const toggleModal = () => {
    overlayModalRules.toggle();
    modalRules.toggle();
}

btnCloseModalRules.on('click', () => toggleModal());
rules.on('click', () => toggleModal());
overlayModalRules.on('click', () => toggleModal());
//modal end

const selectedRandomOption = (isBonusGame = false) => {

    const max = isBonusGame ? 5 : 3;
    const optionSelected = Math.floor(Math.random() * max);

    switch (optionSelected) {
        case 0:
            return "paper";
        case 1:
            return "rock";
        case 2:
            return "scissors";
        case 3:
            return "lizard";
        case 4:
            return "spock";
    }
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

    const houseSelectedOptionId = selectedRandomOption();
    results.find('.right-side').find('.playable-option').removeClass('selecting').prop('id', houseSelectedOptionId);

    const winnerSide = checkWinnerSide(yourSelectedOptionId, houseSelectedOptionId);

    const middleSide = results.find('.middle-side');
    middleSide.css('display', 'flex');
    if (!winnerSide) {
        middleSide.find('h2').text('DRAW');
        return;
    }

    winnerSide.find('.playable-option').addClass('winner');
    winnerSide.hasClass('left-side') ? middleSide.find('h2').text('YOU WIN') : middleSide.find('h2').text('YOU LOSE');
});