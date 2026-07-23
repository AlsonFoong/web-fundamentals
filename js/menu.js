const menuButton = document.getElementById('menu-button')
const menu = document.getElementById('vertical-menu')
const cancelButton = document.getElementById('cancel-button')

menuButton.addEventListener('click', (e) => {
    menu.classList.add('visible')
    menuButton.setAttribute('aria-expanded', 'true')
    cancelButton.focus()
})

cancelButton.addEventListener('click', (e) => {
    menu.classList.remove('visible')
    menuButton.setAttribute('aria-expanded', 'false')
    menuButton.focus()
})
