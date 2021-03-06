//const { getElement } = require("dropzone");
const divError = document.querySelector("#divError");
const dropArea = document.querySelector('.drop');
const dragText = dropArea.querySelector('h2');
const button = document.querySelector('#btn-drop');
const input = dropArea.querySelector('#input-file');
const lista = dropArea.querySelector('#listaArchivos');
const loginGoogle = document.querySelector(".login")

let files;
let archivo = false;
dragText.innerHTML="Añade tus archivos aquí!"
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
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (validExtensions.includes(docType)) {
        //archivo valido
        archivo = true;
        console.log(file.name)
        listarArchivos(true, file.name);
    } else {
        //mostrar error
        //alert('el archivo no es valido');
        error(true);
    }
}

//DIV LISTADO DE ARCHIVOS
function listarArchivos(estado, nombre) {
    //Si el estado es true significa que hay archivos, y añadiremos el nombre
    if (estado) {
        dragText.style.display = "none";
        lista.style.display = "flex";
        //creamos el elemento <p></p>
        const parrafo = document.createElement("p");
        const icono = document.createElement("i");
        // Create a text node:
        const nombreArchivo = document.createTextNode(nombre);
        // añadiremos el nimbre del archivo
        parrafo.appendChild(nombreArchivo);
        icono.classList.add("fa-solid", "fa-images","iconoLista");
        


       // const image = document. createElement('img');
      //  image. src = '../images/picture.png';
        //document. querySelector('.container'). appendChild(image)

        //Lo añadimos como hijo de <p></p>
        
        document.getElementById("listaArchivos").appendChild(parrafo);
        parrafo.appendChild(icono);
        document.getElementById("listaArchivos").style.color = "white";
        


    } else {
        document.getElementById("listaArchivos").style.display = "none";
    }
}


//DIV DE ERROR
function error(estado) {

    if (estado) {
        dragText.style.display = "none";
        document.getElementById("listaArchivos").style.display = "none";
        document.getElementById("divError").style.display = "block";

    } else {
        document.getElementById("divError").style.display = "none";
        dragText.style.display = "block";
        dragText.textContent = ""
        location.reload();
    }
}


function subirArchivos() {
    if (archivo) {
        document.getElementById("listaArchivos").style.display = "none";
        dragText.style.display = "none";
        document.getElementById("success").style.display = "block";
        setTimeout(() => {
           location.reload();
        }, 3000);


    } else {
        dragText.innerHTML="No hay archivos añadidos";
        setTimeout(() => {
            dragText.style.display = "none";
        }, 3000);
    }
}



// LOGIN DE GOOGLE

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }


//   LOGIN DE GOOGLE

        function handleCredentialResponse(response) {
          console.log("Encoded JWT ID token: " + response.credential);
          let token = response.credential;
          const parseJwt = (token) => {
            try {
              return JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
              return null;
            }

          };
          loginGoogle.querySelector("h2").innerHTML="Bienvenido a DDrop"+parseJwt(token.name);
          console.log(parseJwt(token));
          console.log(parseJwt(token.name));
        }
        window.onload = function () {
          google.accounts.id.initialize({
            client_id: "646336918949-sjfpfupaoghl46rirf7p67o4qeg30sk1.apps.googleusercontent.com",
            callback: handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
          );
          //google.accounts.id.prompt(); // also display the One Tap dialog
        }

