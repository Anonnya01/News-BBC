// -1️⃣✅--------category container--------//
const categoryContainer = document.getElementById("topics");

// 2️⃣-✅---------news container----------//
const newsContainer =document.getElementById("newsBox")

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

  //event delegation--//
  categoryContainer.addEventListener("click", (e) => {
    //------removing---------//
    const removeBorder = document.querySelectorAll("li");
    removeBorder.forEach((li) => {
      li.classList.remove("border-b-4");
    });
    // ----adding----//
    if (e.target.localName === "li") {
      //   console.log(e.target);
      e.target.classList.add("border-b-4");
      loadNews(e.target.id); //---calling load news⭐⭐
    }
  });
};
// ------------show category delegation added & END----//

// -----------get News------------//

const loadNews = (topicId) => {
  console.log(topicId);

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
   <div>
      
      <div>
      <img src="${article.image.srcset[5].url}">
      </div>

    <h1>${article.title}</h1>
   </div>
   `
  })

  }



loadCategory();
