const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true, //mesma função de baixo, toda vez que converter as infos em json coloca azs virtuals junto
    }
});

SpotSchema.virtual('thumbnail_url').get(function(){ //para adicionar a informação da imagem e enviar para o front
    return `http://localhost:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot',SpotSchema);