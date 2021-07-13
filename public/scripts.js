const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')
const apiUrl = 'http://localhost:3000'


async function getElements() {

    const findElements = await (await fetch(apiUrl)).json()
    findElements.find(({name, url}) => {

        
        addElement({name, url})
    })
}
getElements()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

async function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?')){
        const name = el.parentNode.querySelector("a").innerHTML
        const url = el.parentNode.querySelector("a").href
        
        el.parentNode.remove()
        await fetch(`${apiUrl}?name=${name}&url=${url}&del=1`)
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    input.value = ""

    addElement({ name, url })
    
    await fetch(`${apiUrl}?name=${name}&url=${url}/`)
})