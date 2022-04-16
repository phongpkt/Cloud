var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongoDB = 'mongodb://localhost:27017/NoSQLBoosterSamples';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

const CarSchema = new Schema({
    name: {type:String, required:true},
    provider : {type: Schema.Types.ObjectId, ref: 'Providers'},
    description: {type:String},
    price: {type:Number},
    picURL: {type:String}
})

module.exports = mongoose.model('Cars', CarSchema);