
var Calculadora = {
    
    //propiedades que definen estados matemáticos
    acum : 0, 
    acum2 : "vacio",
    cantDigitos: 0,
    operAritmetica : "",
    banderaPunto: false, 
    banderaCero:  true, 
    pantalla : "",

    init:  function(){
        // asignar eventos a teclas
        this.asignarEfectodeBoton("tecla")
        document.getElementsByClassName("teclado")[0].onclick = this.presionasteTecla
        this.pantalla = document.getElementById("display")
    }, 

    //Asignar evento de efecto presionar tecla a todos los botones calculadora
    asignarEfectodeBoton: function(clase){
        var tecla = document.getElementsByClassName(clase)
        for (var i=0; i<tecla.length; i++){
            tecla[i].onmousedown = this.encogerTecla
            tecla[i].onmouseup = this.aumentarTecla
        }
    },
    
    //Evento al hacer click mousedown 
    encogerTecla: function(e){  
        document.getElementById(e.srcElement.id).style.transform="scale(0.9, 0.9)"
    },

    // Evento al hacer mouseup
    aumentarTecla: function(e){
        document.getElementById(e.srcElement.id).style.transform="scale(1,1)"
    },

    // Capturar funciones por tecla  
    presionasteTecla: function(e){
        
        var valorTecla = e.srcElement.id
       
        switch(valorTecla) {
            case "on":        Calculadora.botonON(); break;
            case "sign":      Calculadora.signo(); break;
            case "raiz":      Calculadora.raiz(); break;
            case "dividido":  Calculadora.operaciones(valorTecla); break;
            case "por":       Calculadora.operaciones(valorTecla); break;
            case "menos":     Calculadora.operaciones(valorTecla); break;
            case "punto":     Calculadora.escribirPunto(); break;
            case "igual":     Calculadora.igual(); break;
            case "mas":       Calculadora.operaciones(valorTecla); break;
            default :         Calculadora.escribirNumeros(valorTecla) 
        }
    },
    
    //Boton ON/C
    botonON: function(){
        this.banderaCero = true
        this.banderaPunto = false
        this.cantDigitos = 0
        this.operAritmetica = ""
        this.acum = 0
        this.acum = "vacio"
        this.pantalla.innerHTML = "0"
    },
    
    //Refrescar y escribir solo valor enviado a pantalla
    imprPantalla: function(valor){
        this.pantalla.innerHTML = valor
    },

    // Adiciona o concatena al contenido anterior pantalla
    imprConcatPantalla: function (valor){
        this.pantalla.innerHTML = this.pantalla.innerHTML + valor
    },

    // Maneja los digitos escritos en la pantalla
    escribirNumeros : function(numero){
        if (this.banderaCero){
            this.imprPantalla("")
            if(numero != "0"){
                this.banderaCero = false
            }
        }
        if (this.cantDigitos < 8 && !this.banderaCero){
            ++this.cantDigitos
            this.imprConcatPantalla(numero)
        }
        
    },

    // Agrega punto decimal considerando condiciones
    escribirPunto: function(){
        if (this.banderaPunto == false){
            this.imprConcatPantalla(".")
            this.banderaPunto = true
            this.banderaCero = false
        }
    },

    // Pone signo analizando que el valor no sea cero 
    signo: function(){
        if (this.banderaCero == false){
            var valor = this.pantalla.innerHTML
            if(valor > 0 )
                this.imprPantalla("-" + valor)  
            else if ( valor < 0 )
                this.imprPantalla(valor.substr(1))
        }
    },

    // Metodo que lleva estados de las operaciones
    operaciones : function(operacion){
                
        if (this.operAritmetica == ""){
            this.acum = this.pantalla.innerHTML
            this.imprPantalla("")
            this.cantDigitos = 0
        }
        else if (this.pantalla.innerHTML != ""){
            if (operacion != this.operAritmetica){
                this.acum = this.pantalla.innerHTML
                this.imprPantalla("")
                this.cantDigitos = 0
                this.acum2 = "vacio" 
            } else{
                if (this.acum2 == "vacio")
                    this.acum2 = this.pantalla.innerHTML
                this.calcular(this.acum, this.operAritmetica, this.acum2)  
            }   
        }
        this.operAritmetica = operacion        
        
    },
    
    // metodo que clasifica que operacion realizar 
    calcular: function(a, operador, b){
        var resultado
        switch (operador){
            case "mas" : resultado = this.suma(a,b); break
            case "menos" : resultado = this.resta(a,b); break
            case "por" : resultado = this.multiplicacion(a,b); break
            case "dividido": resultado = this.division(a,b); break
        }
        this.acum = resultado 
        resultado = this.normalizarResultado8(resultado)
        this.imprPantalla(resultado)
    },

    //funcion suma
    suma: function(a,b){
        var resultado =  Number(a) + Number(b)
        return resultado
    },

    //funcion resta
    resta: function(a,b){
        var resultado = Number(a) - Number(b)
        return resultado
    },

    //funcion con retorno multiplicacion
    multiplicacion: function(a,b){
        var resultado = Number(a) * Number(b)
        return resultado
    },

    //funcion con retorno de division
    division: function(a,b){
        var resultado = Number(a) / Number(b)
        return resultado
    },

    // valor agregado de calculo de raiz cuadrada
    raiz : function(){
        var numero = this.pantalla.innerHTML
        if(numero != ""){
            numero = Math.sqrt(numero)
        }
        numero = this.normalizarResultado8(numero)
        this.imprPantalla(numero)
    },

    // manejo del evento igual
    igual: function(){
        if (this.operAritmetica != "" && this.pantalla.innerHTML != "")
            this.calcular(this.acum,this.operAritmetica,this.pantalla.innerHTML)
        this.operAritmetica = ""

    },

    // funcion normalizar que la respuesta siempre tenga 8 digitos
    normalizarResultado8: function(num){
        num = num.toString()
        if (num.length > 7)
            num = num.slice(0,9)
        return num
    }



}

Calculadora.init()

