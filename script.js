
const treeShowcaseWrapper = document.getElementById('tree-showcase-wrapper');
const categoriesWrapper = document.getElementById('categories-wrapper');
const cartItemWrapper = document.getElementById('cart-item-wrapper');
const cartTotalWrapper = document.getElementById('cart-total-wrapper');

const getData = async url => {
    showSpinner();
    const res = await fetch(url);
    const data = await res.json();
    hideSpinner();
    return data;
}


// Spinner
const showSpinner = () => {
    if(!document.getElementById("spinner"));{
        const spinner = document.createElement("div");
        spinner.id = 'spinner';
        spinner.className = "text-center col span full";
        spinner.innerHTML = `<p class="text-lg font-semibold">Loading...</p>`;
        treeShowcaseWrapper.appendChild(spinner);
    }

};
 
const hideSpinner = () => {
    const spinner = document.getElementById("spinner");
    if(spinner) {
        spinner.remove();
    }
};

// Load Categories
const getCategory = () => {
    getData('https://openapi.programming-hero.com/api/categories')
    .then(data => showCategory(data.categories));
}

const showCategory = (categories) => {
    categoriesWrapper.innerHTML = '';
    categories.forEach(category => {
        const {id, category_name} = category;
        const li = document.createElement('li');
        li.className = "category-li text-base cursor-pointer p-2";
        li.innerText = category_name;
        li.onclick = () => getAllTrees(`https://openapi.programming-hero.com/api/category/${id}`);
        categoriesWrapper.appendChild(li);
    });
}

const loadDetails= async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    console.log( url);
    const data = await fetch(url);
    const details= await data.json();
    displayplantsDetails(details.plants);
};
const displayplantsDetails =  (detail) => {
    console.log(detail);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class=""> 
    <h1 class="text-[20px] font-bold">${detail.name}</h1>
    <img class="h-[150px] w-[100%]" src="${detail.image}" alt="">

    <p><span class="text-[14px] font-bold">Category:</span>${detail.category} </p>
    <p><span class="text-[14px] font-bold">Price:</span>$${detail.price} </p>
    <p><span class="text-[14px] font-bold">Description: </span>${detail.description} </p>
    
    `;
    document.getElementById("plant_details").showModal();
}

// Load All Trees
const getAllTrees = (url) => {
    getData(url).then(data => showAllTrees(data.plants));
}

const showAllTrees = (plants) => {
    treeShowcaseWrapper.innerHTML = '';
    plants.forEach(plant => {
        const {id, image, name, description, category, price} = plant;
        const shortDescription = description.split(' ').slice(0, 14).join(' ');
        treeShowcaseWrapper.innerHTML += `
            <div class="tree-showcase-item bg-white p-4 rounded-lg">
                <img class="w-full h-[185px] rounded-lg object-cover" src="${image}" alt="${name}">
                <h5 onclick="loadDetails(${id})"" class="tree-title text-sm font-semibold text-[#1f2937] mt-3 mb-2 cursor-pointer"> ${name}</h5>
                <p class="text-xs text-[#1f2937] opacity-80">${shortDescription}</p>
                <div class="flex justify-between mt-2 mb-3">
                    <p class="text-sm bg-[#dcfce7] py-1 px-2 rounded-full text-[#15803D] font-medium">${category}</p>
                    <p class="text-sm font-semibold">৳<span class="tree-price">${price}</span></p>
                </div>
                <button onclick= " calculateCartTotals(this)"   class="p-3 w-full bg-[#15803d] alert-btn text-white text-base rounded-full font-medium">Add to Cart</button>
            </div>`;
    }
     

);
}

