import {deleteFetch, getFetch, postFetch, updateFetch} from '../../services/fetch-data.js'


const addBtn = document.querySelector('.addBtn');
const carteList = document.querySelector('.carte-list');
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');
const btnModalSubmit = document.querySelector('.btn-submit');
const foodName = document.getElementById('food-name');
const priceTag = document.getElementById('price-tag');
const itemDescription = document.getElementById('item-description');
const foodId = document.getElementById('food-id');
const btnDelete =  document.querySelector('.btn-delete')



function deleteFood(){
    const id = foodId.value
    deleteFetch({url:`http://localhost:8080/posts/${id}`})
}

function closeModal(){
    modal.style.display = 'none';
    foodName.value = ''
    priceTag.value = ''
    itemDescription.value = ''

}

function openModal(){
    modal.style.display = 'flex';
    btnDelete.style.display = 'none';
    
}

function upsertFood(){
    const id = foodId.value
    const dataPost = {
        title: foodName.value,
        price: priceTag.value,
        description: itemDescription.value
    };
    if(id){
        //update
        updateFetch({url: `http://localhost:8080/posts/${id}`, data: dataPost});
        render()
        return;
    }

    postFetch('http://localhost:8080/posts',dataPost);

    closeModal();
}

function openEditModal({title, price, description,id}) {
    openModal();
    btnDelete.style.display = 'flex';


    foodName.value = title
    priceTag.value = price
    itemDescription.value = description
    foodId.value = id

}

function render({title, price,description,id}){
    const divItems = document.createElement('div');
    const descriptionDiv = document.createElement('div');
    const paragraphTitle = document.createElement('h4');
    const paragraphPrice = document.createElement('p');
    const paragraphDescription = document.createElement('p');

    divItems.addEventListener('click', () => openEditModal({title,price,description,id}))

    divItems.classList.add('div-items');
    paragraphTitle.innerHTML = title;
    paragraphPrice.innerHTML = formatCurrency({ currency:'BRL', lang:'pt-BR', number:price });
    paragraphDescription.innerHTML = description;

    carteList.appendChild(divItems);
    descriptionDiv.appendChild(paragraphTitle);
    descriptionDiv.appendChild(paragraphDescription);
    divItems.appendChild(descriptionDiv);
    divItems.appendChild(paragraphPrice);
}

function formatCurrency({number, currency, lang}){
    return new Intl.NumberFormat(lang,{style:'currency', currency}).format(number);
}



addBtn.addEventListener('click',openModal);

btnModalSubmit.addEventListener('click',function(e){
    e.preventDefault();
    upsertFood();
});
btnDelete.addEventListener('click',deleteFood)

btnCloseModal.addEventListener('click',closeModal);

window.addEventListener('click',function(e){
    if(e.target === modal){
        closeModal()
    }
});

window.addEventListener('load',function(){
    getFetch('http://localhost:8080/posts', render);
});

