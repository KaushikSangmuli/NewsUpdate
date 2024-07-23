const search = document.querySelector("#navbar-search")   //search Input
const searchIcon = document.querySelector(".search-icon")  //search Icon
const apiKey = "816de7f1ec5e425bbbde4e0ce30d613e"
let apiUrl = `https://newsapi.org/v2/everything?q=india&apiKey=816de7f1ec5e425bbbde4e0ce30d613e&language=en&sortBy=publishedAt`
const description = document.querySelector("#news-description")
const newsContainer = document.querySelector(".news-container")
const rightSection = document.querySelector(".right-section")
const paginationContainer = document.getElementById('pagination-container');
isEverything=true;
isBreakingNews = false

const today = new Date()
const date = today.getDate()
const month = today.getMonth()
const year = today.getFullYear()
const presentday = `${year}-${month}-${date}`
const yesterday = `${year}-${month}-${date-1}`

let userSearch ;
const itemsPerPage = 8;
let currentPage = 1;
let collection = [];

searchIcon.addEventListener("click", ()=>{
  isBreakingNews = false
  isEverything= true
    if (search.value){
        userSearch  = search.value
    } else {
        userSearch = "india"
    }
    console.log(userSearch)
    apiUrl = `https://newsapi.org/v2/everything?q=${userSearch}&apiKey=816de7f1ec5e425bbbde4e0ce30d613e&language=en&sortBy=relevancy`
    fetching()    
})
const categoryImages = document.querySelectorAll(".category")
categoryImages.forEach(selectedImage =>{
  selectedImage.addEventListener("click", ()=>{
    isEverything = false
    isBreakingNews = true
    const selectedCategory = selectedImage.getAttribute("category-data")
    console.log(selectedCategory)
    apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=816de7f1ec5e425bbbde4e0ce30d613e&category=${selectedCategory}&pageSize=100&from=${yesterday}&to=${presentday}`
    fetching()
  })
})


function fetching(){
  
    fetch(apiUrl)
    .then(res=>res.json())
    .then(data=> data.articles)
    .then(data=>{
    collection = data
    renderPage(currentPage);
    createPaginationButtons();
})
}
fetching()

function renderPage(page) {
    newsContainer.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = collection.slice(start, end);

    pageData.forEach(item => {
      const news = document.createElement("div");
      console.log(item)

      // Clean the content
      
      if(isEverything){
      news.innerHTML = `
      <div class="news">
      <div class="left-section">
      <img src="${item.urlToImage}" alt="SHOWING IMAGE">
          </div>
          <div class="right-section visible">
            <h4 class="heading">${item.title}</h4>
            <span class="publish-details">Published by: ${item.author} / ${item.publishedAt}</span>
            <span class="description">${item.description}</span>
            <p id="news-content">${item.content}</p>
          </div>
        </div>
      `;}
      if(isBreakingNews){
        news.innerHTML = `
      <div class="news">
      
          <div class="right-section visible">
            <h3 class="heading">${item.title}</h3>
            <h4 class="publish-details">Published by: ${item.author} / ${item.publishedAt}</h4>
          </div>
        </div>
      `;
      }

      newsContainer.appendChild(news);
    });
  }

  function createPaginationButtons() {
    const totalPages = Math.ceil(collection.length / itemsPerPage);
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
     
      button.innerText = i;

      if (i === currentPage) {
        button.classList.add('active');
      }
      button.addEventListener('click', () => {
        currentPage = i;
        renderPage(currentPage);
        updateActiveButton()
      });
      paginationContainer.appendChild(button);
    }
  }

  function updateActiveButton() {
    
    const buttons = paginationContainer.getElementsByTagName('button');
    for (let button of buttons) {
      button.classList.remove('active');
    }
    buttons[currentPage - 1].classList.add('active');
  }


const leftScroll = document.querySelector("#left")  
const rightScroll = document.querySelector("#right") 
let count = 1

rightScroll.addEventListener("click",()=>{
  if (count<7){
    count++
  }
  let getting = document.getElementById(`${count}`)
  getting.scrollIntoView({behavior:"smooth" ,inline:"center" })
  console.log(count, getting)
  
})



leftScroll.addEventListener("click",()=>{
  if (count>1){
    count--
  }
  let getting = document.getElementById(`${count}`)
  getting.scrollIntoView({behavior:"smooth" ,inline:"center" })
  console.log(count, getting)

})

const dotting = document.querySelectorAll(".dotting")
dotting.forEach((dot , index) =>{
  dot.addEventListener("click", ()=>{
    
    num= index+1
    let getting = document.getElementById(`${num}`)
    getting.scrollIntoView({behavior:"smooth" ,inline:"center" })
    console.log(getting, index,dot)
  })
})



