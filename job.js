document.addEventListener('DOMContentLoaded', async function(){
  const jobContainer = document.getElementById('job-pannel')

  const getJobs = await fetch('https://still-spire-37210.herokuapp.com/positions.json')
  const jobs = await getJobs.json()

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
      return 'https://still-spire-37210.herokuapp.com/positions.json?' + query
    }
    console.log(queryArea())
    jobContainer.innerHTML = ''
    fetch(queryArea())
      .then(res => res.json())
      .then(jobRes => {
        jobRes.forEach(job => {
          const jobTemplate = document.querySelector('#job-template')
          let newJob = document.createElement('tr')
          newJob.innerHTML = jobTemplate.innerHTML
          console.log(newJob)
          newJob.querySelector('.fulltime').textContent = job.type
          newJob.querySelector('.job-url').setAttribute('href', job.url)
          newJob.querySelector('.job-url').textContent = job.title
          newJob.querySelector('.location').textContent = job.location
          newJob.querySelector('.company').textContent = job.company
          newJob.querySelector('.company').setAttribute('href', job.company_url)
          jobContainer.insertAdjacentElement('beforeend', newJob)
        })
        
    })
    

  
    

  })
})