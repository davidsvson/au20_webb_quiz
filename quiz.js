// 1 skickae en request
// 2 parsa json
// 3 visa upp frågorna

const apiUrl = 'https://opentdb.com/api.php?amount=15&category=23&difficulty=medium';

let button = document.querySelector('#fetch');

button.addEventListener('click', async e => {
    console.log('1. button pressed');

    const response =  await fetch(apiUrl);
    console.log('2. got respnse', response);

    const data = await response.json();

    console.log('3. got data: ', data);

    let allQuestions = data.results;
    let questionContainer = document.querySelector('#questions');
    allQuestions.forEach(q => {
        let element = createQuestionElement(q);
        questionContainer.appendChild(element);
    });
})


function createQuestionElement(question) {
    let questionElement = document.createElement('div');
    questionElement.className = 'question';

    let questionHeading = document.createElement('h2'); 
    questionHeading.innerHTML = question.question;
    questionElement.appendChild(questionHeading);

    let options = question.incorrect_answers; //[ ...question.incorrect_answers, question.correct_answer ];
    //todo: shuffle
    let randomIndex = Math.floor(Math.random() * options.length+1); 
    options.splice(randomIndex, 0, question.correct_answer);

    options.forEach( option => {
        let optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = option;

        optionElement.addEventListener('click', e => {
            console.log('You chose: ' + option);
            if( option === question.correct_answer ) {
                console.log('Correct');
                optionElement.classList.add('correct');
            } else {
                console.log('Incorrect');
                optionElement.classList.add('incorrect');
            }

        })

        questionElement.appendChild(optionElement);
    } )


    return questionElement;
}