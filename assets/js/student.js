let studentSection = document.querySelector('#students')
let addStudy = document.querySelector('addBtn')
let deleteStudent = document.querySelector('delete')

let updateMode = false
let currentStudent = ""

let promoId = localStorage.getItem('id')
let studentId = localStorage.getItem('id)')

const addNewStudent = document.querySelector('#btnAddStudent')

addBtn.addEventListener('click', () => {
    openAddModal()
    updateMode = false
})

async function detailPromo() {

    const promo = await fetch(`http://146.59.242.125:3015/promos/${promoId}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34"
        }
    })
    const studentData = await promo.json()
    console.log(studentData);


    return studentData.students

}

async function parcourirStudents() {
    const students = await detailPromo()

    studentSection.innerHTML = ""
    students.forEach(student => {
        displayStudent(student)
    })

}

async function displayStudent(student) {

    const article = document.createElement('article')
    article.classList.add('student-card')

    const firstName = document.createElement('p')
    const lastName = document.createElement('p')
    const age = document.createElement('p')
    const idDisplay = document.createElement('p')

    const changeBtn = document.createElement('button')
    const supprBtn = document.createElement('button')


    const img = await retrieveAvatar(promoId, student._id)
    article.appendChild(img)



    firstName.textContent = "Nom : " + student.firstName
    lastName.textContent = "Prénom : " + student.lastName
    age.textContent = "Age : " + student.age
    idDisplay.textContent = "ID : " + student._id

    supprBtn.textContent = "Supprimer"
    supprBtn.classList.add("delete-btn")
    changeBtn.classList.add("modify-btn")
    changeBtn.textContent = "Modifier"

    const btnContainer = document.createElement('div')
    btnContainer.appendChild(changeBtn)
    btnContainer.appendChild(supprBtn)

    article.appendChild(firstName)
    article.appendChild(lastName)
    article.appendChild(age)
    article.appendChild(idDisplay)
    article.appendChild(btnContainer)

    studentSection.appendChild(article)



    supprBtn.addEventListener("click", () => {
        deletedStudent(student._id)
        closeModal()

        dataDelete.remove()
    })

    changeBtn.addEventListener("click", () => {
        openAddModal()
        updateMode = true
        currentStudent = student._id

        document.querySelector('#name').value = student.firstName
        document.querySelector('#lastname').value = student.lastName
        document.querySelector('#age').value = student.age
        document.querySelector('#titleModal').textContent = "Modifier ou créer un étudiant"

        document.querySelector("#avatar").value = ''
    })
}


addNewStudent.addEventListener("click", async (e) => {
    e.preventDefault()

    if (updateMode) {
        await updateStudent(currentStudent)
    } else {
        const newStudent = await addStudent()
        displayStudent(newStudent.data)
    }
    document.querySelector('form').reset()
})

async function addStudent() {

    const nameInput = document.querySelector('#name').value
    const lastNameInput = document.querySelector('#lastname').value
    const ageInput = document.querySelector('#age').value
    const avatarFileInput = document.querySelector("#avatar")
    const avatarFile = avatarFileInput ? avatarFileInput.files[0] : null

    let formData = new FormData()
    formData.append('firstName', nameInput)
    formData.append('lastName', lastNameInput)
    formData.append('age', ageInput)
    formData.append('avatar', avatarFile)
    /*
        const postStudent = {
            firstName: document.querySelector('#name').value,
            lastName: document.querySelector('#lastname').value,
            age: document.querySelector('#age').value
            avatar : document.querySelector('#avatar').value
        }
    */
    const add = await fetch(`http://146.59.242.125:3015/promos/${promoId}/students`, {
        method: "POST",
        headers: {
            Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34",
            "Content-type": "Application/json"
        },
        body: formData
    })
    const data = await add.json()
    console.log(data);
    closeModal()
    parcourirStudents()
    return data

}


async function updateStudent(currentStudent) {
    updateMode = true

    const nameInput = document.querySelector('#name').value
    const lastNameInput = document.querySelector('#lastname').value
    const ageInput = document.querySelector('#age').value
    const avatarFileInput = document.querySelector("#avatar")
    const avatarFile = avatarFileInput ? avatarFileInput.files[0] : null

    let formData = new FormData()
    formData.append('firstName', nameInput)
    formData.append('lastName', lastNameInput)
    formData.append('age', ageInput)
    formData.append('avatar', avatarFileInput)

    const updateData = {
        firstName: document.querySelector('#name').value,
        lastName: document.querySelector('#lastname').value,
        age: document.querySelector('#age').value,
        avatar: document.querySelector('#avatar').value,

    }

    const reponse = await fetch(`http://146.59.242.125:3015/promos/${promoId}/students/` + currentStudent, {
        method: "PUT",
        headers: {
            Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
    })

    const data = await reponse.json()
    console.log(data);
    parcourirStudents()
    return data


}

async function deletedStudent(studentId) {

    const deleted = await fetch(`http://146.59.242.125:3015/promos/${promoId}/students/${studentId}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34"
        }
    })
    const dataDelete = await deleted.json()
    location.reload()

    return dataDelete


}

async function retrieveAvatar(promoId, studentId) {


    const response = await fetch(`http://146.59.242.125:3015/promos/${promoId}/students/${studentId}/avatar`, {
        method: "GET",
        headers: {
            Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34"
        }
    });

    const avatarData = await response.blob()
    const avatarUrl = URL.createObjectURL(avatarData)
    const img = document.createElement('img')
    img.src = avatarUrl
    img.alt = `Avatar`
    img.width = 100

    return img

}


retrieveAvatar()
parcourirStudents()
