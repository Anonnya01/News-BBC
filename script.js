// -1️⃣✅--------category container--------//
const categoryContainer = document.getElementById("topics");

// 2️⃣-✅---------news container----------//
const newsContainer =document.getElementById("newsBox")

// -----book mark-----------//
const bookmarkContainer =document.getElementById("bookmark-cont")
// ===========bookmark data------------//

let bookmarks =[]

// ----------get Category-----------//
const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories")
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      //   console.log(categories);
      showCategory(categories);
    })

    .catch((err) => {
      console.log(err);
    });
};

// ----------show category----------------///
const showCategory = (categories) => {
  categories.forEach((cat) => {
    // console.log(cat.title);
    categoryContainer.innerHTML += `
        <li id="${cat.id}" class="hover:border-b-4 border-red-600 cursor-pointer">
        ${cat.title}</li>
        `;
  });
  // ---------show category func end -------//

  // ⭐⭐⭐--- Code to make the first category active by default ---
  if (categories && categories.length > 0) {
    // 1. Get the ID of the first category
    const firstCategoryId = categories[0].id;

    // 2. Find its <li> element on the page
    const firstCategoryElement = document.getElementById(firstCategoryId);

    // 3. Add the highlight class
    if (firstCategoryElement) {
        firstCategoryElement.classList.add("border-b-4");
    }

    // 4. Load its news content
    loadNews(firstCategoryId);
  }   
  //-----⭐⭐⭐⭐⭐⭐-//

  //event delegation--//
  categoryContainer.addEventListener("click", (e) => {
   
    //------removing---------//
    const removeBorder = document.querySelectorAll("li");
    removeBorder.forEach((li) => {
      li.classList.remove("border-b-4");
    });
    // ----adding----//
    if (e.target.localName === "li") {
        console.log(e.target);
      e.target.classList.add("border-b-4");
      loadNews(e.target.id); //---calling load news⭐⭐
    }
  });
};
// ------------show category delegation added & END----//

// -----------get News------------//

const loadNews = (topicId) => {
//   console.log(topicId);

  fetch(`https://news-api-fs.vercel.app/api/categories/${topicId}`)
  .then(res=>res.json())
  .then(data =>{
    //   console.log(data.articles);
      showNews(data.articles) 
  })
  .catch(err=>{
    console.log(err);
  })
};

// -----------show News-----------//
  const showNews=(articles)=>{
   newsContainer.innerHTML=''
  articles.forEach(article =>{
   newsContainer.innerHTML +=`
   <div class="border-gray-300 p-1 rounded-lg shadow-sm m-2">
      <div class="p-1">
      <img class="rounded" src="${article.image.srcset[5].url}">
      </div>
      <div id="${article.id}" class="mt-2 px-2">
      <h1 class=" font-bold">${article.title}</h1>
    <h5 class="text-sm mt-1">${article.time}</h5>
    <button class="btn">Bookmark</button>
      </div>
   </div>
   `
  })

  }
//   ----------get detail for bookmark--//
  newsContainer.addEventListener('click',(e)=>{
    // console.log(e.targe);
    if(e.target.innerText === "Bookmark"){
        // console.log('clicked');
        
        handleBookmark(e)
    }
  })

//   -----------handle bookmarks---//
  const handleBookmark =(e)=>{
const title=e.target.parentNode.children[0].innerText
        const id =e.target.parentNode.id
        // console.log(artId);  

        bookmarks.push({
           Title: title,
           Id: id
        })
    //   console.log(bookmarks);
      showBookmarks(bookmarks)
  }

//   ------------show bookmarks--------//

const showBookmarks = (bookmarks)=>{
bookmarkContainer.innerHTML=''

bookmarks.forEach(bookmark=>{
  bookmarkContainer.innerHTML +=`
  <div class="my-2 border">
     <h1>${bookmark.Title}</h1>
     <button onClick="deleteBookmark(${bookmark.Id})" class="btn my-2 btn-xs">Delete</button>
  </div>
  
  `
})

}
const deleteBookmark =(bookId)=>{
 const bookmarkId=bookId.id;
 console.log(bookmarkId);
 bookmarks.filter(bookmark)
 
}

loadCategory();
loadNews('main')

