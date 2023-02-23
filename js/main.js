const form = document.getElementById("novoItem") 
const lista = document.getElementById("lista")
/* Getting the value of the localStorage item "itens" and parsing it into an array. If there is no
value, it will return an empty array. */
const itens = JSON.parse(localStorage.getItem("itens")) || []  

/* Iterating over the array `itens` and calling the function `criaElemento` for each element. */
itens.forEach( (elemento) => {    
    criaElemento(elemento)
} )

form.addEventListener("submit", (evento) => {  
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
    }

    criaElemento(itemAtual)

    itens.push(itemAtual)

   /* Saving the array `itens` into the localStorage item "itens". */
    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
    
})

function criaElemento(item) {  
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem)
}
