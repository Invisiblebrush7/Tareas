const fetch = require('node-fetch');
const app = require('express')();

require('dotenv').config();

async function getTopHeadlines(req, res, next) {
	const mainUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`;

	const response = await fetch(mainUrl);
	const data = await response.json();
	const articles = data.articles;
	req.params.articles = articles;

	next();
}
// GET https://newsapi.org/v2/everything?q=bitcoin&apiKey=a485fbb1050f4a1faf3fbe99fc2c0f43
async function getNewsWithQuery(req, res, next) {
	const mainUrl = `https://newsapi.org/v2/everything?q=${req.query['q']}&apiKey=${process.env.API_KEY}`;

	const response = await fetch(mainUrl);
	const data = await response.json();
	const articles = data.articles;
	req.params.articles = articles;

	next();
}

app.get('/', getTopHeadlines, (req, res) => {
	res.render('home', { articles: req.params.articles });
});
app.get('/api/news', getTopHeadlines, (req, res) => {
	res.send(req.params.articles);
});

app.get('/search', getNewsWithQuery, (req, res) => {
	if (req.query['q'] === '') {
		res.redirect('/');
	} else {
		res.render('search', { articles: req.params.articles, query: req.query['q'] });
	}
});
app.get('/api/search', getNewsWithQuery, (req, res) => {
	if (req.query['q'] === '') {
		res.redirect('/');
	} else {
		res.send(req.params.articles);
	}
});

module.exports = app;
