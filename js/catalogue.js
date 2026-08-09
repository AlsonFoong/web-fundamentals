document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('catalogue-form')
    const searchContainer = document.getElementById('catalogue-search-container')
    const searchBar = document.getElementById('catalogue-search')
    const searchFilter = document.getElementById('search-filter')
    const searchFilterResetButton = document.getElementById('search-filter-reset')
    const searchFilterDropdown = document.getElementById('dropdown-menu')
    const catalogueItemContainer = document.getElementById('catalogue-item-container')
    const catalogueItems = document.querySelectorAll('#catalogue-item-container > li')
    const originalItemOrder = Array.from(catalogueItems)

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
        catalogueItems.forEach(item => {
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
        // catalogueItems is not dynamic, so directly access children
        const itemsArray = Array.from(catalogueItemContainer.children)

        if (!currentSort) {
            originalItemOrder.forEach(item => catalogueItemContainer.appendChild(item))
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

        itemsArray.forEach(item => catalogueItemContainer.appendChild(item))
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