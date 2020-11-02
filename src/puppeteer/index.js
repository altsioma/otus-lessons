const express = require('express');
const app = express();
const puppeteerRenderer = require('puppeteer-renderer-middleware');
app.use(
	puppeteerRenderer({
		url: 'http://localhost:8080/renderer',
	}),
);

app.use(express.static('@/../dist'));

app.use((req, res) => res.redirect('/'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));