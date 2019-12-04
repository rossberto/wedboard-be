/******************************************************************************************/
/******************************************************************************************/
/***** 6.  Generar Surveys *****/
/******************************************************************************************/
/******************************************************************************************/
INSERT INTO Surveys (Projects_id, active_step)
VALUES (1, 1);

/******************************************************************************************/
/******************************************************************************************/
/***** 7.  Generar ProjectServices *****/
/******************************************************************************************/
/******************************************************************************************/
/* Carpas */
INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (5, "Se acomodarán en forma de L.", 1, 13);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (1, "Locación con riesgo de lluvia.", 1, 21);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (50, "Servir en platos hondos.", 1, 3);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (40, "Servir en platos hondos.", 1, 3);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (60, "Servir en platos hondos.", 1, 3);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (1, "Confirmar compatibilidad con Bluetooth.", 1, 14);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (2, "Únicamente música ambiental.", 1, 15);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (5, "Poner rock clásico durante la comida.", 1, 17);

/******************************************************************************************/
/******************************************************************************************/
/***** 8.  Generar Orders *****/
/******************************************************************************************/
/******************************************************************************************/
/* Proveedor 1 */
INSERT INTO Orders (date, comments, status, total_amount, Providers_id, Projects_id)
VALUE ("2018-01-01", "Sin comentarios.", "Emitida", 15320.78, 1, 1);

/* Proveedor 2 */
INSERT INTO Orders (date, comments, status, total_amount, Providers_id, Projects_id)
VALUE ("2018-02-02", "Sin comentarios.", "Emitida", 25321.78, 2, 1);

/* Proveedor 3 */
INSERT INTO Orders (date, comments, status, total_amount, Providers_id, Projects_id)
VALUE ("2018-03-03", "Sin comentarios.", "Emitida", 35322.78, 3, 1);

/******************************************************************************************/
/******************************************************************************************/
/***** 9.  Generar OrderServices *****/
/******************************************************************************************/
/******************************************************************************************/
/* Proveedor 1 */
INSERT INTO OrderServices (quantity, cost, ProjectServices_id, ProviderServices_id, Orders_id)
VALUE (5, 123000.98, 1, 1, 1);

INSERT INTO OrderServices (quantity, cost, ProjectServices_id, ProviderServices_id, Orders_id)
VALUE (1, 456000.97, 2, 2, 1);

/* Proveedor 2 */
INSERT INTO OrderServices (quantity, cost, ProjectServices_id, ProviderServices_id, Orders_id)
VALUE (50, 25000.96, 3, 3, 2);

INSERT INTO OrderServices (quantity, cost, ProjectServices_id, ProviderServices_id, Orders_id)
VALUE (40, 36000.95, 4, 4, 2);

INSERT INTO OrderServices (quantity, cost, ProjectServices_id, ProviderServices_id, Orders_id)
VALUE (60, 43000.94, 5, 5, 2);

/* Proveedor 3 */
INSERT INTO OrderServices (quantity, cost, ProjectServices_id, ProviderServices_id, Orders_id)
VALUE (1, 2000.93, 6, 6, 3);

INSERT INTO OrderServices (quantity, cost, ProjectServices_id, ProviderServices_id, Orders_id)
VALUE (2, 12000.92, 7, 7, 3);

INSERT INTO OrderServices (quantity, cost, ProjectServices_id, ProviderServices_id, Orders_id)
VALUE (5, 30000.91, 8, 8, 3);