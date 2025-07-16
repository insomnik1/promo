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
    const firstName = document.createElement('p')
    const lastName = document.createElement('p')
    const age = document.createElement('p')
    const id = document.createElement('p')
    const avatar = document.createElement('img')
    const changeBtn = document.createElement('button')
    const supprBtn = document.createElement('button')
    const img = await retrieveAvatar()
    article.appendChild(img)


    firstName.textContent = "Nom : " + student.firstName
    lastName.textContent = "Prénom : " + student.lastName
    age.textContent = "Age : " + student.age
    id.textContent = "id :" + student._id

    supprBtn.textContent = "supprimer"
    supprBtn.classList.add("delete")
    changeBtn.classList.add("modifyStudent")
    changeBtn.textContent = "Modifier"



    firstName.appendChild(changeBtn)
    firstName.appendChild(supprBtn)

    const idStudent = localStorage.getItem(id)

    const btnContainer = document.createElement('div')
    btnContainer.appendChild(changeBtn)
    btnContainer.appendChild(supprBtn)

    article.appendChild(firstName)
    article.appendChild(lastName)
    article.appendChild(age)
    article.appendChild(id)
    article.appendChild(btnContainer)


    studentSection.appendChild(article)

    supprBtn.addEventListener("click", () => {
        deletedStudent(student._id)
        closeModal()

        dataDelete.remove()
    })


    changeBtn.addEventListener("click", (e) => {

        openAddModal()

        currentStudent = student._id
        document.querySelector('#name').value = student.firstName
        document.querySelector('#lastname').value = student.lastName
        document.querySelector('#age').value = student.age

        updateMode = true

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
    const postStudent = {
        firstName: document.querySelector('#name').value,
        lastName: document.querySelector('#lastname').value,
        age: document.querySelector('#age').value
    }
    const add = await fetch(`http://146.59.242.125:3015/promos/${promoId}/students`, {
        method: "POST",
        headers: {
            Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34",
            "Content-type": "Application/json"
        },
        body: JSON.stringify(postStudent)
    })
    const data = await add.json()
    console.log(data);
    closeModal()
    parcourirStudents()
    return data
}


async function updateStudent(currentStudent) {

    const updateData = {
        firstName: document.querySelector('#name').value,
        lastName: document.querySelector('#lastname').value,
        age: document.querySelector('#age').value,
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
    /*
        const studentID = currentStudent.value
        const avatarImg = document.querySelector("#avatar").files[0]
        const formData = new FormData()
        formData.append('fisrtName', document.querySelector("#name").value)
        formData.append('lastName', document.querySelector("#lastname").value)
        formData.append('age', document.querySelector("#age").value)
        if (avatarImg) {
            formData.append('avatar', document.querySelector("#avatar").files[0])
        }
        const reponse = await fetch(`http://146.59.242.125:3015/promos/${promoId}/students/` + currentStudent, {
            method: "PUT",
            headers: {
                Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
    
        const data = await reponse.json()
        console.log(data);
        parcourirStudents()
        return data*/
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

    const avatar = await fetch('http://146.59.242.125:3015/promos/' + promoId + '/students/' + studentId + '/avatar', {
        method: "GET",
        headers: {
            Authorization: "Bearer 97c8048f-66ba-4fe8-b0d2-ebdc91e97e34"
        }
    })
    const avatarData = await avatar.blob()
    const avatarUrl = URL.createObjectURL(avatarData)
    const img = document.createElement('img')
    img.src = avatarUrl
    img.alt = "avatar"
    img.width = 100

    return img


}

retrieveAvatar()
parcourirStudents()