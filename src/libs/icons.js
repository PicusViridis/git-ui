const icons = require('./icons.json')

exports.getIcon = function (type, name) {
    if (type === 'folder') {
        return 'default_folder.svg'
    }
    const ext = name.split('.').pop()
    return icons[ext] || 'default_file.svg'
}
