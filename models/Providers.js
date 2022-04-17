var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongoDB = 'mongodb://localhost:27017/NoSQLBoosterSamples';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

const ProviderSchema = new Schema({
    name: {type:String, required:true},
    phoneNumber: {type:String},
    email: {type:String},
    address: {type:String},
    picture: {type:String},
    product : {type: Schema.Types.ObjectId, ref: 'Cars'}
})

module.exports = mongoose.model('Providers', ProviderSchema);