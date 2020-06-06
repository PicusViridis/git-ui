exports.getIcon = function (type, name) {
    if (type === 'folder') {
        return 'default_folder.svg'
    }
    const ext = name.split('.').pop()
    switch (ext) {
        case 'js':
            return 'file_type_js.svg'
        case 'html':
            return 'file_type_html.svg'
        case 'css':
            return 'file_type_css.svg'
        case 'sql':
            return 'file_type_sql.svg'
        case 'json':
            return 'file_type_json.svg'
        case 'lock':
            return 'file_type_yarn.svg'
        case 'gitignore':
            return 'file_type_git.svg'
        case 'ai':
            return 'file_type_ai2.svg'
        case 'psd':
            return 'file_type_photoshop2.svg'
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'bmp':
        case 'svg':
            return 'file_type_image.svg'
        case 'ogg':
            return 'file_type_audio.svg'
        case 'ttf':
        case 'woff':
            return 'file_type_font.svg'
        case 'pdf':
            return 'file_type_pdf.svg'
        case 'docx':
        case 'doc':
            return 'file_type_word2.svg'
        case 'xlsx':
        case 'xls':
            return 'file_type_excel2.svg'
        case 'txt':
            return 'file_type_text.svg'
        default:
            return 'default_file.svg'
    }
}
