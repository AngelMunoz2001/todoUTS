console.log("Conectado");
const formulario = document.getElementById('formulario') //Const: No puede cambiar el contenido
const listaTareas = document.getElementById('lista-tareas')
const templete = document.getElementById('template').content //Sol para seleccionar el contenido 
const fragment = document.createDocumentFragment()

//Let: Puede ir cambiando su contenido
let tareas = {}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Cargo la pagina')
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
        pintarTareas()
    }
})

listaTareas.addEventListener('click', e =>{
    btnAcciones(e)
})

formulario.addEventListener('submit', e =>{
    e.preventDefault()
    setTarea(e)
})

const setTarea = e =>{
    const texto = e.target.querySelector('input').value
    //console.log(texto)
    if(texto.trim()== ''){
        console.log('cadena vacia')
        return 
    } 
    const tarea = {
        id: Date.now(),
        texto,
        estado: false
    }
    console.log('Tarea', tarea)
    tareas[tarea.id] = tarea
    pintarTareas()
    formulario.reset()
    e.target.querySelector('input').focus()
}

const pintarTareas = ()=>{
    localStorage.setItem('tareas',JSON.stringify(tareas))
    //=== significa que el dato y el tipo de dato se comparan
    if(Object.values(tareas).length === 0){
        listaTareas.innerHTML = 
        `<div class="alert alert-dark">Sin tareas pendientes 🤳</div></div>`

            return
    }

    listaTareas.innerHTML = ''
    Object.values(tareas).forEach(item =>{
        //console.log('item',item)
        const clone = templete.cloneNode(true)
        //querySelector toma las etiquetas y no el id
        clone.querySelector('p').textContent = item.texto
        if(item.estado){
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration =  'line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id = item.id
        clone.querySelectorAll('.fas')[1].dataset.id = item.id
        fragment.appendChild(clone)
    })
    listaTareas.appendChild(fragment)
}

const btnAcciones = e =>{
    if(e.target.classList.contains('fa-check-circle')){
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
    }
    
    if(e.target.classList.contains('fa-undo-alt')){
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }

    if(e.target.classList.contains('fa-minus-circle')){
        delete tareas[e.target.dataset.id]
        pintarTareas()
    }

    e.stopPropagation();
}