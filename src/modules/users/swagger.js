const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Metadata info about our API
const options ={
    definition:{
        openapi: "3.0.0",
        info: { title: 'VideoApp', version: '1.0.0' },
    },
    apis: ['src/modules/users/routes.js'],
};

//Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
    app.use('api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('api/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    });

    console.log(`Version 1 Docs available at http://localhost:${port}/api/users/docs`);
}

module.exports = {swaggerDocs}