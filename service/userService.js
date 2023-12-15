const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.senha, 10); // Criptografando a senha
        const user = await User.create({
            ...req.body,
            senha: hashedPassword
        });
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ message: "Erro ao criar usuário", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).send({ message: 'Usuário não encontrado' });
        }
        const isMatch = await bcrypt.compare(req.body.senha, user.senha);
        if (!isMatch) {
            return res.status(401).send({ message: 'Senha incorreta' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' } 
        );

        res.status(200).send({ token });

    } catch (error) {
        res.status(500).send({ message: 'Erro no servidor', error: error.message });
    }
};