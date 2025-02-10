"use strict";
const fs = require('fs');
function leerHabitaciones(rutaArchivo) {
    try {
        const datos = fs.readFileSync(rutaArchivo, 'utf8');
        return JSON.parse(datos);
    }
    catch (error) {
        console.error(`Error al leer el archivo ${rutaArchivo}:`, error);
        return [];
    }
}
function ordenarPorPrecio(habitaciones) {
    return habitaciones.sort((a, b) => a.price - b.price);
}
function escribirCSV(habitaciones, rutaArchivo) {
    try {
        const encabezado = Object.keys(habitaciones[0]).join(',');
        const filas = habitaciones.map(habitacion => Object.values(habitacion).join(','));
        const csv = `${encabezado}\n${filas.join('\n')}`;
        fs.writeFileSync(rutaArchivo, csv, 'utf8');
        console.log('Archivo CSV creado exitosamente.');
    }
    catch (error) {
        console.error(`Error al escribir el archivo ${rutaArchivo}:`, error);
    }
}
const habitaciones = leerHabitaciones('./rooms.json');
const habitacionesOrdenadas = ordenarPorPrecio(habitaciones);
escribirCSV(habitacionesOrdenadas, './rooms.csv');
