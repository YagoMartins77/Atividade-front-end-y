// ================================================================
// app.js - Arquivo JavaScript da Pizzaria Fatec
// Manipula o carrinho, adiciona itens, calcula total e atualiza DOM
// ================================================================

// MODIFICAÇÃO 1: Inicia o carrinho com os dados salvos ou vazio se não houver nada
let carrinho = JSON.parse(localStorage.getItem("carrinho-fatec")) || [];

// Seleciona todos os botões de "Pedir Agora"
const botoes = document.querySelectorAll(".botao-pedir");

// Seletores do carrinho
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total");

// MODIFICAÇÃO 2: Função para salvar o estado atual do carrinho no navegador
function salvarNoLocalStorage() {
    localStorage.setItem("carrinho-fatec", JSON.stringify(carrinho));
}

// ================================================================
// Função: atualizarCarrinho()
// Atualiza visualmente a lista e soma total.
// ================================================================
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";  // limpa a lista antes de atualizar
    let soma = 0;

    carrinho.forEach((item, index) => {
        soma += item.preco;

        // cria um elemento de item
        const li = document.createElement("li");
        li.classList.add("item-carrinho");
        
        li.innerHTML = `
            <span>${item.sabor} — R$ ${item.preco.toFixed(2)}</span>
            <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
        `;
        
        listaCarrinho.appendChild(li);
    });

    totalCarrinho.textContent = `Total: R$ ${soma.toFixed(2)}`;
    
    // MODIFICAÇÃO 3: Sempre que o carrinho atualizar na tela, ele salva no LocalStorage
    salvarNoLocalStorage();
}

// ================================================================
// Função: removerItem(index)
// Remove uma pizza específica do array pelo seu índice e atualiza a tela.
// ================================================================
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho(); // Aqui dentro ele já atualiza a tela e salva no LocalStorage
}

// ================================================================
// EVENTO: ao clicar em qualquer botão de pizza
// ================================================================
botoes.forEach(botao => {

    botao.addEventListener("click", function(event) {
        event.preventDefault(); // impede reload da página

        // Lê dados do HTML via data-*
        let sabor = this.dataset.sabor;
        let preco = Number(this.dataset.preco);

        // Cria objeto da pizza pedida
        let pedido = { sabor, preco };

        // Adiciona ao array
        carrinho.push(pedido);

        // Atualiza a interface
        atualizarCarrinho();
    });
});

// MODIFICAÇÃO 4: Executa a função ao carregar a página pela primeira vez
// Isso garante que se o usuário der F5, os itens salvos apareçam na tela imediatamente
atualizarCarrinho();