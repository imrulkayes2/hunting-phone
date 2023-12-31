const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    //1. set where we set element
    const phoneContainer = document.getElementById('phone-container');
    // Clear phone container card before adding new cards.
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
    // console.log('Is Show all', isShowAll)
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
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetails('${phone.slug}')"
                             class="btn btn-primary">Show Details</button>
                        </div>
                    </div>`
        phoneContainer.appendChild(phoneCard);
    });
    // hide Loading Spinner
    troggleSpinner(false)

}
// 
const handleShowDetails = async (id) => {
    console.log('Show details', id);
    // load single phone Data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
}
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-detail-container')
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p><span>storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>displaySize:</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>memory:</span>${phone?.mainFeatures?.memory}</p>
    <p><span>GPS:</span>${phone?.others?.GPS}</p>
    <p><span>releaseDate:</span>${phone?.mainFeatures?.releaseDate}</p>
    `

    // show the modal
    show_details_modal.showModal();
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
loadPhone();