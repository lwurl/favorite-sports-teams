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
            .querySelector('.editButton')
            .addEventListener('click', this.handleEdit.bind(this))
        item
            .querySelector('.deleteButton')
            .addEventListener('click', this.handleDelete.bind(this))
        item
            .querySelector('.favoriteButton')
            .addEventListener('click', this.handleFavorite.bind(this))
        item
            .querySelector('.upButton')
            .addEventListener('click', this.handleArrowUp.bind(this))
        item
            .querySelector('.downButton')
            .addEventListener('click', this.handleArrowDown.bind(this))
        return item
    },

    handleSubmit(ev) {
        const f = ev.target
        const team = {
            id: ++this.max,
            name: f.teamName.value,
            fav: false,
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

    handleFavorite(ev){
        const item = ev.target.parentNode.parentNode.parentNode
        const index = this.teams.findIndex(function(team){
            return team.id == item.dataset.id
        })
        if (!this.teams[index].fav){
            item.style.backgroundColor = "#ffae00";
            this.teams[index].fav = true;
        }
        else{
            item.style.backgroundColor = "#f5f5f5";
            this.teams[index].fav = false;
        }
    },

    handleArrowUp(ev){
        const item = ev.target.parentNode.parentNode.parentNode
        const prevItem = item.previousSibling
        const index = this.teams.findIndex(function(team){
            return team.id == item.dataset.id
        })
        if (index == 0)
            return
        const prevIndex = this.teams.findIndex(function(team){
            return team.id == prevItem.dataset.id
        })
        // Swap DOM's
        item.parentNode.removeChild(item)
        prevItem.parentNode.insertBefore(item, prevItem)
        // Swap in array
        const currListItem = this.teams[index]
        this.teams[index] = this.teams[prevIndex]
        this.teams[prevIndex] = currListItem
    },

    handleArrowDown(ev){
        const item = ev.target.parentNode.parentNode.parentNode
        const nextItem = item.nextSibling
        const index = this.teams.findIndex(function(team){
            return team.id == item.dataset.id
        })
        if (index == this.teams.length - 1)
            return
        const nextIndex = this.teams.findIndex(function(team){
            return team.id == nextItem.dataset.id
        })
        // Swap DOM's
        item.parentNode.removeChild(nextItem)
        item.parentNode.insertBefore(nextItem, item)
        // Swap in array
        const currListItem = this.teams[index]
        this.teams[index] = this.teams[nextIndex]
        this.teams[nextIndex] = currListItem
    },

    handleEdit(ev){
        const toEdit = ev.target.parentNode.parentNode.parentNode.querySelector('.teamName')
        if (toEdit.getAttribute('contenteditable') == 'false')
            toEdit.setAttribute('contenteditable', true)
        else
            toEdit.setAttribute('contenteditable', false)
    }
}

app.init({
    formSelector: '#teamForm',
    listSelector: '#teamList',
    templateSelector: '.team.template',
})