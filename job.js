document.addEventListener('DOMContentLoaded', async function(){
  const jobTemplate = document.getElementById('job-template')
  const jobContainer = document.getElementById('job-pannel')

  const getJobs = await fetch('https://still-spire-37210.herokuapp.com/positions.json')
  const jobs = await getJobs.json()
  console.log(jobs)

  const form = document.forms['search-job']

  const formSearch = form.querySelector('[type=submit]')
  formSearch.addEventListener('click', function(e){
    e.preventDefault()
    function queryArea(){
      const description = form.description.value
      const location = form.location.value
      const isFullTime = form.full_time.checked
      let currentLocation = window.location.href

      let query =`${isFullTime ? 'full_time=on' : ''}${description ? '&description=' + description : ''}${location ? '&location=' + location : ''}`
      currentLocation = '/' + query
      return 'https://still-spire-37210.herokuapp.com/positions.json?' + query
    }
    console.log(queryArea())
    fetch(queryArea())
      .then(res => res.json())
      .then(jobRes => {
        console.log(jobRes)
      } )
    
  })
})