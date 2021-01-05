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

searchBar.addEventListener('keyup', (e) => {
  resultsList.textContent = '';
  const searchValue = e.target.value.toLowerCase();
  filteredShows = showAPI.filter( show => {
    return show.name.toLowerCase().includes(searchValue);
  })

  for(i = 0; i<10; i++){
      const newListItem = document.createElement("li");
      newListItem.classList.add(`list-item-${i}`)
      resultsList.appendChild(newListItem);
      const newListItemName = document.createElement("p");
      newListItemName.innerHTML = filteredShows[i].name;
      const currentListItem = document.getElementsByClassName(`list-item-${i}`);
      currentListItem[0].appendChild(newListItemName);
  }
})