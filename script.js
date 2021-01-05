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
let idArr = [];

for(j = 1; j < 210; j++){
  let pageNum = 0;

  fetch(`https://api.tvmaze.com/shows?page=${pageNum}`)
  .then(res => {
    return res.json()
  })
  .then(res => {
    for(i = 0; i < res.length; i++) {
      idArr.push((res[i].id))
    }
  })
  .catch(err => {
    console.log('err');
  })

  pageNum = pageNum + 1;
}

