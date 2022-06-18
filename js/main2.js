
//CAMBIAMOS EL TEXTO POR DEFECTO 
// $(document).ready(function(){
//     $('.dz-button').html('ARRASTRA TUS ARCHIVOS AQUÍ')
//     $('.dz-button').css({
//         "color": "white",
//         "font-family": 'Open Sans',
//         "font-size": '25px'
//         });
  
    
// })

function dropHandler(ev) {
    console.log('File(s) dropped');
  
    //Evitar que el archivo se abra solo
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Usar una interfaz DataTransferItemList para acceder al archivo
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // Si los elementos descartados no son archivos, los rechaza
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
        }
      }
    } else {
      // Use a interface DataTransfer para acessar o (s) arquivo (s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    }
  }


  function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
  
    // Impedir o comportamento padrão (impedir que o arquivo seja aberto)
    ev.preventDefault();
  }