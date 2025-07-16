let promoSection = document.querySelector('#promos')
let deletePromo = document.querySelector('delete')
let addProm = document.querySelector('addBtn')
let updateMode = false
let currentId = ""
let studentId = ""


const addNewPromo = document.querySelector('#btnAddProm')
const promoId = localStorage.getItem("promoId")

addBtn.addEventListener('click', () => {
    openAddModal()
    updateMode = false
})


async function choppepromos() {
    const response = await fetch("http://146.59.242.125:3015/promos", {
        method: "GET",
        headers: {
            Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34"
        }
    })
    const data = await response.json()
    console.log(data);
    return data

}

async function parcourirPromos() {
    const promos = await choppepromos()
    console.log(promoSection);

    promoSection.innerHTML = ""
    promos.forEach(promo => {
        displayPromo(promo)
    })

}

function displayPromo(promo) {
    console.log(promo);

    const article = document.createElement('article')
    const paraname = document.createElement('p')
    const student = document.createElement('p')
    const startdate = document.createElement('p')
    const enddate = document.createElement('p')
    const id = document.createElement('p')
    const description = document.createElement('p')
    const supprBtn = document.createElement('button')
    const changeBtn = document.createElement('button')
    const detailBtn = document.createElement('button')


    paraname.textContent = "Nom de la promo: " + promo.name
    startdate.textContent = "Date d'entrée: " + promo.startDate.split("T")[0]
    enddate.textContent = "Date de fin: " + promo.endDate.split("T")[0]
    id.textContent = "id :" + promo._id
    description.textContent = "Type de promo: " + promo.formationDescription

    supprBtn.textContent = "supprimer"
    supprBtn.classList.add("delete")

    changeBtn.textContent = "modifier"
    changeBtn.classList.add("change")

    detailBtn.textContent = "Détails"
    detailBtn.classList.add("detail")

    paraname.appendChild(changeBtn)
    paraname.appendChild(supprBtn)
    paraname.appendChild(detailBtn)

    const idProm = localStorage.getItem(id)
    //idProm.appendChild(id)

    const btnContainer = document.createElement('div')
    btnContainer.appendChild(changeBtn)
    btnContainer.appendChild(supprBtn)
    btnContainer.appendChild(detailBtn)

    article.appendChild(paraname)
    article.appendChild(startdate)
    article.appendChild(enddate)
    article.appendChild(id)
    article.appendChild(description)
    article.appendChild(btnContainer)


    promoSection.appendChild(article)


    supprBtn.addEventListener("click", () => {
        deletedPromo(promo._id)
        closeModal()

        dataDelete.remove()
    })

    changeBtn.addEventListener("click", (e) => {
        openAddModal()
        currentId = promo._id
        document.querySelector('#name').value = promo.name
        document.querySelector('#startDate').value = promo.startDate.split("T")[0]
        document.querySelector('#endDate').value = promo.endDate.split("T")[0]
        document.querySelector('#description').value = promo.formationDescription
        document.querySelector('#idpromo').value = promo._id

        updateMode = true

    })


    detailBtn.addEventListener("click", (idProm) => {
        localStorage.setItem("id",promo._id)
        let pageDetail = 'details.html'
        window.location.href = pageDetail
    })
}





addNewPromo.addEventListener("click", async (e) => {
    e.preventDefault()

    if (updateMode) {
        await updatePromo(currentId)
    } else {
        const newPromo = await addPromo()

        displayPromo(newPromo.data)
    }
    document.querySelector('form').reset()
})

async function addPromo() {
    const postPromo = {
        name: document.querySelector('#name').value,
        startDate: document.querySelector('#startDate').value,
        endDate: document.querySelector('#endDate').value,
        formationDescription: document.querySelector('#description').value

    }
    const add = await fetch("http://146.59.242.125:3015/promos", {
        method: "POST",
        headers: {
            Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34",
            "Content-type": "Application/json"
        },
        body: JSON.stringify(postPromo)
    })
    const data = await add.json()
    console.log(data);
    closeModal()
    parcourirPromos()
    return data
}

async function deletedPromo(id) {
    const deleted = await fetch(`http://146.59.242.125:3015/promos/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34"
        }
    })
    const dataDelete = await deleted.json()
    location.reload()

    return dataDelete
}

async function updatePromo(currentId) {
    const updateData = {
        name: document.querySelector('#name').value,
        startDate: document.querySelector('#startDate').value,
        endDate: document.querySelector('#endDate').value,
        description: document.querySelector('#description').value,
    }

    const reponse = await fetch("http://146.59.242.125:3015/promos/" + currentId, {
        method: "PUT",
        headers: {
            Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
    })

    const data = await reponse.json()
    console.log(data);
    parcourirPromos()
    return data
}

parcourirPromos()







