INSERT INTO OrderServices (quantity, cost, ProjectServices_id, ProviderServices_id, Orders_id)
VALUE (1, 123000.96, 1, 1, 1);

INSERT INTO OrderServices (quantity, cost, ProjectServices_id, ProviderServices_id, Orders_id)
VALUE (2, 456000.96, 1, 2, 2);

SELECT * FROM OrderServices;