const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config', '.env.test') })

module.exports = {
    moduleFileExtensions: ['js', 'jsx'],
}
