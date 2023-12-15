const express = require('express');
const axios = require('axios');
const app = express();
const authenticateToken = require('../middleware/auth');


app.get('/starwars-data', authenticateToken, async (req, res) => {
    try {
        const response = await axios.get('https://swapi.dev/api/people');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao acessar a API do Star Wars', error: error.message });
    }
});
