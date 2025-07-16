let modal = document.getElementById('modalPromo')
let closeBtn = document.getElementsByClassName('closeBtn')[0]
let addBtnContainer = document.getElementById('modalBtn')
let addBtn = document.getElementById('addBtn')
let modifyStudentBtn = document.getElementsByClassName('modifyStudent')

closeBtn.addEventListener('click', closeModal)
window.addEventListener('click', outsideClick)
addBtn.addEventListener('click', openAddModal)

function openAddModal() {
    modal.style.display = 'flex'
    addBtnContainer.style.display = 'none'
}

function closeModal() {
    modal.style.display = 'none'
    addBtnContainer.style.display = 'flex'
}

function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none'
        closeModal()
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    modal.style.display = 'none'
})
    
/*
function openAddModalStudent() {
    modal.style.display = 'flex'
    modifyStudentBtn.style.display = 'none'
}

function closeModalStudent() {
    modal.style.display = 'none'
    modifyStudentBtn.style.display = 'flex'
}
*/