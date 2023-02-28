const { yellow } = require("colors");
const Tarea = require("./tarea");
require ('colors');



class Tareas {
    _listado = {};
    //GETTERS -- UNA PROPIEDAD EN NUESTRA CLASE 
    get listadoArr() {
        const listado = [];
        //Esto devuelve un arreglo de todas las llaves
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key]
            listado.push(tarea);
        });
        return listado;
    }
    constructor(){
        this._listado={};
    }

    borrarTarea(id =''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea( desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        //VERSION TAREA -------- UTILIZADA EN ARRAY
        this.listadoArr.forEach((listado, i)=> {
            let status = '';
            if(listado.completadoEn != null){
                status = 'Completado'.green;
            }else{
                status = 'Pendiente'.red;
            }
            console.log(yellow.bold(i+1 + '.')  + '  ' + listado.desc + ' :: ', status);
        })

        //---------- RESOLUCION IGUAL DE VALIDA ------------------
        // this.listadoArr.forEach((tarea, i) => {
        //     const idx = `${i +1}.`.green;
        //     const {desc, completadoEn} = tarea;
        //     const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
        //     console.log(`${idx} ${desc} :: ${estado}`);
        // })
    }
    listarPendientesCompletadas( completadas = true){
        // const estadoOK = this.listadoArr.filter( tarea => tarea.completadoEn != null);
        //     estadoOK.forEach((tarea, i) => {
        //     const idx = yellow.bold(`${i +1}.`);
        //     const {desc} = tarea;
        //     const estadoOK = 'Completado'.green;
        //     if(completadas){
        //         console.log(`${idx} ${desc} :: ${estadoOK}`)
        //     }
        //     })
        
        // const estadoPen = this.listadoArr.filter( tarea => tarea.completadoEn === null);
        //     estadoPen.forEach((tarea, i) => {
        //     const idx = yellow.bold(`${i +1}.`);
        //     const {desc} = tarea;
        //     const estadoPen = 'Pendiente'.red;
        //     if(!completadas){
        //         console.log(`${idx} ${desc} :: ${estadoPen}`)
        //     }
        //     })

        // --- VERSION CORREGIDA---
        this.listadoArr.forEach((tarea) => {

            let contador = 0;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            if(completadas){
                if(completadoEn){
                    contador +=1;
                    console.log(`${(contador+'.').green} ${desc} :: ${completadoEn.green}`);
                }
            }else{
                if(!completadoEn){
                    contador +=1;
                    console.log(`${(contador+'.').green} ${desc} :: ${estado.red}`);
                }
            }
        })
    }
    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}





        

module.exports = Tareas;