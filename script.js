// ---------category container--------//
const categoryContainer = document.getElementById("topics");

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
      console.log(e.target);
      e.target.classList.add("border-b-4");
    }
  });
};
// ------------show category delegation added----//
loadCategory();
