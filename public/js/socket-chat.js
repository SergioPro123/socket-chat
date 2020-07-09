var socket = io();
var nombreUrl = getParameterByName('nombre');
var salaUrl = getParameterByName('sala');

if (!nombreUrl || !salaUrl) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesario');
}

let usuario = {
    nombre: nombreUrl,
    sala: salaUrl
};
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log(resp);
    });
});


// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/* socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

//Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas) {

    console.log(personas);

});


//mensajes privados
socket.on('mensajePrivado', function(data) {
    console.log('Mensaje Privado: ' + data.mensaje);
});





function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? false : decodeURIComponent(results[1].replace(/\+/g, " "));
}