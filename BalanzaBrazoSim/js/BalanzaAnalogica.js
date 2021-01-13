var vectorDiez = [50, 95, 145, 197, 249, 301, 353, 405, 456, 508, 565];
var vectorCien = [50, 143, 248, 353, 458, 565];
var vectorUno = [50, 100, 150, 202, 254, 306, 358, 410, 461, 513, 573];
var masaDiez = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
var masaCien = [0, 100, 200, 300, 400, 500];
var masaUno = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//Encuentra el índice a partir del valor de posición left
function encontrarIndice(vector,valor){
    var longit = vector.length;
    for(var i=0;i<=longit;i++){
        if(vector[i]==valor){
            return i;
        }
    }
}
//Encuentra valor de la masa actual, indicada por los tres marcadores
function masaActual(){
    var idxDiez = encontrarIndice(masaDiez,document.getElementById("diezMarker").innerHTML);
    var idxCien = encontrarIndice(masaCien,document.getElementById("cienMarker").innerHTML);
    var idxUno = encontrarIndice(masaUno,document.getElementById("unMarker").innerHTML);

    var masa = masaDiez[idxDiez]+masaCien[idxCien]+masaUno[idxUno];
    console.log("Masa en balanza: "+masa);
    return masa;
}
//Mueve la balanza (los brazos, no los marcadores -pesitas-)
function updateBalanza(){
    var masa = masaActual();
    var masaObjeto = document.getElementById("masaSeleccionada").value;
    console.log("Masa objeto: "+masaObjeto);

    if(masa==masaObjeto){                       //Masas iguales
        $("#uberRegla").css("top", 320);        //Se pone en cero
        $("#uberPlato").css("top", 255);
    }else{
        if(masa<masaObjeto){
            if(masa>(masaObjeto-20)){               //En rango de -20g de la masa buscada
                $("#uberRegla").css("top", 305);    //Intermedio superior (15px)
                $("#uberPlato").css("top", 265);    //Plato en intermedio inferior (-10px)
            }else{                                  //Por debajo del rango
                $("#uberRegla").css("top", 290);    //Extremo superior (30px)
                $("#uberPlato").css("top", 270);    //Plato en extremo inferior (-15px)
            }
        }else{
            if(masa<(masaObjeto+20)){               //En rango de +20g
                $("#uberRegla").css("top", 335);    //Intermedio inferior
                $("#uberPlato").css("top", 245);    //Plato en intermedio superior
            }else{                                  //Por encima del rango
                $("#uberRegla").css("top", 350);    //Extremo inferior
                $("#uberPlato").css("top", 240);    //Plato en extremo superior
            }
        }
    }
}
function updateObjeto(seleccion){
    var x = seleccion.options[seleccion.selectedIndex].text;
    var pic;
    switch (x){
        case "Masa de prueba A":
            pic = "imgs/PruebaA.png";break;
        case "Masa de prueba B":
            pic = "imgs/PruebaB.png";break;
        case "Masa de prueba C":
            pic = "imgs/PruebaC.png";break;
        case "Botella de crema":
            pic = "imgs/CremaNivea.png";break;
        case "Avión":
            pic = "imgs/AvionPic.png";break;
        case "Batería":
            pic = "imgs/BatteryPic.png";break;
        case "Bloque de madera":
            pic = "imgs/BloqueDeMadera.png";break;
        case "Botella":
            pic = "imgs/BotellaPlastico2.png";break;
        default:
            pic = "imgs/DiamanteBlanco.png";break;
    }
    document.getElementById('objetoEnPlato').src = pic;
    ponerEnCero();
}

function ponerEnCero(){
    $('#diezMarker').text(masaDiez[0]);
    $("#diezMarker").css("left", vectorDiez[0]);
    $('#cienMarker').text(masaCien[0]);
    $("#cienMarker").css("left", vectorCien[0]);
    $('#unMarker').text(masaUno[0]);
    $("#unMarker").css("left", vectorUno[0]);
    updateBalanza();
}
function ponerEnMax(){
    // console.log("ponerenMax:"+masaDiez.length)
    $('#diezMarker').text(masaDiez[masaDiez.length-1]);
    $("#diezMarker").css("left", vectorDiez[vectorDiez.length-1]);
    $('#cienMarker').text(masaCien[masaCien.length-1]);
    $("#cienMarker").css("left", vectorCien[vectorCien.length-1]);
    $('#unMarker').text(masaUno[masaUno.length-1]);
    $("#unMarker").css("left", vectorUno[vectorUno.length-1]);
    updateBalanza();
}

//-----------Funciones que controlan el movimiento----------------
function moveRightDiez(){
    var position = document.getElementById("diezMarker").innerHTML;
    var indice = encontrarIndice(masaDiez,position);
    
    console.log(position); console.log(indice);
    $('#diezMarker').text(masaDiez[indice+1]);
    $("#diezMarker").css("left", vectorDiez[indice+1]);   //Larga vida a jQuery
    //Friendship ended with pure js, jQuery is my new best friend
    updateBalanza();
}
function moveLeftDiez(){
    //Todo se hace con el valor de masa escrito en el tag y no con la posición left porque sino habría que esperar a que
    //se ejecute el movimiento, y quiero evitar usar setTimeout porque él y yo no nos caemos bien.
    var position = document.getElementById("diezMarker").innerHTML;        //Posición del marcador (es la misma masa de la posición actual)
    var indice = encontrarIndice(masaDiez,position);      //Encontrar índice a partir de la posición
    console.log(position); console.log(indice);
    $('#diezMarker').text(masaDiez[indice-1]);              //Actualizar texto interno con la nueva masa
    $("#diezMarker").css("left", vectorDiez[indice-1]);     //Ajustar nuevo valor de left (indice encontrado +1)
    //Si llega al límite, no continúa más allá, pues js es más inteligente que C++ así que no problem (corrección: js es tonto, jQuery es el inteligente)
    updateBalanza();
}

function moveRightCien(){
    var position = document.getElementById("cienMarker").innerHTML;
    var indice = encontrarIndice(masaCien,position);
    $('#cienMarker').text(masaCien[indice+1]);
    $("#cienMarker").css("left", vectorCien[indice+1]);
    updateBalanza();
}
function moveLeftCien(){
    var position = document.getElementById("cienMarker").innerHTML;
    var indice = encontrarIndice(masaCien,position);
    $('#cienMarker').text(masaCien[indice-1]);
    $("#cienMarker").css("left", vectorCien[indice-1]);
    updateBalanza();
}

function moveRightUn(){
    var position = document.getElementById("unMarker").innerHTML;
    var indice = encontrarIndice(masaUno,position);
    $('#unMarker').text(masaUno[indice+1]);
    $("#unMarker").css("left", vectorUno[indice+1]);
    updateBalanza();
}
function moveLeftUn(){
    var position = document.getElementById("unMarker").innerHTML;
    var indice = encontrarIndice(masaUno,position);
    $('#unMarker').text(masaUno[indice-1]);
    $("#unMarker").css("left", vectorUno[indice-1]);
    updateBalanza();
}
