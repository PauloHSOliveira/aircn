// index, show, store, update, destroy - por padrões do mvc e da comunidadea devemos criar apenas estes metodos
//index(), metodo que retorna uma listagem de sessões
//show(), para mostrar umaunica sessão
//store(), criar uma sessão
//update(), alterar - destroy(), deletar.

const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { email } = req.body;
    
        let user = await User.findOne({ email });

        if(!user) {
            user = await User.create({ email });
        }
        
        return res.json(user);
    }
};