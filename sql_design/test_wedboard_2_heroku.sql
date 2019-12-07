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
VALUE (5, "Se acomodarán en forma de L.", 1, 121);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (1, "Locación con riesgo de lluvia.", 1, 201);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (50, "Servir en platos hondos.", 1, 21);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (40, "Servir en platos hondos.", 1, 21);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (60, "Servir en platos hondos.", 1, 21);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (1, "Confirmar compatibilidad con Bluetooth.", 1, 131);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (2, "Únicamente música ambiental.", 1, 141);

INSERT INTO ProjectServices (quantity, comments, Projects_id, WedboardServices_id)
VALUE (5, "Poner rock clásico durante la comida.", 1, 161);

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
VALUE ("2018-02-02", "Sin comentarios.", "Emitida", 25321.78, 11, 1);

/* Proveedor 3 */
INSERT INTO Orders (date, comments, status, total_amount, Providers_id, Projects_id)
VALUE ("2018-03-03", "Sin comentarios.", "Emitida", 35322.78, 21, 1);

