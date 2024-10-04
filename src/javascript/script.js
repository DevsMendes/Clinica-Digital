document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

// script.js

// Função para carregar o conteúdo com base na opção selecionada
function loadContent(content, activeItem) {
    const mainContent = document.getElementById("main_content");
    mainContent.innerHTML = content; // Atualiza o conteúdo do contêiner

    // Remove a classe 'active' de todos os itens
    const sideItems = document.querySelectorAll(".side-item");
    sideItems.forEach(item => {
        item.classList.remove("active");
    });

    // Adiciona a classe 'active' ao item clicado
    activeItem.classList.add("active");
}

// Função para carregar o conteúdo com base na URL da página
function loadContent(url, activeItem) {
    const mainContent = document.getElementById("main_content");

    // Usa fetch para carregar o conteúdo da página
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.text(); // Retorna o HTML da página
            } else {
                throw new Error("Erro ao carregar a página.");
            }
        })
        .then(content => {
            mainContent.innerHTML = content; // Atualiza o conteúdo do contêiner
        })
        .catch(error => {
            mainContent.innerHTML = "<p>Erro ao carregar o conteúdo.</p>"; // Exibe mensagem de erro se falhar
            console.error(error);
        });

    // Remove a classe 'active' de todos os itens
    const sideItems = document.querySelectorAll(".side-item");
    sideItems.forEach(item => {
        item.classList.remove("active");
    });

    // Adiciona a classe 'active' ao item clicado
    activeItem.classList.add("active");
}

// Adiciona o evento de clique para cada link na sidebar
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("#side_items a");
    const logoutButton = document.getElementById("logout_btn");

    // Adiciona evento de clique a cada link
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Previne o comportamento padrão do link
            const url = link.getAttribute("href"); // Obtém o URL do link
            const activeItem = link.closest(".side-item"); // Obtém o item da sidebar correspondente

            // Carrega o conteúdo correspondente usando a função fetch
            loadContent(url, activeItem); // Chama a função para carregar o conteúdo e o item ativo
        });
    });

    // Evento de clique no botão de logout
    logoutButton.addEventListener("click", () => {
        window.location.href = "index.html"; // Redireciona para a página de login
    });

    // Carrega o conteúdo inicial ao carregar a página
    loadContent("cadastraPaciente.html", links[0].closest(".side-item")); // Conteúdo inicial
});
