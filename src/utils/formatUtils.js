const cheerio = require("cheerio");

const extractImageUrl = (content) => {
  const $ = cheerio.load(content);
  const figure = $('figure').first(); // Seleciona a primeira figura
  const img = figure.find('img').first(); // Busca a imagem dentro da figura
  return img.attr('data-src') || img.attr('src'); // Tenta obter a URL da imagem
};


// Função para extrair apenas o texto entre as tags <p>
function extractParagraphText(content) {
  const $ = cheerio.load(content);

  // Seleciona apenas os textos dentro das tags <p>
  let paragraphs = [];
  $("p").each((index, elem) => {
    paragraphs.push($(elem).text());
  });

  // Junta todos os parágrafos em uma string separada por novas linhas
  return paragraphs.join("\n").trim();
}

module.exports = { extractParagraphText, extractImageUrl }