const search = document.querySelector("#navbar-search")   //search Input
const searchIcon = document.querySelector(".search-icon")  //search Icon
const apiKey = "d129931d418171fd6b73faf4ad15445f"
let apiUrl = `https://gnews.io/api/v4/search?q=india&apikey=${apiKey}&max=50`
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
    apiUrl = `https://gnews.io/api/v4/search?q=${userSearch}&apikey=${apiKey}&language=en&max=50`
    fetching()    
})
const categoryImages = document.querySelectorAll(".category")
categoryImages.forEach(selectedImage =>{
  selectedImage.addEventListener("click", ()=>{
    isEverything = false
    isBreakingNews = true
    const selectedCategory = selectedImage.getAttribute("category-data")
    apiUrl = `https://gnews.io/api/v4/top-headlines?apikey=${apiKey}&category=${selectedCategory}&language=en&max=50`
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
      

      // Clean the content
      
      if(isEverything){
      news.innerHTML = `
      <div class="news">
      <div class="left-section">
      <img src="${item.image}" alt="SHOWING IMAGE">
          </div>
          <div class="right-section visible">
            <h2 class="heading">${item.title}</h2>
            <span class="publish-details">Published at: ${item.publishedAt}</span>
            <span class="description dd">${item.description}</span>
            <p id="news-content">${item.content}</p>
          </div>
        </div>
      `;}
      if(isBreakingNews){
        news.innerHTML = `
      <div class="news">
          <div class="left-section">
      <img src="${item.image}" alt="SHOWING IMAGE">
          </div>
          <div class="right-section visible">
            <h2 class="heading">${item.title}</h2>
            <span class="publish-details">Published at:  ${item.publishedAt}</span>
            <span class="description dd">${item.description}</span>
            <p id="news-content">${item.content}</p>
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

const heroimages = document.querySelectorAll(".img-div")
const leftScroll = document.querySelector("#left")  
const rightScroll = document.querySelector("#right") 
let count = 1

rightScroll.addEventListener("click",()=>{
  
  if (count<7){
    count++
  }
  removeShadow ()
  let getting = document.getElementById(`${count}`)
  getting.scrollIntoView({behavior:"smooth" ,inline:"center" })
  getting.style.boxShadow = ` 0 0 12px 3px red`
  
  setTimeout(() => {
    
    scrollWindow()
  }, 2000);

  
})



leftScroll.addEventListener("click",()=>{
  if (count>1){
    count--
  }
  removeShadow ()
  let getting = document.getElementById(`${count}`)
  getting.scrollIntoView({behavior:"smooth" ,inline:"center" })
  getting.style.boxShadow = ` 0 0 12px 3px red`

  setTimeout(() => {
    
    scrollWindow()
  }, 1000);
})

const dotting = document.querySelectorAll(".dotting")
dotting.forEach((dot , index) =>{
  dot.addEventListener("click", ()=>{
    removeShadow ()
    
    num= index+1
    let getting = document.getElementById(`${num}`)
    getting.scrollIntoView({behavior:"smooth" ,inline:"center" })
  getting.style.boxShadow = ` 0 0 12px 3px red`

    setTimeout(() => {
    
      scrollWindow()
    }, 1000);
  })
})


// to prevent the bug occured while scrolling
function scrollWindow() {
  window.scrollBy({ top: 1, behavior: 'smooth' });
  console.log("scrolling is done")
}

// to remove the shadow from prev hero image
function removeShadow (){
  heroimages.forEach(image =>{
    image.style.boxShadow = ''
  })
}


