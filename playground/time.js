var moment = require ('moment');

// Jan 1st 1970 00:00:00 am

var date = moment();
date.add(30,'day');
console.log(date.format('MMM Do YYYY, hh:MM a'));