var btnmodal = document.getElementById("btnModal")
var btncerrar = document.getElementById("btnCerrar")
var modal = document.getElementById('cristianModal')
btnmodal.addEventListener('click',abrirModal)
btncerrar.addEventListener('click',cerrarModal)
function abrirModal(){modal.style.display = 'block'}
function cerrarModal(){modal.style.display = 'none'}
window.addEventListener('click', function(event){
    if(event.target === modal){
        cerrarModal();
    }
})

export function cerrarmodal(){modal.style.display = 'none'}