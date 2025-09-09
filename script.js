
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