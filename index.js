const form = document.querySelector('form')
//let teams = document.querySelectorAll('li')
let teamsList = []

const createListElement = function(data){
    const element = document.createElement('li')
    element.textContent = data
    element.addEventListener('click', handleClick)
    return element
}

const handleClick = function(ev){
    const parent = ev.target.parentElement
    parent.removeChild(ev.target)
    var index = teamsList.indexOf(ev.target.textContent)
    if (index !== -1)
        teamsList.splice(index, 1)
}

const handleSubmit = function(event){
    event.preventDefault()
    const f = event.target
    const teamName = f.teamName.value
    const list = document.querySelector('#teams')
    list.appendChild(createListElement(teamName))
    teamsList.push(teamName)
    teams = document.querySelectorAll('li')

    f.reset()
    f.teamName.focus()
}

form.addEventListener('submit', handleSubmit)