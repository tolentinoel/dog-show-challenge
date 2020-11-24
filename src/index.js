const dogUrl = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#dog-form')
    form.addEventListener('submit', (e) => {updateDog(e)})
    fetchDogList()



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
    tr.dataset.id = dogObj.id
    const tdName = document.createElement('td')
    tdName.innerText = dogObj.name
    const tdBreed = document.createElement('td')
    tdBreed.innerText = dogObj.breed
    const tdSex = document.createElement('td')
    tdSex.innerText = dogObj.sex
    const tdBtn = document.createElement('td')
    const editBtn = document.createElement("button")
    editBtn.innerText = "Edit"

    tr.appendChild(tdName)
    tr.appendChild(tdBreed)
    tr.appendChild(tdSex)
    tr.appendChild(tdBtn)
    tdBtn.appendChild(editBtn)
    tableBody.appendChild(tr)

    editBtn.addEventListener('click' , () => populateForm(dogObj))
}
//Clicking on the edit button next to a dog, should populate
//the top form with that dog's current information
function populateForm(obj){

    //const form = document.querySelector
    const nameInput = document.querySelector('input[name="name"]')
    const breedInput = document.querySelector('input[name="breed"]')
    const sexInput = document.querySelector('input[name="sex"]')

    nameInput.value = obj.name
    breedInput.value = obj.breed
    sexInput.value = obj.sex
    form.dataset.id = obj.id

}

function updateDog(e) {
    e.preventDefault()
    const tr = document.querySelector(`tr[data-id="${e.target.dataset.id}"]`).children

    fetch(`${dogUrl}/${e.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
            "name": e.target.name.value,
            "breed": e.target.breed.value,
            "sex": e.target.sex.value
        })
      })
      .then(res=>res.json())
      .then(data => {
        tr[0].innerText = data.name
        tr[1].innerText = data.breed
        tr[2].innerText = data.sex
      })
}

})