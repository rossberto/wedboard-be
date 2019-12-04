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