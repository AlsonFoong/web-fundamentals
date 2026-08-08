document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('catalog-form')
    const searchContainer = document.getElementById('catalog-search-container')
    const searchBar = document.getElementById('catalog-search')
    const searchFilter = document.getElementById('search-filter')
    const searchFilterResetButton = document.getElementById('search-filter-reset')
    const searchFilterDropdown = document.getElementById('dropdown-menu')
    const catalogItemContainer = document.getElementById('catalog-item-container')
    const catalogItems = document.querySelectorAll('#catalog-item-container > li')
    const originalItemOrder = Array.from(catalogItems)

    let shown = false
    let query = ''
    let filters = []
    let currentSort = ''

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

    function getItemData(item, key) {
        if (item.dataset[key]) {
            return item.dataset[key]
        }
        return 0
    }

    function sortItems() {
        // catalogItems is not dynamic, so directly access children
        const itemsArray = Array.from(catalogItemContainer.children)

        if (!currentSort) {
            originalItemOrder.forEach(item => catalogItemContainer.appendChild(item))
            return
        }

        itemsArray.sort((a, b) => {
            const priceA = getItemData(a, 'price')
            const priceB = getItemData(b, 'price')
            const nightsA = getItemData(a, 'nights')
            const nightsB = getItemData(b, 'nights')

            switch (currentSort) {
                case 'price-asc':
                    return priceA - priceB
                case 'price-desc':
                    return priceB - priceA
                case 'nights-asc':
                    return nightsA - nightsB
                case 'nights-desc':
                    return nightsB - nightsA
                default:
                    return 0
            }
        })

        itemsArray.forEach(item => catalogItemContainer.appendChild(item))
    }

    searchContainer.addEventListener('input', (e) => {
        if (e.target === searchBar) {
            query = searchBar.value.toLowerCase().trim()
            applyFilters()

        } else if (e.target.type === 'checkbox') {
            const value = e.target.value.toLowerCase().trim()

            if (e.target.checked) {
                filters.push(value)
            } else {
                const index = filters.indexOf(value)
                if (index > -1) {
                    filters.splice(index, 1)
                }
            }

            applyFilters()

        } else if (e.target.name === 'sort') {
            currentSort = e.target.value
            sortItems()
        }
    })

    searchFilterResetButton.addEventListener('click', (e) => {
        query = ''
        filters = []
        currentSort = ''
        applyFilters()
        sortItems()
    })
})