const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const newsController = require('./noticiasController/controller');

const app = express();
app.use(express.json());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, () => {
	console.log('App running on port 3000');
});

app.use('/', newsController);
