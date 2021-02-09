import { arch } from "os";
import {Archivo} from './archivo';
const express = require ('express')
const fs = require ('fs')
const app = express()
const port = 8080



//uso del metodo get
app.get('/api/productos/',(req,res) =>{
    let archivo = new Archivo("productos.txt")
    let dato;
    let arr;
    let data = archivo.leer()
    dato = JSON.parse(data)
    arr = new Array()
    dato.forEach(element => {
        arr.push(element)
    });
    let response = { "items": arr, "cantidad":arr.length -1 }
    res.json(response)
   
} )


app.get('/api/productos/:id',(req,res) =>{
    let id = parseInt(req.params.id);
    let archivo = new Archivo("productos.txt")
    let dato
    let id2
    let item
    let data = archivo.leer()
    let bandera = 0
    dato = JSON.parse(data)

    dato.forEach(element => {
        id2 = element.id
    if(id == id2){
        bandera = 1;
        item = element
        console.log(item)
    }else if(bandera == 0)
        item =  
           {
                "eror":"producto no encontrado"
           }
        
    
    });
    console.log(item)
    res.send(JSON.stringify(item))
   
} )

app.post('/api/productos/guardar',(req,res) =>{
    let archivo = new Archivo("productos.txt")
    let datos = [] as any;
    let index = 0;
    let barrido;
    console.log(req.body)
    if(archivo.existe()){
        barrido = JSON.parse(fs.readFileSync(`./productos.txt`,'utf8'))
        barrido.push({
           'id': barrido.length +1 ,
          'title': req.query.title,
          "Precio": req.query.precio,
          "Tumbnail":req.query.thumbnail
        })
    }else{
        barrido = []
        barrido.push({
            'id': barrido.length +1 ,
           'title': req.query.title,
           "Precio": req.query.precio,
           "Tumbnail":req.query.thumbnail
         })
    }
 
  archivo.escribir(barrido)
  res.json(barrido[barrido.length -1])
} )


app.listen(port, () =>{
    console.log("Server levantado")
})

