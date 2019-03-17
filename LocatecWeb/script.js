function ObjetoPerdido () {
    this.tipo = "";
    this.descripcion = "";
    this.fechaPerdido = {
        dia: 0,
        mes: 0,
        anio: 0,
    };
    this.palabrasClave = [];
    this.setTipo = function (tipoObjeto) {
        this.tipo = tipoObjeto;
    };
    this.llenarDescripcion = function (texto) {
        //debugger;
        var aux = texto;
        while (aux != "") {
            var palabra = "";
            var pos = -1;
            var ultimaPalabra = false;
            do {
                pos = aux.indexOf(" ");
                if (pos != -1) {
                    palabra = aux.slice (0, pos+1);
                    aux = aux.replace(palabra, "");
                    palabra = palabra.replace(palabra.charAt(palabra.length-1), "");
                    if (comprobarPalabra(palabra, this))
                        this.palabrasClave.push(palabra);
                } else {
                    if (!ultimaPalabra) {
                        ultimaPalabra = true;
                        palabra = aux.slice (0, aux.length);
                        aux = aux.replace(palabra, "");
                        if (comprobarPalabra(palabra, this))
                            this.palabrasClave.push(palabra);
                    }
                }
            } while (pos != -1);
        }
    }
    this.compararDosObjetos = function (objeto2) { //this = objeto en locatec, objeto2 = objeto del request
        //debugger;
        var cantidadDePalabrasIguales = 0;
        for (var i = 0; i < objeto2.palabrasClave.length; i++) {
            for (var j = 0; j < this.palabrasClave.length; j++) {
                if (this.palabrasClave[j].toUpperCase() == objeto2.palabrasClave[i].toUpperCase()) {
                    cantidadDePalabrasIguales++;
                }
            }
        }
        return (cantidadDePalabrasIguales * 1.0)/(this.palabrasClave.length * 1.0);
    }
    this.compararTexto = function (busqueda) {
        for (let i = 0; i < this.palabrasClave.length; i++) {
            for (let j = 0; j < busqueda.palabrasClave.length; j++) {
                if (busqueda.palabrasClave[j].toUpperCase() != this.palabrasClave[i].toUpperCase()) {
                    return false;
                }
            }
        }
        if (this.palabrasClave.length > 0 && busqueda.palabrasClave.length > 0)
            return true;
    }
    this.compararTextoConObjeto = function (objeto2) {
        var encontradas = [];
        var encontrado;
        var salir = false;
        for (let i = 0; i < this.palabrasClave.length && !salir; i++) {
            encontrado = false;
            for (let j = 0; j < objeto2.palabrasClave.length; j++) {
                if (objeto2.palabrasClave[j].toUpperCase() == this.palabrasClave[i].toUpperCase()) {
                    encontrado = true;
                }
            }
            encontradas.push(encontrado);
            if (encontradas.length == objeto2.palabrasClave.length)
                salir = true;
        }
        for (let i = 0; i < encontradas.length; i++) {
            if (encontradas[i] == false)
                return false;
        }
        return true;
    }
};

function Busqueda () {
    this.tipo = "";
    this.texto = "";
    this.palabrasClave = [];
    this.separarTexto = function () {
        var aux = this.texto;
        while (aux != "") {
            var palabra = "";
            var pos = -1;
            var ultimaPalabra = false;
            do {
                pos = aux.indexOf(" ");
                if (pos != -1) {
                    palabra = aux.slice (0, pos+1);
                    aux = aux.replace(palabra, "");
                    palabra = palabra.replace(palabra.charAt(palabra.length-1), "");
                    if (comprobarPalabra(palabra, this))
                        this.palabrasClave.push(palabra);
                } else {
                    if (!ultimaPalabra) {
                        ultimaPalabra = true;
                        palabra = aux.slice (0, aux.length);
                        aux = aux.replace(palabra, "");
                        if (comprobarPalabra(palabra, this))
                            this.palabrasClave.push(palabra);
                    }
                }
            } while (pos != -1);
        }
    }
}

/* 
    palabras de 3 caracteres
    "los", "las",
    "con", "que",
*/
var palabrasAIgnorar = ["color", "marca", "tamaño", "tiene", "total"];

function comprobarPalabra (palabra, objeto) {
    if (palabra.length > 3) {
        for (var i = 0; i < palabrasAIgnorar.length; i++) {
            if (palabrasAIgnorar[i].toUpperCase() == palabra.toUpperCase()) 
                return false;
        }
        if (objeto.palabrasClave.length > 0) {
            for (var i = 0; i < objeto.palabrasClave.length; i++) {
                if (palabra.toUpperCase() == objeto.palabrasClave[i].toUpperCase())
                    return false;
            }
        }
        if (objeto.tipo.length > 0) {
            if (objeto.tipo.toUpperCase() == palabra.toUpperCase())
                return false;
        }
        return true;
    }   
    return false;
}

var arrObjetosPerdidos = [];

function buscarNuevoObjetoPerdido (objetoNuevo) { //COMPLETAR FUNCION ----------------------------------------------------------------------------
    var porcentaje;
    for (let i = 0; i < arrObjetosPerdidos.length+1; i++) {
        porcentaje = arrObjetosPerdidos[i].compararDosObjetos(objetoNuevo);
        if (porcentaje > 0.5) {
            if (arrObjetosPerdidos.fechaPerdido > objetoNuevo.fechaPerdido) {
                //mandar mail
            }
        }
    }
}