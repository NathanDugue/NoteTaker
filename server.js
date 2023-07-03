// Must define port
const PORT = process.env.PORT || 3001;
// Must import express package
const express = require('express');
// Must declare variable app
const app = express();
// Must import routes
const htmlRoutes = require('./routes/html-routes')
const apiRoutes = require('./routes/api-routes')

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, ( ) => {
        console.log('API server is running on port ${PORT}!');


});