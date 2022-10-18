'use strict';

let results = document.getElementById('results');
let testQuarryContainer = document.getElementById('testQuarryContainer');
let getResults = document.getElementById('getResults');

let maxVotes = 25;
let userVotes = 0;
let imgShow = 3;

//Helper Functions
function elementMaker(newEl, content, parent, attribute1, attributeName1, attribute2, attributeName2) {
  let title = document.createElement(newEl);
  title.textContent = content;
  title.setAttribute(attribute1, attributeName1);
  title.setAttribute(attribute2, attributeName2);
  parent.appendChild(title);
}

function randomProduct() {
  let productRand = Math.floor(Math.random() * allProducts.length);
  while (allProducts[productRand].checkCurrentlyShown === 1) {
    productRand = Math.floor(Math.random() * allProducts.length);
  }
  allProducts[productRand].checkCurrentlyShown = 1;
  // console.log(allProducts[productRand].checkCurrentlyShown);
  return productRand;
}

//Classes
function Product(name, extension = 'jpg') {
  this.name = name
  this.extension = extension
  this.src = `img/${this.name}.${this.extension}`
  this.timesShown = 0;
  this.timesSelected = 0;
  this.checkCurrentlyShown = 0;
}

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let water = new Product('water-can');
let wine = new Product('wine-glass');

let allProducts = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, water, wine];

//rendering
function renderQuarry() {
  let tempArray = [];
  for (let i = 0; i < imgShow; i++) {
    let renderItem = randomProduct()
    tempArray[i] = allProducts[renderItem]
    elementMaker('img', '', testQuarryContainer, 'src', allProducts[renderItem].src, 'alt', allProducts[renderItem].name)
    allProducts[renderItem].timesShown++;
  }
  for (let i = 0; i < tempArray.length; i++) {
    tempArray[i].checkCurrentlyShown = 0;
  }
}

function renderResults() {
  for (let i = 0; i < allProducts.length; i++) {
    elementMaker('li', `${allProducts[i].name} had ${allProducts[i].timesShown} views and was selected ${allProducts[i].timesSelected} times`, results,)
  }
}

function handleClick(event) {
  if (event.target === testQuarryContainer) {
    alert('Please click on an image')
    return;
  }
  userVotes++;
  for (let i = 0; i < allProducts.length; i++) {
    if (event.target.alt === allProducts[i].name) {
      allProducts[i].timesSelected++;
      break;
    }
  }
  if (userVotes === maxVotes) {
    testQuarryContainer.removeEventListener('click', handleClick);
    getResults.className = 'clicks-allowed';
    getResults.addEventListener('click', renderResults)
  } else {
    while (testQuarryContainer.firstChild) {
      testQuarryContainer.removeChild(testQuarryContainer.firstChild);
    }
    renderQuarry();
  }
}

testQuarryContainer.addEventListener('click', handleClick);

renderQuarry();
