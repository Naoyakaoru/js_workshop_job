document.addEventListener('DOMContentLoaded', async function(){
  const jobContainer = document.getElementById('job-pannel')
  const form = document.forms['search-job']
  const formSearch = form.querySelector('[type=submit]')
  var a = 1
  giveMeJobs('')

  const more = document.querySelector('.pagination-next')
  
  formSearch.addEventListener('click', function(e){
    var a = 1
    e.preventDefault()
    if (a==1) {
      jobContainer.innerHTML = ''
      giveMeJobs(0)
    }
  })
  more.addEventListener('click', function(){
    giveMeJobs(a)
  })
  function queryArea(p){
    if(p==''){
      const description = form.description.value
      const location = form.location.value
      const isFullTime = form.full_time.checked

      let query =`${isFullTime ? 'full_time=on' : ''}${description ? '&description=' + description : ''}${location ? '&location=' + location : ''}${p ? '&page=' + p : ''}`
      return 'https://still-spire-37210.herokuapp.com/positions.json?' + query
    }else{
      let query = `${p ? '?page=' + p : ''}`
      return 'https://still-spire-37210.herokuapp.com/positions.json' + query
    }
  }
    function giveMeJobs(x){ fetch(queryArea(x))
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
        console.log(jobRes.length)
        console.log(queryArea(x))
        if (jobRes.length == 50){
          a = a + 1
          more.removeAttribute('disabled')
        }else{
          more.setAttribute('disabled','')
        }
    })}
    
})