const cityHandler = cityValue => {
    // Set the city name in lowercase
    let newCity = cityValue.toLowerCase()

    // Capitalize the city name and then return it
    newCity = newCity.charAt(0).toUpperCase() + newCity.substr(1)

    return newCity
}

module.exports = cityHandler