import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import { connect } from './db';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

async function main() {
    let connection: mysql.PoolConnection | null = null;

    try {
        connection = await connect();

        if (connection) {
            async function generateUsers() {
                for (let i = 0; i < 10; i++) {
                    const id = uuidv4();
                    const name = faker.person.fullName();
                    const email = faker.internet.email();
                    const joinDate = faker.date.past().toISOString().split('T')[0];
                    const jobDesk = faker.person.jobTitle();
                    const contact = faker.phone.number();
                    const status = faker.helpers.arrayElement(['ACTIVE', 'INACTIVE']);
                    const profilePhoto = faker.image.avatar();
                    const password = faker.internet.password();

                    await connection!.execute(
                        'INSERT INTO users (id, name, email, joinDate, jobDesk, contact, status, profilePhoto, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [id, name, email, joinDate, jobDesk, contact, status, profilePhoto, password]
                    );
                }
                console.log('Usuarios generados correctamente');
            }

            async function generateContacts() {
                for (let i = 0; i < 10; i++) {
                    const id = uuidv4();
                    const date = faker.date.anytime().toISOString().split('T')[0];
                    const customer = faker.person.fullName();
                    const email = faker.internet.email();
                    const phone = faker.phone.number();
                    const subject = faker.lorem.sentence();
                    const comment = faker.lorem.paragraph();
                    const archived = faker.datatype.boolean();

                    await connection!.execute(
                        'INSERT INTO contacts (id, date, customer, email, phone, subject, comment, archived) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [id, date, customer, email, phone, subject, comment, archived]
                    );
                }
                console.log('Contactos generados correctamente');
            }

            async function generateRooms() {
                for (let i = 0; i < 10; i++) {
                    const id = uuidv4();
                    const name = faker.lorem.sentence();
                    const type = faker.lorem.word();
                    const number = faker.number.int({ min: 1, max: 9999 }).toString();
                    const amenities = faker.lorem.sentence();
                    const price = faker.number.int({ min: 50, max: 500 });
                    const discount = faker.number.int({ min: 0, max: 50 });
                    const offerPrice = faker.number.int({ min: 25, max: 250 }).toString();
                    const photos = faker.image.url();
                    const status = faker.helpers.arrayElement(['Available', 'Booked']);
                    const description = faker.lorem.paragraph();
                    const offer = faker.lorem.sentence();
                    const cancellation = faker.lorem.sentence();

                    await connection!.execute(
                        'INSERT INTO rooms (id, name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [id, name, type, number, amenities, price, discount, offerPrice, photos, status, description, offer, cancellation]
                    );
                }
                console.log('Habitaciones generadas correctamente');
                console.log('generateRooms completado');
            }

            async function generateBookings() {
              console.log('generateBookings iniciado');
              console.log('Consultando IDs de habitaciones...');
              const [rows] = await connection!.execute('SELECT id FROM rooms');
              console.log('Resultado de la consulta:', rows);
          
              const roomIds: string[] = [];
              if (Array.isArray(rows)) {
                  for (const row of rows) {
                      if (typeof row === 'object' && row.hasOwnProperty('id')) {
                          const rowData = row as RowDataPacket;
                          roomIds.push(rowData.id);
                      }
                  }
              }
          
              if (roomIds.length > 0) {
                  console.log('IDs de habitaciones:', roomIds);
          
                  for (let i = 0; i < 10; i++) {
                      const id = uuidv4();
                      const guest = faker.person.fullName();
                      const orderDate = faker.date.anytime().toISOString().split('T')[0];
                      const checkInDate = faker.date.future().toISOString().split('T')[0];
                      const checkInTime = faker.date.recent().toLocaleTimeString();
                      const checkOutDate = faker.date.future().toISOString().split('T')[0];
                      const checkOutTime = faker.date.recent().toLocaleTimeString();
                      const specialRequest = faker.lorem.sentence();
                      const roomId = faker.helpers.arrayElement(roomIds);
                      const status = faker.helpers.arrayElement(['Booked', 'Refund', 'Pending', 'Canceled']);
                      const specialRequestType = faker.lorem.word();
          
                      await connection!.execute(
                          'INSERT INTO bookings (id, guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, roomId, status, specialRequestType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                          [id, guest, orderDate, checkInDate, checkInTime, checkOutDate, checkOutTime, specialRequest, roomId, status, specialRequestType]
                      );
                  }
                  console.log('Reservas generadas correctamente');
              } else {
                  console.log('No se encontraron habitaciones para generar reservas.');
              }
              console.log('generateBookings completado');
          }
            await generateUsers();
            await generateContacts();
            await generateRooms();
            await generateBookings();

            console.log('Seed completado');
        } else {
            console.error('No se pudo establecer la conexión a la base de datos');
        }
    } catch (error) {
        console.error('Error en el seed:', error);
    } finally {
        if (connection) {
            connection.end();
        }
    }
}

main();