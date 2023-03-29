const rootStyles = window.getComputedStyle(document.documentElement);

if(rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') != '') {
    ready()
} else {
    document.getElementById('main-css').addEventListener('load', ready)
}
// check is required as main.css calls book.css which means
// main.css will load first so there is a possibility that 
//the the variable is not set yet
function ready() {
    const coverWidth = rootStyles.getPropertyValue('--book-cover-width-large')
    const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
    const coverHeight = coverWidth/coverAspectRatio
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    )

    FilePond.setOptions({
        stylePanelAspectRatio: coverAspectRatio,
        imageResizeTargetWidth: coverWidth,
        imageResizeTargetHeight: coverHeight
    })
    FilePond.parse(document.body)
}