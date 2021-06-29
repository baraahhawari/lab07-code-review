'use strict';

// alert('hello js');

// global array for the working hours
const workingHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// Global Function Random number btw 2 values
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// Global array that contain all the created objects
let shopsArray = [];

// constructor Function
function Shops(locationName, minCustomers, maxCustomers, avgCookies) {
    this.locationName = locationName;
    this.minCustomers = minCustomers;
    this.theMaximum = maxCustomers;
    this.avgCookies = avgCookies;


    // empty array to hold the random # of customers each hour
    this.customersEachHour = [];

    // empty array to hold the random # of sales each hour
    this.cookiesEachHour = [];

    this.totalCookiesPerDay = 0;
    shopsArray.push(this);

}


Shops.prototype.calcCustomersEachHour = function() {

    for (let i = 0; i < workingHours.length; i++) {
        this.customersEachHour.push(random(this.minCustomers, this.theMaximum));
    }
}

Shops.prototype.calcCookiesEachHour = function() {
    for (let i = 0; i < workingHours.length; i++) {
        this.cookiesEachHour.push(Math.floor(this.avgCookies * this.customersEachHour[i]));
        // this.total += this.cookiesEachHour[i];
        this.totalCookiesPerDay += this.cookiesEachHour[i];
    }
}

let seattle = new Shops('Seattle', 23, 65, 6.3);
let tokyo = new Shops('Tokyo', 3, 24, 1.2);
let dubai = new Shops('Dubai', 11, 38, 3.7);
let paris = new Shops('Paris', 20, 38, 2.3);
let lima = new Shops('Lima', 2, 16, 4.6);
// seattle.calcCustomersEachHour()
// seattle.calcCookiesEachHour();

console.log(shopsArray);

// render function
// 1. header rendering global function

// getting the element from the html page
let parent = document.getElementById('results');
console.log(parent);

// creating a table
let tableElement = document.createElement('table');
parent.appendChild(tableElement);

function makeHeader() {
    // create header tr
    let headerRow = document.createElement('tr');
    tableElement.appendChild(headerRow);

    // create th
    let firstTh = document.createElement('th');
    headerRow.appendChild(firstTh);
    firstTh.textContent = 'Name';

    // hours 
    for (let i = 0; i < workingHours.length; i++) {
        // looping through the hours array
        let thElement = document.createElement('th');
        headerRow.appendChild(thElement);
        thElement.textContent = workingHours[i];
    }

    // create th
    let lastTh = document.createElement('th');
    headerRow.appendChild(lastTh);
    lastTh.textContent = 'Daily Location Total';

}
// do not forget to call the function
makeHeader();


// 2. prototype function
Shops.prototype.render = function() {
    let dataRow = document.createElement('tr');
    tableElement.appendChild(dataRow);

    // name data
    let nameData = document.createElement('td');
    dataRow.appendChild(nameData);
    nameData.textContent = this.locationName;

    // cookies data
    for (let i = 0; i < workingHours.length; i++) {
        let tdElement = document.createElement('td');
        dataRow.appendChild(tdElement);
        tdElement.textContent = this.cookiesEachHour[i];
    }

    let totalDailyForEachShop = document.createElement('td');
    dataRow.appendChild(totalDailyForEachShop);
    totalDailyForEachShop.textContent = this.totalCookiesPerDay;
}


// for loop to call the functions
for (let i = 0; i < shopsArray.length; i++) {
    shopsArray[i].calcCustomersEachHour();
    shopsArray[i].calcCookiesEachHour();
    shopsArray[i].render();
}


// 3. global function to create the footer

function makeFooter() {
    let footerRow = document.createElement('tr');
    tableElement.appendChild(footerRow);

    let footerTh = document.createElement('th');
    footerRow.appendChild(footerTh);
    footerTh.textContent = 'Totals';

    // total in the footer
    // nested for loop
    let megaTotal = 0;
    for (let i = 0; i < workingHours.length; i++) {
        let totalEachHour = 0;
        for (let j = 0; j < shopsArray.length; j++) {

            totalEachHour += shopsArray[j].cookiesEachHour[i];
            // megaTotal +=shopsArray[j].cookiesEachHour[i];
        }
        megaTotal += totalEachHour;
        // console.log(totalEachHour);
        let footerData = document.createElement('td');
        footerRow.appendChild(footerData);
        footerData.textContent = totalEachHour;

    }
    console.log(megaTotal);

    let finalTd = document.createElement('td');
    footerRow.appendChild(finalTd);
    finalTd.textContent = megaTotal;
}

makeFooter();