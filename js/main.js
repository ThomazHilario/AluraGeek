const formulario = document.getElementById('form_inserir')
const button_guardar = document.getElementById('button_guardar')
const titulo__produto = document.getElementById('titulo__produto')
const container__card__produto = document.getElementById('container__card__produto')

// array de produtos
let produtos = localStorage.getItem('produtos') !== null ? JSON.parse(localStorage.getItem('produtos')) : []

formulario.addEventListener('submit' , (e) => {
    e.preventDefault()

    // Criando um objeto com os valores do input
    let cardProduto = {
        nome: e.target.elements['inome'].value,
        preco: e.target.elements['ipreco'].value,
        img: e.target.elements['iImagem'].value
    } 

    // Adicionando o card dentro do array de produtos
    produtos.push(cardProduto)

    if(produtos.length > 0){
        titulo__produto.textContent = 'Meus Produtos:'
    }

    // inserindo a div na estrutura html
    inserirProduto(cardProduto.img, cardProduto.nome, cardProduto.preco)

    // Percorrendo cada img para adicionar a function de deletar
    deleteCard()

    // Salvando na localStorage
    localStorage.setItem('produtos', JSON.stringify(produtos))

    // limpando os inputs
    e.target.elements['inome'].value = ''
    e.target.elements['ipreco'].value = ''
    e.target.elements['iImagem'].value = ''
})

// Carregar produtos da localStorage
function loadProdutos(){
    
    if(produtos.length > 0){
        titulo__produto.textContent = 'Meus produtos:'

        produtos.forEach(card => {
            
            inserirProduto(card.img, card.nome, card.preco)
        });
    }

    deleteCard()
}

loadProdutos()

// inserir Produto
function inserirProduto(img, nome, preco){
    let card = `
        <div class="card">
            <img src="${img}" alt="imagem do produto adicionado" />

            <p>${nome}</p>  

            <div id="container__card__infos">
                <p>${preco} R$</p>
                <img class="button__delete" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS14Ij48cGF0aCBkPSJNMTggNiA2IDE4Ii8+PHBhdGggZD0ibTYgNiAxMiAxMiIvPjwvc3ZnPg==" />
            </div>
        </div>
    `

    container__card__produto.innerHTML += card    
}

// deleteCard
function deleteCard(){
    const button__delete = document.querySelectorAll('.button__delete')

    button__delete.forEach((button) => {
        button.addEventListener('click', (e) => {
    
            // Pegando o card
            const myCardSelect = e.target.parentElement.parentElement

            // removendo do container de cards
            container__card__produto.removeChild(myCardSelect)

            // Array para guardar os produtos restantes
            let newProdutos = []

            // Percorrendo os produtos restantes
            document.querySelectorAll('.card').forEach((card) => {
                // Criando um objeto para cada produto
                let myProduto = {
                    name:card.firstElementChild.nextElementSibling.textContent,
                    preco:card.lastElementChild.firstElementChild,
                    img:card.firstElementChild.src
                }

                // Jogando para dentro do array de newProdutos
                newProdutos.push(myProduto)
            })


            // Salvando na localStorage a nova lista
            localStorage.setItem('produtos', JSON.stringify(newProdutos))

            
        })
    })

    // Alterando o titulo
}

