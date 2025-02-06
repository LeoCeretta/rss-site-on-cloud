const { fetchRSSData } = require("../services/rssService");
const { saveToFile } = require("../services/fileService");

const getRSSData = async (req, res) => {
  try {
    const rssData = await fetchRSSData(); // Pega os dados do feed RSS
    const result = await saveToFile(rssData); // Salva o JSON no S3
    res.status(200).json({ message: `File saved to S3 with key: ${result}`, rssData });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch or save! " + err });
  }
};

module.exports = { getRSSData };