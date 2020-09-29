const cafe_list = document.querySelector('#cafe-list')
const cafe_form = document.querySelector('#add-cafe-form')

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

// gets the data
database.collection('cafes').get().then((snapshot)=>{
    snapshot.docs.forEach(element => {
        renderCafe(element)
    });
})

// saves the data
cafe_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    database.collection('cafes').add({
        name: cafe_form.name.value,
        city: cafe_form.city.value
    })

    cafe_form.name.value=''
    cafe_form.city.value=''
})
