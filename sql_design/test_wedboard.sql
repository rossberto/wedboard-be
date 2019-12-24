/******************************************************************************************/
/******************************************************************************************/
/***** 1.  Generar Users (Primer usuario debe ser diferente de Planner) *****/
/******************************************************************************************/
/******************************************************************************************/
INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("John", "Doe", "Martinez", "john@correo.com", "Admin", "2019-05-05", "1983-09-09", "Masculino", "+529999987654");

INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("Pedro", "Almodovar", "Gonzalez", "pedro@correo.com", "Planner", "2019-05-05", "1981-07-01", "Masculino", "+529999987654");

INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("Alonso", "Sanchez", "Roman", "alonso@correo.com", "Planner", "2019-05-05", "1984-05-10", "Masculino", "+529999987654");

INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("Fatima", "Jimenez", "Gonzalez", "fatima@correo.com", "Planner", "2019-05-05", "1983-09-09", "Femenino", "+529999987654");

INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("Ernesto", "Garcia", "Hernandez", "neto@correo.com", "Provider", "2019-05-05", "1982-10-10", "Masculino", "+529999987654");

INSERT INTO Users (name, last_name, last_name_2, email, type, join_date, birthdate, gender, phone) 
VALUES ("Pablo", "Lopez", "Martinez", "pablo@correo.com", "Provider", "2019-05-05", "1980-01-02", "Masculino", "+529999987654");

/******************************************************************************************/
/******************************************************************************************/
/***** 2.  Generar Providers (JAS: Carpas, MaxiEventos: Banquetes, Quo Vadis: Musica) *****/
/******************************************************************************************/
/******************************************************************************************/
INSERT INTO Providers SET name="JAS", country_iso_a3c="MX", state="Yucatan", city="Merida", join_date="2017-05-05";

INSERT INTO Providers SET name="MaxiEventos", country_iso_a3c="MX", state="Yucatan", city="Merida", join_date="2017-05-06";

INSERT INTO Providers SET name="Quo Vadis", country_iso_a3c="MX", state="Yucatan", city="Merida", join_date="2017-05-07";

/******************************************************************************************/
/******************************************************************************************/
/***** 3. Generar WedboardServices *****/
/******************************************************************************************/
/******************************************************************************************/
/* Categoría: Servicios */
INSERT INTO WedboardServices (category, service)
VALUES ("Servicios", "Wedding Planner");

/**************************************************/
/* Categoría: Recepción */
/**************************************************/
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

/**************************************************/
/* Categoría: Montaje */
/**************************************************/
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

/**************************************************/
/* Categoría: Entretenimiento */
/**************************************************/
/* SubCategoria: Musica para coctel */
INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Entretenimiento", "Música para coctel", "Audio para música grabada");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Entretenimiento", "Música para coctel", "Música en vivo");

/* SubCategoria: Musica para cena */
INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Entretenimiento", "Música para cena", "Audio para música grabada");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Entretenimiento", "Música para cena", "Música en vivo");

/* SubCategoria: Musica para fiesta */
INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Entretenimiento", "Música para fiesta", "DJ");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Entretenimiento", "Música para fiesta", "Música en vivo");

/**************************************************/
/* Categoría: Necesario de acuerdo a la locación */
/**************************************************/
INSERT INTO WedboardServices (category, service)
VALUES ("Necesario de acuerdo a la locación", "Planta de luz");

INSERT INTO WedboardServices (category, service)
VALUES ("Necesario de acuerdo a la locación", "Carpa de cocina");

INSERT INTO WedboardServices (category, service)
VALUES ("Necesario de acuerdo a la locación", "Carpa para DJ o grupo en vivo");

INSERT INTO WedboardServices (category, service)
VALUES ("Necesario de acuerdo a la locación", "Escenario para DJ o grupo en vivo");

INSERT INTO WedboardServices (category, service)
VALUES ("Necesario de acuerdo a la locación", "Baños portátiles");

/**************************************************/
/* Categoría: Peinado y maquillaje */
/**************************************************/
INSERT INTO WedboardServices (category, service)
VALUES ("Peinado y maquillaje", "Peinado y maquillaje para novia");

INSERT INTO WedboardServices (category, service)
VALUES ("Peinado y maquillaje", "Peinado y maquillaje para personas adicionales");

/**************************************************/
/* Categoría: Ceremonia */
/**************************************************/
/* Subcategoría: Ceremonia religiosa */
INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia religiosa", "Iglesia para ceremonia");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia religiosa", "Misma locación que el evento");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia religiosa", "Música en vivo para ceremonia");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia religiosa", "Misal");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia religiosa", "Oficiante");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia religiosa", "Micrófonos y audio para ceremonia");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia religiosa", "Reclinatorios");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia religiosa", "Sillas o bancas para invitados");

/* Subcategoría: Ceremonia legal */
INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia legal", "Lugar de ceremonia");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia legal", "Juez");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia legal", "Música en vivo para ceremonia");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia legal", "Micrófonos y audio para ceremonia");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia legal", "Mesa para firma");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia legal", "Sillas para novios");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia legal", "Sillas o bancas para invitados");

/* Subcategoría: Ceremonia simbólica */
INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia simbólica", "Lugar de ceremonia");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia simbólica", "Oficiante/Ministro");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia simbólica", "Música en vivo para ceremonia");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia simbólica", "Micrófonos y audio para ceremonia");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Ceremonia simbólica", "Sillas o bancas para invitados");

/* Subcategoría: Complementos de decoración para ceremonia */
INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Complementos de decoración para ceremonia", "Alfombra para pasillo");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Complementos de decoración para ceremonia", "Elementos para la salida de ceremonia");

