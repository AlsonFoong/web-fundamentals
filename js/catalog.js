document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('catalog-form')
    const searchContainer = document.getElementById('catalog-search-container')
    const searchBar = document.getElementById('catalog-search')
    const searchFilter = document.getElementById('search-filter')
    const searchFilterResetButton = document.getElementById('search-filter-reset')
    const searchFilterDropdown = document.getElementById('dropdown-menu')
    const catalogItems = document.querySelectorAll('#catalog-item-container > li')

    let shown = false
    let query = ''
    let filters = []

    searchFilter.addEventListener('click', (e) => {
        if (!shown) {
            searchFilterDropdown.classList.add('visible')
            searchFilter.setAttribute('aria-expanded', 'true')
        } else {
            searchFilterDropdown.classList.remove('visible')
            searchFilter.setAttribute('aria-expanded', 'false')
        }
        shown = !shown
    })

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
    })

    function applyFilters() {
        catalogItems.forEach(item => {
            const itemText = item.textContent.toLowerCase()
            const itemTags = item.dataset.tags ? item.dataset.tags.toLowerCase() : ''

            const matchesQuery = !query || itemText.includes(query) || itemTags.includes(query)
            const matchesFilters = filters.every(filter => itemTags.includes(filter))

            item.style.display = (matchesQuery && matchesFilters) ? '' : 'none'
        })
    }

    searchContainer.addEventListener('input', (e) => {
        if (e.target === searchBar) {
            query = searchBar.value.toLowerCase().trim()
        } else {
            // Must be a checkbox
            const value = e.target.value.toLowerCase().trim()
            if (e.target.checked) {
                filters.push(value)
            } else {
                filters.splice(filters.indexOf(value), 1)
            }
        }
        applyFilters()
    })

    searchFilterResetButton.addEventListener('click', (e) => {
        query = ''
        filters = []
        applyFilters()
    })
})