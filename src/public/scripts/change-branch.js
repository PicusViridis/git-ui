;(function () {
  const branchSelect = document.querySelector('.branch-select')

  if (branchSelect) {
    branchSelect.addEventListener('change', (e) => {
      location.assign(e.target.value)
    })
  }
})()
