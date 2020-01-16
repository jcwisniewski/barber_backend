module.exports = function parseStringAsArray( arrayAsString) {
    return arrayAsString.split(',').map(habilities => habilities.trim());
}