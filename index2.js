const app = {
    init: function(formSelector){
        this.max = 0
        document
            .querySelector(formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },
    handleSubmit : function(ev){
        const f = ev.target
        const team = {
            id : ++this.max,
            name : f.teamName.value,
        }
        console.log(team)
        f.reset()
    },
}

app.init('#teamForm')