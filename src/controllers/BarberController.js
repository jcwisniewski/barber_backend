const axios = require('axios');
const Barber = require('../models/Barber');
const parseStringAsArray = require('../Utils/parseStringAsArray');

// Index, Show, Store, Update , Destroy

module.exports = {

    // Index Dev
    async index(request, response) {

        // Find all devs
        const barber = await Barber.find();

        return response.json(barber);

      
    },
    
    

    // Delete Dev
    async destroy(request, response) {

        console.log(request.params);

        // Get github username from parameters
        const { email } = request.params;

        // Search from github_username in the database
        let barber = await Barber.findOne({ email });

        if (!barber) {
            return response.status(400).json({ message: "Cliente não encontrado!" });
        }

        // Delete user
        await Barber.findOneAndDelete({ email });

        return response.json({ message: "Barbeiro deletado" });
    },

    async update(request, response) {

        console.log(request.params);

        // Get github username
        const { email } = request.params;

        // Search from github_username in the database
        let barber = await Barber.findOne({ email });

        // If username do not exists
        if (!barber) {
            return request.status(400).json({ message: "Barbeiro não encontrado!" });
        }

        // If exists, update it
        // Using the existing data and taking the new info from body parameters 
        // to update the dev data
        const {
            name = barber.name,
            telephone = barber.telephone } = request.body;

         const habilities = request.body.habilities ? parseStringAsArray(request.body.habilities): barber.habilities;

        

        // Update Dev and return the "updated" Dev
        let updatedBarber = await Barber.findOneAndUpdate({ email },
            { name, telephone, habilities },
            { new: true }
        );

        return response.json(updatedBarber);
    },

    async store(request, response) {

        console.log(request.body);

        // Get info from request
        const { name, telephone, email, habilities} = request.body;

        // Verified if the dev exist, using github_username from body parameters 
        let barber = await Barber.findOne({ email });

        if (!barber) {

          const habilitiesArray = parseStringAsArray(habilities);

            barber = await Barber.create({
               name,
               telephone,
               email,
               habilities: habilitiesArray
            });

            console.log(name, telephone, email);
        }

        return response.json(barber);
    },

    
};