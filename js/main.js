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
    dragText.textContent = "Arrastra tus files aqui!"

})
//Cuando arrastremos fuera de la zona
dropArea.addEventListener("dragleave", (e) => { 
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra tus files aqui!"
})

//Cuando soltemos el archivo en la zona
dropArea.addEventListener("drop", (e) => { 
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra tus files aqui!"

})


function showFiles(files) { //identificamos si es 1 imagen o hay varias
    if (files.lenght < 2) {
        processFile(files);
    } else {
        for (const file of files) {
            processFile(file);
        }
    }
}


function processFile(file) {//validamos la imagen
    const tipo = file.type;
    const extensionesValidas = ['image/jpeg', 'image/jpg', 'image/png','image/gif'] ;

    if(extensionesValidas.includes(tipo)){
        //archivo valido
    }else{
        //mostrar error
        console.log(tipo);
        alert('el archivo no es valido');
    }
 }