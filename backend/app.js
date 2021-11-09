//importer express
const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const path        = require('path');
const sauceRoutes = require('./routes/sauce');
const userRoutes  = require ('./routes/user');



mongoose.connect('mongodb+srv://piquante:piquante@cluster0.5calt.mongodb.net/test',

  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(()  => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//le "*" veut dire : accéder à notre API depuis n'importe quelle origine (pour tout le monde)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();//ne pas oublier d'appeler next pour pouvoir passer l'execution au middleware d'apres
});

app.use(bodyParser.json());//transforme le corps de la requete en objet javascript utilisable

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//la on exporte cette const pour qu'on puisse y accèder depuis nos autres fichier
module.exports = app;