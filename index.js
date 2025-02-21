const date = document.querySelector("#date");
date.innerHTML = new Date().getFullYear();


const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const homeLink = document.querySelector("#home-link");
const submitForm = document.querySelector("#submit-form");
const input = document.querySelector("#add-item");
const errandList = document.querySelector("#errand-list")
const label = document.querySelector("#label")
const title = document.querySelector("#errand-title")
const deleteBtn = document.querySelector(".delete-btn")
const tbody = document.querySelector("#products-table-body")
const labels = document.querySelectorAll("label")
const hrs = document.querySelectorAll("hr")

const changeTheme = () => {

    const errandListItems = document.querySelectorAll(".errand-list_item");


    document.body.classList.toggle("bg-dark")
    date.classList.toggle("text-white")
    header.classList.toggle("bg-secondary")
    footer.classList.toggle("text-white")
    homeLink.classList.toggle("text-white")
    title.classList.toggle("text-white")

    
    errandListItems.forEach((item) => {
        item.classList.toggle("text-white");
    });

    labels.forEach((label)=> {
        label.classList.toggle("text-white")
    })

    hrs.forEach((hr) => {
        hr.classList.toggle("border-white")
    })

}

submitForm.addEventListener("submit", (e) => {

    e.preventDefault();
    

    const errand = input.value


    if(errand === "") {
        input.classList.toggle("border-danger")
        alert("Preencha o campo!")
        return;
    }   

    const listItem = document.createElement("li");

    listItem.classList.add(...["errand-list_content", "d-flex", "align-items-center", "justify-content-between"])
    listItem.innerHTML= `
   

                <p class="errand-list_item">- ${errand}</p>

                <button class="btn delete-btn btn-danger">
                    Deletar
                </button>


    `


    errandList.appendChild(listItem);

    listItem.querySelector(".delete-btn").addEventListener("click", () => {

        const confirm = window.confirm("Deseja mesmo deletar?")

        if(!confirm) return

        
        errandList.removeChild(listItem);

        setTimeout(() => {
            alert("Item removido com sucesso!");
        }, 0);
       
  
    });

    listItem.addEventListener("dblclick", () => {
        
        const taskElement = listItem.querySelector(".errand-list_item");
        const taskText = taskElement.textContent
        
        let newValue = ""
    
        const input = document.createElement("input");
        input.classList.add(...["form-control", "edit-input"]);

        input.value = taskText;

        if(taskElement) listItem.removeChild(taskElement)
        
        listItem.prepend(input)

        input.focus()

        input.addEventListener("blur", (e)=> {
            
            const confirm = window.confirm("Deseja salvar as alterações?")
            const newTaskElement = document.createElement("p");

            if(!confirm) {
                newTaskElement.textContent = taskText
                listItem.removeChild(input);
                listItem.prepend(newTaskElement)
                return;
            };

            newValue = e.target.value;
        
       
            newTaskElement.classList.add("errand-list_item")
            newTaskElement.textContent = newValue

            listItem.removeChild(input);
            listItem.prepend(newTaskElement)

            setTimeout(()=> alert("Valor atualizado!"), 0)

        })
        
        
    })

    submitForm.reset()
    
})


input.addEventListener("input", () => {
    
    const classlist = input.classList

    if(classlist.contains("border-danger")) {
        classlist.remove("border-danger")
    }

})


function fetchMessage  () {

    fetch("http://demo9104888.mockable.io/message")
    .then(res => res.json())
    .then(msg => showMessage(msg))
    .catch(err => console.log(err))

}

function showMessage(data) {

    const {message} = data

    const msgElement = document.getElementById("message")
    msgElement.innerHTML = `Sua mensagem: ${message}`

}




const userForm = document.querySelector(".user-form")

const emailInput = document.querySelector("#email")
const nameInput = document.querySelector("#name")

const errorName = document.querySelector("#error-name")
const errorEmail = document.querySelector("#error-email")

emailInput.addEventListener("input", () => {
    emailInput.classList.remove("border-danger")
    errorEmail.textContent = ""
})

nameInput.addEventListener("input", () => {
    nameInput.classList.remove("border-danger")
    errorName.textContent = ""
})

userForm.addEventListener("submit", (e) => {


    e.preventDefault();


    if(emailInput.value === "" || nameInput.value === "") {

        errorEmail.textContent = "Preencha o campo!"
        emailInput.classList.add("border-danger")
        errorName.textContent = "Preencha o campo!"
        nameInput.classList.add("border-danger")

        return;

    }
    

    const userData = {
        email: emailInput.value,
        name: nameInput.value
    }

    fetch("http://demo9104888.mockable.io/user",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => alert(data.msg))
    .catch(err => console.log(err))

    emailInput.classList.remove("border-danger")
    nameInput.classList.remove("border-danger")
    
    errorName.textContent = ""
    errorEmail.textContent = ""

    userForm.reset();

})

const fetchProducts = () => {

    fetch("http://demo9104888.mockable.io/products")
    .then(res => res.json())
    .then(data => renderProducts(data.products))
    .catch(err => console.log(err))

}

const searchInput = document.querySelector(".search-input")

const renderProducts = (products) => {

    let filteredProducts = products

    searchInput.addEventListener("input", (e) => {

        const value = e.target.value.toLowerCase();
        
        if(value) {

            filteredProducts = products.filter(p => p.name.toLowerCase().includes(value))

        } else {
            filteredProducts = products;
        }

        updateTable(filteredProducts);


    })

    updateTable(filteredProducts);

}

const updateTable = (products) => {

    tbody.innerHTML = ""; 
    


    products.forEach(product => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${product.id}</td>
            <td class="name-td">${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>
            <button class="btn mx-auto btn-danger">
                    Deletar
                </button> 
            </td>
        `;

        tbody.appendChild(tr);

        const tableDeleteBtn = tr.querySelector(".btn-danger");
        tableDeleteBtn.addEventListener("click", () => {
            const confirm = window.confirm("Deseja mesmo deletar?")

            if(!confirm) return

            tbody.removeChild(tr);

            setTimeout(() => {
                alert("Item removido com sucesso!");
            }, 0);
        });


        tr.addEventListener("dblclick", () => {
            const td = tr.querySelector(".name-td");
            const tdText = td.textContent;

            const input = document.createElement("input");
            input.classList.add("form-control", "table-edit-input");
            input.value = tdText;

            td.replaceWith(input);

            input.focus(); 

            input.addEventListener("blur", () => {

                const newValue = input.value;

                const confirm = window.confirm("Deseja salvar as alterações?")
                if(!confirm) {
                    const newTd = document.createElement("td");
                    newTd.classList.add("name-td");
                    newTd.textContent = tdText;
                    input.replaceWith(newTd);
                    return;
                }
                
                const newTd = document.createElement("td");
                newTd.classList.add("name-td");
                newTd.textContent = newValue;


                input.replaceWith(newTd);

            });
        });
    });


};


fetchProducts()