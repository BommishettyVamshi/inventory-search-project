
const searchQuery = document.getElementById("searchQuery");
const categoryFilter = document.getElementById("categoryFilter");
const minPrice = document.getElementById("minPriceRange");
const maxPrice = document.getElementById("maxPriceRange");
const results = document.getElementById("results");

const minPriceToolTip = document.getElementById("minPriceTooltip");
const maxPriceToolTip = document.getElementById("maxPriceTooltip");
const errPara = document.getElementById("errorPara");
const resetButton = document.getElementById("resetButton");
const table = document.getElementById("productsTable");
const tableBody = document.getElementById("productsTableBody");

function updateTooltip(slider, tooltip) {
  tooltip.textContent = slider.value;

  const percent = (slider.value - slider.min) / (slider.max - slider.min);
  const sliderWidth = slider.offsetWidth;
  const tooltipWidth = tooltip.offsetWidth;

  let offset = percent * sliderWidth - tooltipWidth / 2;

  if (offset <= 0) offset = 0;
  if (offset >= sliderWidth - tooltipWidth) offset = sliderWidth - tooltipWidth;

  tooltip.style.left = `${offset}px`;
}

// Display products in the products table
function displayResults(products) {
  tableBody.innerHTML = "";
  errPara.style.display = "none";
  resetButton.style.display = "none";
  if (products.length === 0) {
    errPara.style.display = "block";
    errPara.textContent = "No products found.";

    resetButton.style.display = "block";
    resetButton.addEventListener("click", resetFilters);

    table.style.display = "none";
    return;
  }

  table.style.display = "table";

  products.forEach((product) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.textContent = product.name;
    tdName.classList.add("product-column");
    tr.appendChild(tdName);

    const tdCategory = document.createElement("td");
    tdCategory.textContent = product.category;
    tdCategory.classList.add("product-column");
    tr.appendChild(tdCategory);

    const tdPrice = document.createElement("td");
    tdPrice.textContent = `Rs. ${product.price.toFixed(2)}`;
    tdPrice.classList.add("product-column");
    tr.appendChild(tdPrice);

    const tdSupplier = document.createElement("td");
    tdSupplier.textContent = product.supplier;
    tdSupplier.classList.add("product-column");
    tr.appendChild(tdSupplier);
    tableBody.appendChild(tr);
  });
}

// Fetch products from backend
async function fetchProducts(query = "", category = "", min = "", max = "") {
  errPara.style.display = "none";
  resetButton.style.display = "none";


  const params = new URLSearchParams();
  if (query) params.append("q", query);
  if (category) params.append("category", category);
  if (min) params.append("minPrice", min);
  if (max) params.append("maxPrice", max);

  try {
    const BACKENDAPI = "https://inventory-search-project-y75r.onrender.com/search";
    console.warn(BACKENDAPI);
    const response = await fetch(
      `${BACKENDAPI}?${params.toString()}`,
    );
    const data = await response.json();

    if (!response.ok) {
      errPara.style.display = "block";
      errPara.textContent = data.error;
      
      resetButton.style.display = "block";
      resetButton.addEventListener("click", resetFilters);
      table.style.display = "none";
      return;
    }

    displayResults(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
    results.innerHTML = "<p>Error loading products.</p>";
  }
}

// set all filters to default values
function resetFilters() {
  searchQuery.value = "";
  categoryFilter.value = "";
  minPrice.value = minPrice.min;
  maxPrice.value = maxPrice.max;
  updateTooltip(minPrice, minPriceToolTip);
  updateTooltip(maxPrice, maxPriceToolTip);
  fetchProducts("", "", minPrice.value, maxPrice.value);
}


// Event listeners for sliders
minPrice.addEventListener("input", () =>
  updateTooltip(minPrice, minPriceToolTip),
);
maxPrice.addEventListener("input", () =>
  updateTooltip(maxPrice, maxPriceToolTip),
);

// Initialize tooltips on page load
updateTooltip(minPrice, minPriceToolTip);
updateTooltip(maxPrice, maxPriceToolTip);

// Event listener for search input
searchQuery.addEventListener("input", () => {
  fetchProducts(
    searchQuery.value,
    categoryFilter.value,
    minPrice.value,
    maxPrice.value,
  );
});

// Event listener for category filter
categoryFilter.addEventListener("change", () => {
  fetchProducts(
    searchQuery.value,
    categoryFilter.value,
    minPrice.value,
    maxPrice.value,
  );
});

// Event listeners for price range filters
minPrice.addEventListener("input", () => {
  fetchProducts(
    searchQuery.value,
    categoryFilter.value,
    minPrice.value,
    maxPrice.value,
  );
});

maxPrice.addEventListener("input", () => {
  fetchProducts(
    searchQuery.value,
    categoryFilter.value,
    minPrice.value,
    maxPrice.value,
  );
});


// Fetching products on page load with default min/max prices
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts("", "", minPrice.value, maxPrice.value);
});
