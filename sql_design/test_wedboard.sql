/* Users creation */
INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("Juancho", "Infante", "Ticul", "juancho@correo.com", "Couple", "2019-05-05", "1983-09-09", "male", "+529999987654");

INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("Pedro", "Almodovar", NULL, "pedro@correo.com", "Planner", "2019-05-05", "1981-07-01", "male", "+529999987654");

INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("Alonso", "Sanchez", "Roman", "alonso@correo.com", "Planner", "2019-05-05", "1984-05-10", "male", "+529999987654");

INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("Fatima", "Jimenez", "Gonzalez", "fatima@correo.com", "Couple", "2019-05-05", "1983-09-09", "female", "+529999987654");

INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("Ernesto", "Garcia", "Hernandez", "neto@correo.com", "Provider", "2019-05-05", "1982-10-10", "male", "+529999987654");

INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("Pablo", "Lopez", "Martinez", "pablo@correo.com", "Provider", "2019-05-05", "1980-01-02", "male", "+529999987654");

/* Projects creation */
INSERT INTO Projects (creation_timestamp, name, feast_date, feast_location, civil_ceremony_date, 
					  civil_ceremony_location, religious_ceremony_date, religious_location, 
					  custom_ceremony_description, custom_ceremony_description_2, custom_ceremony_date,
					  custom_ceremony_location, guests_quantity, pinterest_board_url, created_by)
VALUES ("2019-06-01", "Juan & Tere", "2020-10-10", "Hacienda Maya", "2020-10-10", NULL, NULL, NULL, NULL, 
		NULL, NULL, NULL, NULL, NULL, 1);
        
INSERT INTO Projects (creation_timestamp, name, feast_date, feast_location, civil_ceremony_date, 
					  civil_ceremony_location, religious_ceremony_date, religious_location, 
					  custom_ceremony_description, custom_ceremony_description_2, custom_ceremony_date,
					  custom_ceremony_location, guests_quantity, pinterest_board_url, created_by)
VALUES ("2019-10-10", "proyecto2", "2020-10-11", "Hacienda Maya", NULL, NULL, NULL, NULL, NULL, 
		NULL, NULL, NULL, NULL, NULL, 1);

INSERT INTO Projects (creation_timestamp, name, feast_date, feast_location, civil_ceremony_date, 
					  civil_ceremony_location, religious_ceremony_date, religious_location, 
					  custom_ceremony_description, custom_ceremony_description_2, custom_ceremony_date,
					  custom_ceremony_location, guests_quantity, pinterest_board_url, created_by)
VALUES ("2019-10-10", "proyecto3", "2020-10-12", "Hacienda Maya", NULL, NULL, NULL, NULL, NULL, 
		NULL, NULL, NULL, NULL, NULL, 1);

/* Wedboard Services creation */
/* Categoría: Servicios */
INSERT INTO WedboardServices (category, service)
VALUES ("Servicios", "Wedding Planner");

/* Categoría: Recepción */
INSERT INTO WedboardServices (category, service)
VALUES ("Recepción", "Locación de boda");

INSERT INTO WedboardServices (category, service)
VALUES ("Recepción", "Banquete en menú");

INSERT INTO WedboardServices (category, service)
VALUES ("Recepción", "Banquete en buffet");

INSERT INTO WedboardServices (category, service)
VALUES ("Recepción", "Menú creado por chef");

INSERT INTO WedboardServices (category, service)
VALUES ("Recepción", "Alcohol");

/* Categoría: Montaje */
INSERT INTO WedboardServices (category, service)
VALUES ("Montaje", "Mesas con mantel");

INSERT INTO WedboardServices (category, service)
VALUES ("Montaje", "Mesas sin mantel");

INSERT INTO WedboardServices (category, service)
VALUES ("Montaje", "Mobiliario complementario para recepción");

INSERT INTO WedboardServices (category, service)
VALUES ("Montaje", "Iluminación ambiental");

INSERT INTO WedboardServices (category, service)
VALUES ("Montaje", "Pista de baile");

INSERT INTO WedboardServices (category, service)
VALUES ("Montaje", "Tarimas");

INSERT INTO WedboardServices (category, service)
VALUES ("Montaje", "Carpas");

/* Categoría: Entretenimiento */
INSERT INTO WedboardServices (category, service)
VALUES ("Entretenimiento", "Audio para música grabada - Coctel");

INSERT INTO WedboardServices (category, service)
VALUES ("Entretenimiento", "Música en vivo - Coctel");

INSERT INTO WedboardServices (category, service)
VALUES ("Entretenimiento", "Audio para música grabada - Cena");

INSERT INTO WedboardServices (category, service)
VALUES ("Entretenimiento", "Música en vivo - Cena");

INSERT INTO WedboardServices (category, service)
VALUES ("Entretenimiento", "DJ - Fiesta");

INSERT INTO WedboardServices (category, service)
VALUES ("Entretenimiento", "Música en vivo - Fiesta");