document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const errorMessage = document.getElementById('error-message');
    const filterButton = document.getElementById('filterButton');
    const blur = document.querySelector('.blur');
    const ageCheckPopup = document.getElementById('age-check-popup');
    const accessDeniedMessage = document.getElementById('access-denied-message');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    let isFiltered = false;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    const fetchNews = async () => {
        try {
            const response = await fetch('44.214.89.65:3000/rss');
            const data = await response.json();
            displayNews(data.rssData);
        } catch (err) {
            console.error('Erro ao buscar o feed RSS:', err);
            errorMessage.style.display = 'block';
        }
    };

    const displayNews = (rssData) => {
        newsContainer.innerHTML = '';
        const dataToDisplay = isFiltered ? filterInappropriateNews(rssData) : rssData;

        if (dataToDisplay && dataToDisplay.length > 0) {
            errorMessage.style.display = 'none';
            dataToDisplay.forEach(newsItem => {
                const newsElement = document.createElement('div');
                newsElement.classList.add('news-item');
                newsElement.innerHTML = `
                    <img src="${newsItem.image || 'https://via.placeholder.com/150?text=Imagem+n%C3%A3o+dispon%C3%ADvel'}" alt="${newsItem.title || 'Imagem indisponível'}" />
                    <h2>${newsItem.title || 'Título indisponível'}</h2>
                    <p>Publicado em: ${formatDate(newsItem.pubDate) || 'Data indisponível'}</p>
                    <a href="${newsItem.link || '#'}" target="_blank" class="read-more-button">Ler mais</a>
                `;
                newsContainer.appendChild(newsElement);
            });
        } else {
            errorMessage.style.display = 'block';
        }
    };

    const filterInappropriateNews = (rssData) => {
        const inappropriateWords = ["A Fazenda 16"]; //exemplo de possibilidade de inclusão de parâmetros
        return rssData.filter(item => {
            const title = item.title || '';
            const contentSnippet = item.contentSnippet || '';
            return !inappropriateWords.some(word => 
                title.includes(word) || contentSnippet.includes(word)
            );
        });
    };

    // exibir pop-up de verificação de idade
    blur.style.display = 'block';
    ageCheckPopup.style.display = 'block';

    // resposta para o botão "Sim"
    yesButton.addEventListener('click', () => {
        blur.style.display = 'none';
        ageCheckPopup.style.display = 'none';
        fetchNews(); // carregar as notícias
    });

    // resposta para o botão "Não"
    noButton.addEventListener('click', () => {
        blur.style.display = 'block'; // Exibir blur
        accessDeniedMessage.style.display = 'block'; // Exibir mensagem de acesso negado
        newsContainer.innerHTML = ''; // ocultar notícias
        errorMessage.style.display = 'none'; // garantir que a mensagem de erro não apareça
    });

    // adiciona event listener ao botão de filtro
    filterButton.addEventListener('click', () => {
        if (accessDeniedMessage.style.display === 'block') {
            return; // impede filtro se acesso for negado
        }
        isFiltered = !isFiltered; // Alterna o estado do filtro
        fetchNews(); // Recarrega as notícias com o estado atualizado
    });
});



























