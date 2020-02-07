const User = require('../models/User')
const Spot = require('../models/Spot');

module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },//Listar spots por tech

    async store(req, res) { //Cadastrar Spot
        const { filename } = req.file;
        const { company, techs, price} = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user) {
            return res.status(400).json({message: 'User doenst not exists'});
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return res.json(spot);
    }
}