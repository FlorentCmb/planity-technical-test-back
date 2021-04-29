const nameHandler = nameValue => {
    
    let newName = nameValue
    // An array containing the number and its corresponding character
    const charactersToReplace = [['4', 'a'], ['1', 'i'], ['3', 'e'], ['0', 'o']]
    
    // Change the character to a letter if the current character is undesired (a number)
    const loop = () => {
        for (let i= 0; i < charactersToReplace.length; i++) {
            const item = charactersToReplace[i]
            if (newName.includes(item[0])) {
                if (nameValue.indexOf(item[0]) !== 0) newName = newName.replace(item[0], item[1])
                else newName = nameValue.replace(item[0], item[1].toUpperCase())
            }
            if (newName.includes(item[0])) loop()
        }
    }

    // The function will repeat itself until there's no numbers anymore
    loop()

    return newName
}

module.exports = nameHandler