
const date = document.querySelector("#date");
date.innerHTML = new Date().getFullYear();


const departmentOptions = [
    {
        value: '',
        label: 'Selecione',
    },
    {
        label: 'TI',
        value: 'TI'
    },
    {
        label: 'HR',
        value: 'HR'
    },
    {
        label: 'Vendas',
        value: 'Vendas'
    },
    {
        label: 'Finanças',
        value: 'Finanças'
    }
]

const departmentSelect = document.querySelector("#department");
const userForm = document.querySelector("#user-form")
const emailInput = document.querySelector("#email")
const nameInput = document.querySelector("#name")
const employeesTable= document.querySelector("#employees-table-body")

const renderOptions = () => {

    departmentSelect.innerHTML = "";

    departmentOptions.forEach((option,index) =>  {

        const optionElement = document.createElement("option");


        if(index === 0) {
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            optionElement.selected = true;
            optionElement.disabled = true;
            departmentSelect.appendChild(optionElement);
        };

        optionElement.value = option.value;
        optionElement.textContent = option.label;
        departmentSelect.appendChild(optionElement);
    })

}


userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(emailInput.value === "" || nameInput.value === "" || departmentSelect.value === "") {
        alert("Por favor, preencha todos os campos")
        return
    }

    const employee = {
        email: emailInput.value,
        name: nameInput.value,
        department: departmentSelect.value,
        active: true
    }

    addRow(employee);

    setTimeout(()=> 
        alert("Funcionario cadastrado com sucesso")     
    ,100)    

    userForm.reset()
    
})


const fetchEmployees = () => {

    fetch("http://demo9104888.mockable.io/employees")
    .then(res => res.json())
    .then(data => renderEmployees(data.employees))
    .catch(err => console.log(err))

}

const renderEmployees = (employees) => {

    employees.forEach(employee => addRow(employee))

}

const addRow = (employee) => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td class="name-td">${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.department}</td>
        <td><input ${employee.active ? 'checked' : ''} class="form-check-input" type="checkbox" /></td>
    `;

    employeesTable.appendChild(tr);

}


fetchEmployees();
renderOptions();