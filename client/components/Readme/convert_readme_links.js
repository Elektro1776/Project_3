

const psuedoResponse = `# Flashcard-Fun

FlashCard-Fun is designed to be a web-based application that helps users to learn information in an interactive and fun manner. Users are required to sign up with a username and password so that their created cards can be saved and can be reviewed at their leisure.

![Shot1](readmeimages/shot1.png)

## Creating Cards

Once a user logs in they are started on the create cards screen.  Here users create a front and a back for two different types of flash cards.  The first type is a basic card. This is kind of a freedom card because it basically allows you to put anything for a question and anything for an answer. The second type of card is a cloze card or a fill in the blank card.  This requires that the exact phrase you want removed from the question is entered as the back of the card.  Each time a user creates a card you can see it populate in the sidebar to the left, which contains all created cards.

![Shot2](readmeimages/shot2.png)

## Reviewing Cards

There are two ways to review cards.  Click the review cards on the create card screen.  This will start the user with the first card in the first group.  You can also click on any card in the sidebar to review that card.  Once you are reviewing a card from that screen you are able to review previous or next cards or simply click the card in the card sidebar to review it.

![Shot3](readmeimages/shot3.png)

## Version 2 aspirations
Some of the aspirations for Version 2 of this app would be, collapsing groups for better organization.  Click on group headers to start reviewing that group, delete card button on both the display card screen in addition to the card sidebar. Also, have a checkbox when creating a cards to determine whether the user simply wants to review data in a traditional flash card manner or if they want to attempt to input the correct answer.

## Technologies Used
* Html
* Bootstrap
* Css
* Animate Css
* Firebase
* Photoshop
* Javascript
* JQuery`;


function convertLinks(string, user, repo) {
  const userName = user;
  const repoName = repo;
  const newLink = `https://raw.githubusercontent.com/${userName}/${repoName}/master/`;

  // Finding the matched phrases and pushing them to an array
  const str = string;
  const regExp = /\(([^)]+)\)/g;
  let match = [];
  const matches = [];
  while ((match = regExp.exec(str)) !== null) {
    matches.push(match[1]);
  }
  // console.log('Here are our matches', matches);

let newLinkArray = [];
// Map the array calling the function that determines if the link needs to be changed
matches.map((stringInput) => {
  if (stringInput.includes('.') && !stringInput.includes('http')) {
    newLinkArray.push(`(${newLink}${stringInput})`);
  }
  else {
    newLinkArray.push(`(${stringInput})`);
  }
});
// console.log('here is a new link array', newLinkArray);
//Create a recursive function that calls itself the number of iterations equal to length of array and replaces each instance?
let cycles = newLinkArray.length;
let index = 0;
let matchRep = str;
function replaceLinks() {
  if (cycles === 0) {
    //console.log(matchRep);
    return matchRep;
  }
  else {
    //replacing the string
    matchRep = matchRep.replace(`(${matches[index]})`, newLinkArray[index]);
    cycles --;
    index++;
    replaceLinks();
  }
};
replaceLinks();
};
var newReadme = convertLinks(psuedoResponse, '901david', 'Flashcard-Fun');
console.log(newReadme);
