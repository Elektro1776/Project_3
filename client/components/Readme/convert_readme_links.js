

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
    if(!stringInput.includes('./')){
    newLinkArray.push(`(${newLink}${stringInput})`);
    }
    else {
      newLinkArray.push(`(${newLink}${stringInput.replace('./', '')})`);
    }
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
    console.log('I have finished your request');

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
return matchRep;
};

export default convertLinks;
