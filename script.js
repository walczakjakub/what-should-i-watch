//FILTERS DISPLAY
const filtersButton = document.querySelector("#filters-button");
const filtersContainer = document.querySelector("#filters-container");

filtersButton.addEventListener('click', () => {
  if(filtersContainer.style.display !== 'block') {
    filtersContainer.style.display = 'block';
  } else {
    filtersContainer.style.display = 'none';
  }
})

//FETCH API
let showAPI = [];
let pageNum = 0;

for(j = 1; j < 210; j++){
  

  fetch(`https://api.tvmaze.com/shows?page=${pageNum}`)
  .then(res => {
    return res.json()
  })
  .then(res => {
    for(i = 0; i < res.length; i++) {
      showAPI.push((res[i]))
    }
  })
  .catch(err => {
    console.log('err');
  })

  pageNum = pageNum + 1;
}

//SEARCH BAR

const searchBar = document.getElementById("search-bar");
const resultsList = document.getElementById("results-list");
let filteredShows = [];

function createDiv(el, className) {
  const newElement = document.createElement(el);
  newElement.classList.add(className);
  return newElement;
}

function createResultDiv() {
  const listItem = createDiv('li', 'list-item');
  resultsList.appendChild(listItem);

  const listItemTitle = createDiv('h2', 'list-item-title');
  listItem.appendChild(listItemTitle);

  const listItemInfo = createDiv('div', 'list-item-info');  
  listItem.appendChild(listItemInfo);

  const listItemImg = createDiv('img', 'list-item-img');  
  listItemInfo.appendChild(listItemImg);

  const listItemSummary = createDiv('p', 'list-item-summary');  
  listItemInfo.appendChild(listItemSummary);
  
  return listItem;
}

searchBar.addEventListener('keyup', (e) => {
  resultsList.textContent = '';
  const searchValue = e.target.value.toLowerCase();
  filteredShows = showAPI.filter( show => {
    return show.name.toLowerCase().includes(searchValue);
  })

  if(searchValue === ''){
    filteredShows = [];
  }

  for(i = 0; i<10; i++){
    if(typeof filteredShows[i] !== 'undefined') {
      const newResult = createResultDiv();
      const newResultTitle = newResult.getElementsByClassName('list-item-title');
      newResultTitle[0].innerHTML = filteredShows[i].name;

      const newResultImg = newResult.getElementsByClassName('list-item-img');
      newResultImg[0].src = filteredShows[i].image.original;

      const newResultSummary = newResult.getElementsByClassName('list-item-summary');
      newResultSummary[0].innerHTML = filteredShows[i].summary;
    }      
  }
})