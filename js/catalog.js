document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('.catalog-form')
    const searchBar = document.getElementsByClassName('catalog-search-container')
    const catalogItems = document.querySelectorAll('.catalog-item-container > li')

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
    })

    searchBar[0].addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim()

        catalogItems.forEach(item => {
            const itemText = item.textContent.toLowerCase()
            const itemTags = item.dataset.tags ? item.dataset.tags.toLowerCase() : ''

            const isMatch = itemText.includes(query) || itemTags.includes(query)
            item.style.display = isMatch ? '' : 'none'
        })
    })
})