const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    //1. set where we set element
    const phoneContainer = document.getElementById('phone-container');
    // Clear phone contsiner card before adding new cards.
    phoneContainer.textContent = '';
    // display show all button if there are more then 12 phones
    // Display only first 5 phones
    const showallcontainer = document.getElementById('show-all-container');
    if (phones.length >= 12) {
        showallcontainer.classList.remove('hidden');
    }
    else {
        showallcontainer.classList.add('hidden')
    }
    console.log('Is Show all', isShowAll)
    if (!isShowAll) {
        phones = phones.splice(0, 12);
    }
    phones.forEach(phone => {
        // console.log(phone);
        //2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-1`;
        // 3. set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>`
        phoneContainer.appendChild(phoneCard);
    });
    // hide Loading Spinner
    troggleSpinner(false)

}
// Handle Search Button
const handleSearch = (isShowAll) => {
    troggleSpinner(true)
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll)
}
// another handle search button
// const handleSearch2 = () => {
//     troggleSpinner(true)
//     const searchField = document.getElementById("search-field2")
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }
const troggleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }

}
// Handle show all
const handleShowAlll = () =>
    handleSearch(true);
// loadPhone();