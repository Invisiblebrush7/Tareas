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

app.get('/', getTopHeadlines, (req, res) => {
	res.render('home', { articles: req.params.articles });
});

module.exports = app;
