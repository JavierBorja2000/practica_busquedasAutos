//variables
const $marca = document.querySelector("#marca")
const $year = document.querySelector("#year")
const $minimo = document.querySelector("#minimo")
const $maximo = document.querySelector("#maximo")
const $puertas = document.querySelector("#puertas")
const $transmision = document.querySelector("#transmision")
const $color = document.querySelector("#color")

const $resultado = document.querySelector("#resultado")


//años maximos y minimos que vendera la agencia
const max = new Date().getFullYear()
const min = max - 10

//generar el objeto para las busquedas
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//eventos 
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos); // muestra los automoviles a cargar
    llenarSelect(); //genera los años del select
})

 // Event listener para los select de búsqueda
 $marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAutos()
 })
 $year.addEventListener("change", e => {
    datosBusqueda.year = parseInt(e.target.value)
    filtrarAutos()
 })
 $minimo.addEventListener("change", e => {
     datosBusqueda.minimo = parseInt(e.target.value)
     filtrarAutos()
 })
 $maximo.addEventListener("change", e => {
    datosBusqueda.maximo = parseInt(e.target.value)
    filtrarAutos()
})
$puertas.addEventListener("change", e => {
    datosBusqueda.puertas = parseInt(e.target.value)
    filtrarAutos()
})
$transmision.addEventListener("change", e => {
    datosBusqueda.transmision = e.target.value
    filtrarAutos()
})
$color.addEventListener("change", e => {
    datosBusqueda.color = e.target.value
    filtrarAutos()
})


//Funciones 
function mostrarAutos(autos){
    limpiarHTML() //Limpia los resultados HTML antes de colcer a iterar
    autos.forEach(({marca, modelo, year, puertas, transmision, precio, color}) => {
        const autoHTML = document.createElement("p")

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision ${transmision} - Precio: ${precio} - Color: ${color}
        `

        $resultado.appendChild(autoHTML)
    })
}

function limpiarHTML(){
    while ($resultado.firstChild) {
        $resultado.removeChild($resultado.firstChild);
    }
}

function llenarSelect(){
    for(let i = max; i >= min; i--){
        const opcion = document.createElement("option")
        opcion.value = i
        opcion.textContent = i
        year.appendChild(opcion)
    }
}


function filtrarAutos(){
    const resultados = autos.filter(filtrarMarca)
                            .filter(filtrarYear)
                            .filter(filtrarMinimo)
                            .filter(filtrarMaxima)
                            .filter(filtrarPuertas)
                            .filter(filtrarTransmision)
                            .filter(filtrarColor)

    console.log(resultados)

    if(resultados.length != 0){
        mostrarAutos(resultados)
    }else{
        noResultados()
    }
}

function filtrarMarca(auto){
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca
    }
    return auto
}

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === datosBusqueda.year
    }
    return auto
}

function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo
    }
    return auto
}

function filtrarMaxima(auto){
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo
    }
    return auto
}

function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas
    }
    return auto
}

function filtrarTransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision
    }
    return auto
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color
    }
    return auto
}

function noResultados(){
    const noResultados = document.createElement("p")
    noResultados.textContent = "No se encontro ningun resultado :("
    noResultados.style.background = "white"
    noResultados.style.letterSpacing = "1.5px"

    limpiarHTML()
    $resultado.appendChild(noResultados)

}