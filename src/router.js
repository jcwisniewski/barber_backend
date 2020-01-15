const { Router } = require('express');
const CustomerController = require('./controllers/CustomerController');


const routes = Router();

// Métodos HTPP: GET, POST, PUT, DELETE

// Tipos de parâmetros: 

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Indentifica um recurso na alteração ou remoção)
// Body: request.body (Dados para a alterção ou criação de um registro)

// Dev

// Route to list all developers from the database
routes.get('/customers', CustomerController.index);

// Route to add a new dev to the database
routes.post('/customers', CustomerController.store);

// Route to update the info of a dev
routes.put('/customers/:telephone', CustomerController.update);

// Route to delete a dev from the database
routes.delete('/customers/:telephone', CustomerController.destroy);

// Search

// Route to list all developers within 10 km and by technical knowledge
//routes.get('/search', SearchController.index);

module.exports = routes;