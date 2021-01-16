;(function () {
  const branchSelect = document.querySelector('.branch-select')

  branchSelect.addEventListener('change', (e) => {
    location.search = '?' + e.target.value
  })
})()
