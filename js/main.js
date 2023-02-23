const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
/* Getting the value of the localStorage item "itens" and parsing it into an array. If there is no
value, it will return an empty array. */
const itens = JSON.parse(localStorage.getItem("itens")) || [];

/* Iterating over the array `itens` and calling the function `criaElemento` for each element. */
itens.forEach( (elemento) => {    
    criaElemento(elemento);
} );

form.addEventListener("submit", (evento) => {  
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    /* Checking if there is an element in the array `itens` that has the same name as the one that was typed in the input. */
    const existe = itens.find(elemento => elemento.nome === nome.value);
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
        };

    if(existe){
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);

        /* Replacing the element in the array `itens` that has the same id as the element that was clicked. */
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;

        criaElemento(itemAtual);
        itens.push(itemAtual);
    }

   /* Saving the array `itens` into the localStorage item "itens". */
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
    
})

function criaElemento(item) {  
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
};

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
};

function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
};

function deletaElemento(tag, id){
    tag.remove();

    /* Removing the element from the array `itens` that has the same id as the element that was clicked. */
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem("itens", JSON.stringify(itens));
};