//const { getElement } = require("dropzone");
const divError = document.querySelector("#divError");
const dropArea = document.querySelector('.drop');
const dragText = dropArea.querySelector('h2');
const button = document.querySelector('.btn-drop');
const input = dropArea.querySelector('#input-file');

let files;
let archivo= false;

button.addEventListener('click', e => {
    console.log("click");
});

//Cada vez que cambia un archivo aplica la clase
input.addEventListener("change", (e) => { 
    files = this.files
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
})

//Cuando arrastremos dentro de la zona
dropArea.addEventListener("dragover", (e) => { 
    e.preventDefault();
    dropArea.classList.add("active")
    dragText.textContent = "Suelta tus archivos!"

})
//Cuando arrastremos fuera de la zona
dropArea.addEventListener("dragleave", (e) => { 
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra tus archivos aqui!"
})

//Cuando soltemos el archivo en la zona
dropArea.addEventListener("drop", (e) => { 
    e.preventDefault();
    files = e.dataTransfer.files;
    //console.log(files[0].name)
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent = "Suelta tus archivos aqui!"

})


function showFiles(files) { //identificamos si hay mas de una imagen
    if (files["length"] === 1) {
        processFile(files[0]); //procesa un archivo
    } else {
        for (const file of files) { //procesa el array         
            processFile(file);
           // console.log(file.name)
        }
    }
}


function processFile(file) {//validamos la imagen
    const docType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png','image/gif'] ;
    if(validExtensions.includes(docType)){
        //archivo valido
        archivo = true;
        console.log(file.name)
        listarArchivos(true,file.name);
    }else{
        //mostrar error
        //alert('el archivo no es valido');
        error(true);
    }
}

//DIV LISTADO DE ARCHIVOS
function listarArchivos(estado,nombre){
    if(estado){
    
// Create an "p" node:
const parrafo = document.createElement("p");

// Create a text node:
const text = document.createTextNode(nombre);

// Append the text node to the "p" node:
parrafo.appendChild(text);

// Append the "p" node to the list:
document.getElementById("listaArchivos").appendChild(parrafo);

dragText.style.display="none";

        document.getElementById("listaArchivos").style.color = "white";
    }else{
        document.getElementById("listaArchivos").style.display = "none";
    }
}


//DIV DE ERROR
function error(estado){ 

    if (estado) {
        dragText.style.display="none";
        document.getElementById("listaArchivos").style.display = "none";
        document.getElementById("divError").style.display = "block"; 
        
    } else {
        document.getElementById("divError").style.display = "none";
        dragText.style.display="block";
        dragText.textContent = ""
    }
}


function subirArchivos(){
    if(archivo){
        document.getElementById("listaArchivos").style.display = "none";
        dragText.style.display="none";
        document.getElementById("success").style.display = "block"; 
    }else{
       error(true);
    }
}