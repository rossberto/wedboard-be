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

SELECT * FROM OrderServices;