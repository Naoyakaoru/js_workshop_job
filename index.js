document.addEventListener('DOMContentLoaded', function() {
  const hambg = document.querySelector('#navbar-burger')
  const navBarMenu = document.querySelector('#navbar-menu')
  hambg.addEventListener('click', function(){
    hambg.classList.toggle('is-active')
    navBarMenu.classList.toggle('is-active')
  })
})