const axios = require('axios');

exports.getData = async (req, res) => {
    try {
        const response = await axios.get('https://swapi.dev/api/people');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao acessar a API do Star Wars', error: error.message });
    }
};
