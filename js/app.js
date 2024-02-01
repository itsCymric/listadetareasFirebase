// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import { doc, collection, query, where, addDoc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import { cerrarmodal } from "./modal.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAticTdG_TrDwu-Pp3MRPZkG5tedDr4YGk",
  authDomain: "todolist-d50ba.firebaseapp.com",
  projectId: "todolist-d50ba",
  storageBucket: "todolist-d50ba.appspot.com",
  messagingSenderId: "26192769289",
  appId: "1:26192769289:web:713463080256ba5bcca3d8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Referencia a la base de datos
const db = getFirestore(app)

//función para mostrar las tareas()
async function mostrarDatos(){
  const q = query(collection(db,"listaTareas"))
  var listaDatos = document.getElementById('lista-datos')
  listaDatos.innerHTML=''
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) =>{
    const data = doc.data()
    const box = data.id
    const task = data.tarea
    const complete = data.completada

    //crear elementos HTML para mostrar los datos
    var contenedor = document.createElement('div')
    contenedor.classList.add('tarea')
    var icono = document.createElement('img')
    if(complete){icono.src="icons/cuadradok.png";}else{icono.src="icons/cuadrado.png";}
    icono.classList.add('cuadrito')
    icono.id=box;
    icono.setAttribute('id',box)
    var salto = document.createElement('p')
    salto.textContent = task
    contenedor.appendChild(icono)
    contenedor.appendChild(salto)
    listaDatos.appendChild(contenedor)

    icono.addEventListener('click',function(){
      completar(icono.id)
    })
  }
  )
}

async function contar(){
  var conta=0;
  const q = query(collection(db,"listaTareas"))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) =>{
    conta++
  })
  return conta;
}

async function consultar(){
  try{
    const resultado = await contar()
    return resultado
  }catch(error){}
}

//función para checar estado
async function completar(id){
  const tarea = collection(db,"listaTareas")
  const q = query(tarea, where("id","==",id))
  const querySnapshot = await getDocs(q);
  var val = 0
  var llave = ""
  querySnapshot.forEach((doc)=>{
    const data = doc.data()
    val = data.completada
    llave = doc.id
  })
  await updateDoc(doc(db,"listaTareas",llave),{completada:!val})
  mostrarDatos()
}


//función para insertar
async function guardarFire(id,newtarea){
  try{
    const docRef = await addDoc(collection(db, "listaTareas"),{
      tarea:newtarea,
      id:"box"+(id+1),
      completada:false
    });
  }catch(e){
    console.error("Hubo un problema al guardar", e)
  }
}
function limpiar(){document.getElementById('txtTarea').value="";}



async function guardarDatos(){
  var tarea = document.getElementById('txtTarea').value;
  if(tarea==""){return false;}
  try{
    await guardarFire(await consultar()+1,tarea)
    mostrarDatos();
  }catch(error){}
  limpiar();
}


//función para eliminar los completados
async function eliminarDatos(){
  const q = query(collection(db,"listaTareas"))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc)=>{
    const data = doc.data()
    const val = data.completada
    const key = doc.id
    if(val){borrar(key)}
  })
  mostrarDatos()
}

async function borrar(key){
  await deleteDoc(doc(db,"listaTareas",key))
}
//Listeners
document.addEventListener('DOMContentLoaded', function(){
  mostrarDatos();
})
document.getElementById('btnGuardar').addEventListener('click', function(){
  guardarDatos(); cerrarmodal();
})
document.getElementById('txtTarea').addEventListener("keypress", function(event){
  if(event.key === "Enter"){
    event.preventDefault();
    guardarDatos(); 
    cerrarmodal();
  }
})
document.getElementById('btnEliminar').addEventListener('click',function(){
  eliminarDatos()
})

