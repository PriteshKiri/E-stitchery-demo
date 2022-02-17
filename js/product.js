const getProducts = async () => {
  try {
    const results = await fetch("../data/products.json");
    const data = await results.json();
    const products = data.products;

    return products;
  } catch (err) {
    console.log(err);
  }
};

/*
  =============
  Load Category Products
  =============
   */
const categoryCenter = document.querySelector(".Product_Container");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayAllProductItemsload(products);
});

/*
  =============
  view all
  =============


   */

const displayAllProductItemsload = (items) => {
  let displayAllProductload = items.slice(0, 3).map(
    (product) => `
                       <div class="product_item">
                       <div class="product_image"><img src="${product.image}" alt="img" /></div>
                       <div class="product_content">
                         <h5>${product.title}</h5>
                       </div>
                     </div>                
                   `
  );

  displayAllProductload = displayAllProductload.join("");
  if (categoryCenter) {
    categoryCenter.innerHTML = displayAllProductload;
  }
};

const displayAllProductItems = (items) => {
  let displayAllProduct = items.map(
    (product) => `
                     <div class="product_item">
                     <div class="product_image"><img src="${product.image}" alt="img" /></div>
                     <div class="product_content">
                       <h5>${product.title}</h5>
                     </div>
                   </div>                
                 `
  );

  displayAllProduct = displayAllProduct.join("");
  if (categoryCenter) {
    categoryCenter.innerHTML = displayAllProduct;
  }
};

/*
  =============
  Filtering
  =============
   */

const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
  categoryContainer.addEventListener("click", async (e) => {
    const target = e.target.closest(".section__title");
    console.log(target);
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if (id) {
      // remove active from buttons
      Array.from(filterBtn).forEach((btn) => {
        btn.classList.remove("active");
      });
      target.classList.add("active");

      // Load Products
      let menuCategory = products.filter((product) => {
        if (product.category === id) {
          return product;
        }
      });

      if (id === "All") {
        displayAllProductItemsload(products);
      } else {
        displayAllProductItems(menuCategory);
      }

      e.preventDefault();
    }
  });
}
