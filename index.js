const app = {
    init(selectors) {
        this.teams = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    renderListItem(team) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = team.id
        item
            .querySelector('.teamName')
            .textContent = team.name
        item
            .querySelector('.deleteButton')
            .addEventListener('click', this.handleDelete.bind(this))
        return item
    },

    handleSubmit(ev) {
        const f = ev.target
        const team = {
            id: ++this.max,
            name: f.teamName.value,
        }
        //debugger
        this.teams.unshift(team)
        const item = this.renderListItem(team)
        this.list.insertBefore(item, this.list.firstElementChild)
        f.reset()
    },

    handleDelete(ev){
        // Delete from screen
        const item = ev.target.parentNode.parentNode.parentNode
        item.parentNode.removeChild(item)
        // Delete from list
        this.teams = this.teams.filter(team => team.id != item.dataset.id)
    },
}

app.init({
    formSelector: '#teamForm',
    listSelector: '#teamList',
    templateSelector: '.team.template',
})