document.addEventListener('DOMContentLoaded', async function(){
  const jobContainer = document.getElementById('job-pannel')

  const getJobs = await fetch('https://still-spire-37210.herokuapp.com/positions.json')
  const jobs = await getJobs.json()

  const form = document.forms['search-job']
  const formSearch = form.querySelector('[type=submit]')

  formSearch.addEventListener('click', function(e){
    e.preventDefault()
    let a = 1
    const more = document.querySelector('.pagination-next')
    function queryArea(p){
      const description = form.description.value
      const location = form.location.value
      const isFullTime = form.full_time.checked

      let query =`${isFullTime ? 'full_time=on' : ''}${description ? '&description=' + description : ''}${location ? '&location=' + location : ''}${p ? '&page=' + p : ''}`
      return 'https://still-spire-37210.herokuapp.com/positions.json?' + query
    }
    jobContainer.innerHTML = ''
    fetch(queryArea())
      .then(res => res.json())
      .then(jobRes => {
        if (jobRes.length = 50){
          a = a + 1
          more.removeAttribute('disabled')
          more.addEventListener('click', function(){
            console.log(queryArea(a))
            fetch(queryArea(a))
              .then(res => res.json())
              .then(jobRes => {
                console.log(jobRes)
              })
          })
        }
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