INSERT INTO WedboardServices (category, subcategory, service)
VALUES ("Ceremonia", "Complementos de decoración para ceremonia", "Pódium");

/**************************************************/
/* Categoría: Coctel el día de la boda */
/**************************************************/
INSERT INTO WedboardServices (category, service)
VALUES ("Coctel el día de la boda", "Canapés");

INSERT INTO WedboardServices (category, service)
VALUES ("Coctel el día de la boda", "Barra de cocteles");

INSERT INTO WedboardServices (category, service)
VALUES ("Coctel el día de la boda", "Mesas y sillas periqueras");

INSERT INTO WedboardServices (category, service)
VALUES ("Coctel el día de la boda", "Salas con sillones");

INSERT INTO WedboardServices (category, service)
VALUES ("Coctel el día de la boda", "Audio para coctel");

/**************************************************/
/* Categoría: Fotografía y video */
/**************************************************/
INSERT INTO WedboardServices (category, service)
VALUES ("Fotografía y video", "Fotografía");

INSERT INTO WedboardServices (category, service)
VALUES ("Fotografía y video", "Video");

/******************************************************************************************/
/******************************************************************************************/
/***** 4.  Generar ProviderServices *****/
/******************************************************************************************/
/******************************************************************************************/
/* Proveedor con id:1 - JAS - Carpas */
	/* WedboardServices_id: 13 - Categoría: Montaje, Servicio: Carpas */
INSERT INTO ProviderServices (name, description, description_optional, min_range, max_range, range_unit, price, 
provider_service_code, Providers_id, WedboardServices_id)
VALUES ("Carpa Premium", "Carpa de alta calidad, con iluminación de lámparas colgantes. \nLargo: 10m, Ancho: 10m.", "En una carpa caben hasta 4 mesas para 10 personas cada una.", 0, 1, "Carpas", 15340.5, "CP", 1, 13);

	/* WedboardServices_id: 21 - Categoría: Necesario de acuerdo a locación, Servicio: Carpa de cocina */
INSERT INTO ProviderServices (name, description, description_optional, min_range, max_range, range_unit, price, 
provider_service_code, Providers_id, WedboardServices_id)
VALUES ("Carpa Cook", "Carpa de cocina, con ventilación y cortinas. \nLargo: 15m, Ancho: 10m.", "En una carpa caben hasta 4 mesas para 10 personas cada una.", 0, 1, "Carpas", 20250.0, "CC", 1, 21);

/* Proveedor con id: 2 - MaxiEventos - Banquetes */
	/* WedboardServices_id: 3 - Categoría: Recepción, Servicio: Banquete en menú */
INSERT INTO ProviderServices (name, description, description_optional, min_range, max_range, range_unit, price, 
provider_service_code, Providers_id, WedboardServices_id)
VALUES ("Barbacoa", "Barbacoa gourmet. Precio por platillo", "Acompañamientos: Arroz, ensalada y salsas", 100, 150, "Platillos", 500.0, "BAR-01", 2, 3);

	/* WedboardServices_id: 3 - Categoría: Recepción, Servicio: Banquete en menú */
INSERT INTO ProviderServices (name, description, description_optional, min_range, max_range, range_unit, price, 
provider_service_code, Providers_id, WedboardServices_id)
VALUES ("Mole", "Mole gourmet. Precio por platillo", "Acompañamientos: Arroz, ensalada y salsas", 100, 150, "Platillos", 550.0, "MOL-01", 2, 3);

	/* WedboardServices_id: 3 - Categoría: Recepción, Servicio: Banquete en menú */
INSERT INTO ProviderServices (name, description, description_optional, min_range, max_range, range_unit, price, 
provider_service_code, Providers_id, WedboardServices_id)
VALUES ("Barbacoa vegetariana", "Barbacoa vegetariana gourmet. Precio por platillo", "Acompañamientos: Arroz, ensalada y salsas", 100, 150, "Platillos", 600.0, "BAR-02", 2, 3);

/* Proveedor con id: 3 - Quo Vadis - Música */
	/* WedboardServices_id: 14 - Categoría: Entretenimiento, Subcategoría: Música para coctel, Servicio: Audio para música grabada */
INSERT INTO ProviderServices (name, description, description_optional, min_range, max_range, range_unit, price, 
provider_service_code, Providers_id, WedboardServices_id)
VALUES ("Equipo de audio estándar", "Paquete de dos baffles, consola, 2 micrófonos y amplificador.", "Incluye instalación", 1, 4, "Paquetes", 4200.0, "EAS01", 3, 14);

	/* WedboardServices_id: 15 - Categoría: Entretenimiento, Subcategoría: Música para coctel, Servicio: Música en vivo */
INSERT INTO ProviderServices (name, description, description_optional, min_range, max_range, range_unit, price, 
provider_service_code, Providers_id, WedboardServices_id)
VALUES ("Tecladista", "Música variada.", "Ambiental y para bailar.", 3, 6, "Horas", 2500.00, "T01", 3, 15);

	/* WedboardServices_id: 17 - Categoría: Entretenimiento, Subcategoría: Música para cena, Servicio: Música en vivo*/
INSERT INTO ProviderServices (name, description, description_optional, min_range, max_range, range_unit, price, 
provider_service_code, Providers_id, WedboardServices_id)
VALUES ("Grupo musical versátil", "Música variada  y ambientación.", "Ofrecemos karaoke en vivo.", 3, 6, "Horas", 5146.55, "GF01", 3, 17);

/******************************************************************************************/
/******************************************************************************************/
/***** 5.  Generar Projects => Se genera directamente con Aplicación Web Wedboard ******/
/******************************************************************************************/
/******************************************************************************************/
