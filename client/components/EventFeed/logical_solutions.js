

export const convertDate = (date) => {
  Date.fromISO = (s) => new Date(s);
  const dateToConvert = Date.fromISO(date).toString().split(' ');
  const timeArray = dateToConvert[4].split(':');
  if (parseInt(timeArray[0]) === 12) {
      return `On ${dateToConvert[0]} ${dateToConvert[1]}-${dateToConvert[2]}-${dateToConvert[3]} at ${timeArray[0]}:${timeArray[1]}:${timeArray[2]} p.m.`;
  }
  if(parseInt(timeArray[0]) === 0) {
    return `On ${dateToConvert[0]} ${dateToConvert[1]}-${dateToConvert[2]}-${dateToConvert[3]} at 12:${timeArray[1]}:${timeArray[2]} a.m.`;
  }
  if (parseInt(timeArray[0]) < 13) {
    return `On ${dateToConvert[0]} ${dateToConvert[1]}-${dateToConvert[2]}-${dateToConvert[3]} at ${timeArray[0]}:${timeArray[1]}:${timeArray[2]} a.m.`;
  }
  if(parseInt(timeArray[0]) > 12) {
  const newTime = parseInt(timeArray[0]) - 12;
  return `On ${dateToConvert[0]} ${dateToConvert[1]}-${dateToConvert[2]}-${dateToConvert[3]} at ${newTime}:${timeArray[1]}:${timeArray[2]} p.m.`;

}
};

export const repoName = (repo)=> {
  const stringIndex = repo.indexOf('/');
  return repo.substr(stringIndex + 1, repo.length  - 1);

};
