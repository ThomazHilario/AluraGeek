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

    // inserindo a div na estrutura html
    inserirProduto(cardProduto.img, cardProduto.nome, cardProduto.preco)

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
}

loadProdutos()

// inserir Produto
function inserirProduto(img, nome, preco){
    let card = `
        <div id="card">
            <img src="${img}" alt="imagem do produto adicionado" />

            <p>${nome}</p>  

            <div id="container__card__infos">
                <p>${preco} R$</p>
                <i data-lucide="trash-1"></i>
            </div>
        </div>
    `

    container__card__produto.innerHTML += card    
}