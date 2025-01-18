let array = [
    {
        "id": 1,
        "name": "Bruce Reyes",
        "age": 28
    },
    {
        "id": 2,
        "name": "Benjamin Dean",
        "age": 34
    },
    {
        "id": 3,
        "name": "Philip Lucas",
        "age": 22
    },
    {
        "id": 4,
        "name": "Jose Hill",
        "age": 40
    },
    {
        "id": 5,
        "name": "Jerry Andrews",    
        "age": 27
    },
    {
        "id": 6,
        "name": "Nicolas Lee",
        "age": 33
    },
    {
        "id": 7,
        "name": "Alan Wade",
        "age": 25
    }
]

const tbody = document.querySelector('tbody');


let form = document.forms.addUser;

form.onsubmit = (event) => {
    event.preventDefault();

    let fn = new FormData(form);

    let user = {
        id: array.length + 1,
        name: fn.get('name'),
        age: +fn.get('age')
    };

    array.push(user);
    console.log(array);
    reloadTable()
};

const editForm = document.querySelector('#edit-form');
const closeEditForm = document.querySelector('.edit-close');
const inputNameEdit = document.querySelector('#nameEdit');
const inputAgeEdit = document.querySelector('#ageEdit');
let currentEditUser = null;

function reloadTable() {
    tbody.innerHTML = "";

    for (let item of array) {
        const date = new Date().getFullYear()
        const birthYear = date - item.age;

        const tr = document.createElement('tr')
        const id = document.createElement('td');
        const name = document.createElement('td');
        const age = document.createElement('td');
        const brthYear = document.createElement('td');
        const btns = document.createElement('td');
        const buttonDelete = document.createElement('button');
        const buttonEdit = document.createElement('button');

        buttonDelete.textContent = "delete";
        buttonEdit.textContent = "edit";

        buttonDelete.classList.add('buttonDelete');
        buttonEdit.classList.add('buttonEdit');


        id.textContent = item.id;
        name.textContent = item.name;
        age.textContent = item.age;
        brthYear.textContent = birthYear;

        tr.append(id, name, brthYear, btns);
        btns.append(buttonEdit, buttonDelete);
        tbody.append(tr);

        buttonDelete.onclick = () => {
            array.splice(array.indexOf(item), 1);
            reloadTable()
        };

        buttonEdit.onclick = () => {
            currentEditUser = item;
            inputNameEdit.value = item.name;
            inputAgeEdit.value = item.age;
            editForm.style.display = 'flex';
        };
    };

};

reloadTable()

editForm.onsubmit = (e) => {
    e.preventDefault();

    if (currentEditUser) {
        const currentYear = new Date().getFullYear();
        const userAge = parseInt(inputAgeEdit.value);
        const userBirthYear = currentYear - userAge;

        currentEditUser.name = inputNameEdit.value;
        currentEditUser.age = userAge;

        reloadTable()
        editForm.style.display = 'none';
        console.log(userBirthYear);

    };
}

closeEditForm.onclick = () => {
    editForm.style.display = 'none';
};