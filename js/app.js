'use strict';

let results = document.getElementById('results');
let testQuarryContainer = document.getElementById('testQuarryContainer');
let getResults = document.getElementById('getResults');

let maxVotes = 25;
let userVotes = 0;
let imgShow = 3;
let checkPreviouslyShown = [];

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
  // let checkShown = CheckShown();
  while (allProducts[productRand].checkCurrentlyShown === 1 || allProducts[productRand] === checkPreviouslyShown[0] || allProducts[productRand] === checkPreviouslyShown[1] || allProducts[productRand] === checkPreviouslyShown[2]) {
    productRand = Math.floor(Math.random() * allProducts.length);
    // checkShown = CheckShown();
  }
  allProducts[productRand].checkCurrentlyShown = 1;
  return productRand;
}

//Classes
function Product(name, id, timesSelected = 0, timesShown = 0, extension = 'jpg') {
  this.name = name;
  this.extension = extension;
  this.src = `img/${this.name}.${this.extension}`;
  this.timesShown = timesShown;
  this.timesSelected = timesSelected;
  this.id = id;
  this.checkCurrentlyShown = 0;
}

// function CheckShown() {
//   for (let i = 0; i < allProducts.length; i++) {
//     for (let l = 0; l < imgShow; l++) {
//       if (allProducts[i].id === allProducts[checkPreviouslyShown[l].id]) {
//         console.log(1);
//         return 1;
//       }
//     }
//   }
// }

let bag = new Product('bag', 0);
let banana = new Product('banana', 1);
let bathroom = new Product('bathroom', 2);
let boots = new Product('boots', 3);
let breakfast = new Product('breakfast', 4);
let bubblegum = new Product('bubblegum', 5);
let chair = new Product('chair', 6);
let cthulhu = new Product('cthulhu', 7);
let dogDuck = new Product('dog-duck', 8);
let dragon = new Product('dragon', 9);
let pen = new Product('pen', 10);
let petSweep = new Product('pet-sweep', 11);
let scissors = new Product('scissors', 12);
let shark = new Product('shark', 13);
let sweep = new Product('sweep', 14, 0, 0, 'png');
let tauntaun = new Product('tauntaun', 15);
let unicorn = new Product('unicorn', 16);
let water = new Product('water-can', 17);
let wine = new Product('wine-glass', 18);

let allProducts = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, water, wine];

//rendering
function renderQuarry() {
  let tempArray = [];
  for (let i = 0; i < imgShow; i++) {
    let renderItem = randomProduct()
    tempArray[i] = allProducts[renderItem]
    checkPreviouslyShown[i] = allProducts[renderItem];
    elementMaker('img', '', testQuarryContainer, 'src', allProducts[renderItem].src, 'alt', allProducts[renderItem].name)
    allProducts[renderItem].timesShown++;
    allProducts[renderItem].checkCurrentlyShown = 0;
  }
}

function renderDataGraph() {
  let renderLabelArray = []
  for (let i = 0; i < allProducts.length; i++) {
    renderLabelArray[i] = allProducts[i].name;
  }
  const labels = renderLabelArray;

  let renderTimesShownArray = []
  for (let i = 0; i < allProducts.length; i++) {
    renderTimesShownArray[i] = allProducts[i].timesShown;
  }
  let renderTimesSelectedArray = []
  for (let i = 0; i < allProducts.length; i++) {
    renderTimesSelectedArray[i] = allProducts[i].timesSelected;
  }
  
  const data = {
    labels: labels,
    datasets: [{
      label: 'Clicks',
      backgroundColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)',
      data: renderTimesSelectedArray,
    }, {
      label: 'Views',
      backgroundColor: 'rgb(0, 255, 0)',
      borderColor: 'rgb(255, 99, 132)',
      data: renderTimesShownArray,
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}

function renderResults() {
  console.log(localStorage);
  // getProductInfo();
  for (let i = 0; i < allProducts.length; i++) {
    elementMaker('li', `${allProducts[i].name} had ${allProducts[i].timesShown} views and was selected ${allProducts[i].timesSelected} times`, results,)
  }
  renderDataGraph();
  storeProductInfo();
}

//handler
function handleClick(event) {
  event.preventDefault();
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

getProductInfo();
renderQuarry();
// localStorage.clear();


function storeProductInfo() {
  let packedProducts = JSON.stringify(allProducts);
  localStorage.setItem('products', packedProducts);
}

function getProductInfo() {
  console.log(localStorage);
  let potentialData = localStorage.getItem('products');
  if (potentialData) {
    let unpackedProducts = JSON.parse(potentialData);
    for (let product of unpackedProducts) {
      let name = product.name;
      let id = product.id;
      let extension = product.extension;
      let timesSelected = product.timesSelected;
      let timesShown = product.timesShown;
      let test = new Product(name, id, timesSelected, timesShown, extension);
      allProducts.splice(id, 1, test);
    }
  }

}
