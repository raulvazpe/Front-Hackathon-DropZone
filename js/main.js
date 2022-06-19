const dropArea = document.querySelector('.drop');
const dragText = dropArea.querySelector('h2');
const button = document.querySelector('.btn-drop');
const input = dropArea.querySelector('#input-file');

let files;

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
    //tipo = file.type
    console.log(files[0].type)
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent = "Suelta tus archivos aqui!"

})


function showFiles(files) { //identificamos si es 1 imagen o hay varias
    if (files.lenght === undefined) {
        console.log('un archivo')
        processFile(files); //procesa un archivo
    } else {
        for (const file of files) { //procesa el array
            console.log('mas de uno')
            processFile(file);
        }
    }
}


function processFile(file) {//validamos la imagen
    const docType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png','image/gif'] ;
    if(validExtensions.includes(docType)){
        //archivo valido
    }else{
        //mostrar error
       
        alert('el archivo no es valido');
    }
 }