INSERT INTO CoupleUsers (nationality, residence_country, residence_city, occupation, religion, children, color1, color2, 
			color3, Users_id, partner_id) 
VALUES ("MXN", "MXN", "Merida", "Arquitecto", "Catolico", 0, "FFFFFF", "000000", "0A0B0C", 1, 4);

INSERT INTO PlannerUsers (is_current_employee, role, Users_id) 
VALUES (1, "Coordinator", 2);

INSERT INTO PlannerUsers (is_current_employee, role, Users_id) 
VALUES (1, "Designer", 3);

INSERT INTO CoupleUsers (nationality, residence_country, residence_city, occupation, religion, children, color1, color2, 
			color3, Users_id, partner_id) 
VALUES ("MXN", "MXN", "Merida", "Ingeniero", "Catolico", 0, "0F0F0F", "010302", "0A0B0C", 4, 1);

INSERT INTO ProviderUsers (job_position, Users_id, Providers_id)
VALUES ("Ventas", 5, NULL);

INSERT INTO ProviderUsers (job_position, Users_id, Providers_id) 
VALUES ("Atencion a clientes", 6, 2);