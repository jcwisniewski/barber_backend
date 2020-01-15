const axios = require('axios');
const Customer = require('../models/Customer');

// Index, Show, Store, Update , Destroy

module.exports = {

    // Index Dev
    async index(request, response) {

        // Find all devs
        const customer = await Customer.find();

        return response.json(customer);

      
    },
    
    async store(request, response) {

        console.log(request.body);

        // Get info from request
        const { telephone, name, email} = request.body;

        // Verified if the dev exist, using github_username from body parameters 
        let customers = await Customer.findOne({ telephone });

        if (!customers) {

          
            customers = await Customer.create({
               name,
               telephone,
               email
            });

            console.log(name, telephone, email);
        }

        return response.json(customers);
    },

    // Delete Dev
    async destroy(request, response) {

        console.log(request.params);

        // Get github username from parameters
        const { telephone } = request.params;

        // Search from github_username in the database
        let customers = await Customer.findOne({ telephone });

        if (!customers) {
            return response.status(400).json({ message: "Cliente não encontrado!" });
        }

        // Delete user
        await Customer.findOneAndDelete({ telephone });

        return response.json({ message: "Cliente deletado" });
    },

    async update(request, response) {

        console.log(request.params);

        // Get github username
        const { telephone } = request.params;

        // Search from github_username in the database
        let customers = await Customer.findOne({ telephone });

        // If username do not exists
        if (!customers) {
            return request.status(400).json({ message: "Cliente não encontrado!" });
        }

        // If exists, update it
        // Using the existing data and taking the new info from body parameters 
        // to update the dev data
        const {
            name = customers.name,
            email = customers.email } = request.body;

    

        

        // Update Dev and return the "updated" Dev
        let updatedCustomer = await Customer.findOneAndUpdate({ telephone },
            { name, telephone, email },
            { new: true }
        );

        return response.json(updatedCustomer);
    },

    
};