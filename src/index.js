const dogUrl = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    fetchDogList()

})

function fetchDogList(){
    fetch(dogUrl)
    .then((response) => response.json())
    .then((myjson) => showDogs(myjson))
}

function showDogs(dogArray){
    dogArray.map(dog => {
        renderDog(dog)
   })
}

function renderDog(dogObj){
    const tableBody = document.querySelector('#table-body')
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    tdName.innerText = `${dogObj.name}`
    const tdBreed = document.createElement('td')
    tdBreed.innerText = `${dogObj.breed}`
    const tdSex = document.createElement('td')
    tdSex.innerText = `${dogObj.sex}`
    const tdBtn = document.createElement('td')
    const editBtn = document.createElement("button")
    editBtn.innerText = "Edit"

    tr.appendChild(tdName)
    tr.appendChild(tdBreed)
    tr.appendChild(tdSex)
    tr.appendChild(tdBtn)
    tdBtn.appendChild(editBtn)
    tableBody.appendChild(tr)

    editBtn.addEventListener('click' , (e) => populateForm(e, dogObj))
}
//Clicking on the edit button next to a dog, should populate
//the top form with that dog's current information
function populateForm(event, obj){
    const nameInput = document.querySelector('input[name="name"]')
    const breedInput = document.querySelector('input[name="breed"]')
    const sexInput = document.querySelector('input[name="sex"]')

    nameInput.value = obj.name
    breedInput.value = obj.breed
    sexInput.value = obj.sex

    //adding a listener to the form
    const form = document.querySelector('#dog-form')
    form.addEventListener('submit', () => {
        const name = nameInput.value
        const breed = breedInput.value
        const sex = sexInput.value
        updateDog(name, breed, sex, obj.id)
    })
}

function updateDog(n, b, s, id) {
    const dogInfo = {
        name: n,
        breed: b,
        sex: s
    }

    fetch(`${dogUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(dogInfo)
      })
      .then(res=>res.json())
}

