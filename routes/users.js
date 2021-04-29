// Require librairies
const router = require('express').Router()
const { JsonBox } = require('jsonbox-node')
const axios = require('axios')
// Import external function
const nameHandler = require('../func/nameHandler')
const cityHandler = require('../func/cityHandler')

router.get('/', async (req, res) => {

    // JSONBox settings
    const jbn = new JsonBox()
    const jsonBoxToken = "box_0db6d0b61a698ad83a7d"

    try {
        /* 1) We get the shuffled JSON datas */
        const informationsDatas = await axios.get('https://recrutement-practice-default-rtdb.firebaseio.com/informations.json')
            .then(response => response.data)
    
        const jobsDatas = await axios.get('https://recrutement-practice-default-rtdb.firebaseio.com/jobs.json')
            .then(response => response.data)
    
        const usersDatas = await axios.get('https://recrutement-practice-default-rtdb.firebaseio.com/users.json')
            .then(response => response.data)
        
        /* 2) Sort the data */
        let sortedDatas = []
        for (let item of Object.keys(usersDatas)) {
            // This will be the object containing the infos of the current user
            let currentUser = {}
            // Get the name of the user, and change it if needed
            if ("name" in usersDatas[item] && usersDatas[item].name !== "#ERROR") {
                currentUser = {
                    name : nameHandler(usersDatas[item].name)
                }
            }
            // As there's names in another JSON file, check the other names too
            if (jobsDatas[item] && "name" in jobsDatas[item] && !("name" in currentUser) && jobsDatas[item].name !== "#ERROR") {
                currentUser = {
                    name: nameHandler(jobsDatas[item].name)
                }
            }

            // Add the age to the current user
            if (informationsDatas[item] && "age" in informationsDatas[item]) {
                currentUser = {
                    ...currentUser,
                    age: informationsDatas[item].age,
                }
            }

            // Change the city name and add it to the user object
            if (informationsDatas[item] && "city" in informationsDatas[item]) {
                currentUser = {
                    ...currentUser,
                    city: cityHandler(informationsDatas[item].city),
                }
            }

            // Add the job the the users
            if (jobsDatas[item] && "job" in jobsDatas[item]) {
                currentUser = {
                    ...currentUser,
                    job: jobsDatas[item].job
                }
            }
            // Same condition with another file because there's a job in informations
            else if (informationsDatas[item] && "job" in informationsDatas[item]) {
                currentUser = {
                    ...currentUser,
                    job: informationsDatas[item].job
                }
            }

            // Push the current user into the final array
            sortedDatas.push(currentUser)
            await jbn.create(currentUser, jsonBoxToken)
        }

        // The response sent by the server
        res.send(`Data successfully sorted and sanitized. Check https://jsonbox.io/${jsonBoxToken}`).status(200)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


module.exports = router