const cafe_list = document.querySelector('#cafe-list')

// create element and render cafe
function renderCafe(element){
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')

    li.setAttribute('data-id',element.id)
    name.textContent = element.data().name
    city.textContent = element.data().city

    li.appendChild(name)
    li.appendChild(city)

    cafe_list.appendChild(li)
}

database.collection('cafes').get().then((snapshot)=>{
    snapshot.docs.forEach(element => {
        renderCafe(element)
    });
})