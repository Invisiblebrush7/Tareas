const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, () => {
	console.log('App running on port 3000');
});

app.get('/', (req, res) => {
	res.render('home');
});
