const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}
const displayPhones = phones => {
    // console.log(phones);
    //1. set where we set element
    const phoneContainer = document.getElementById('phone-container');
    // Clear phone contsiner card before adding new cards.
    phoneContainer.textContent = '';
    phones.forEach(phone => {
        console.log(phone);
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

}
// Handle Search Button
const handleSearch = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText)
}
// another handle search button
const handleSearch2 = () => {
    const searchField = document.getElementById("search-field2")
    const searchText = searchField.value;
    loadPhone(searchText);
}
// loadPhone();