INSERT INTO Department (name)
VALUES
('Sheetmetal'),
('Paint'),
('Plex'),
('Electrical'),
('Signcomp'),
('Letters');

INSERT INTO role (title, salary, Department_id)
VALUES
('Sheetmetal Journeymen', 51000, 1),
('Sheetmetal Shopman', 46000, 1),
('Sheetmetal Helper', 42000, 1),
('Paint Journeyman', 47000, 2),
('Paint Shopman', 41000, 2),
('Paint Helper', 39000, 2),
('Plex Journeyman', 45000, 3),
('Plex Shopman', 42000, 3),
('Plex Helper', 40000, 3),
('Electrical Journeyman', 47000, 4),
('Electrical Shopman', 40000, 4),
('Electrical Helper', 39000, 4),
('Signcomp Guy', 46000, 5),
('Letters  Journeyman', 41000, 6),
('Letters Shopman', 39000, 6),
('Letters Helper', 37000, 6);

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES
('Tyler', 'Eversole',1, NULL),
('Ronnie', 'Jerone', 1, 1),
('Kenny', 'Potter', 1, 1),
('Ken', 'Boyer', 1, 1),
('Morgan', 'Nash', 13, 1),
('Tyrell', 'Nash', 13, 1),
('Misty', 'Gallegos', 2, 1),
('Kurtis', 'Klark', 3, 1),
('Cranapple', 'woods', 3, 1),
('Craig','Wilcox', 2, 1),
('Ryan', 'Holiday', 4, NULL),
('Alec', 'Bowen', 6, 11),
('Juan', 'mendez', 6, 11),
('John', 'Doe', 6, 11),
('Rebacca', 'Mendez', 14, NULL),
('Jordan', 'hathaway', 16, 15 ),
('Keyeanna', 'Rodriguez', 16, 15),
('Ishmaul', 'Kadwapawuah', 14, 15),
('Jose', 'Sactez', 16, 15),
('Raul', 'Hernadez', 10, NULL ),
('Mitch', 'Theb', 12, 20),
('Dennis', 'Mendez', 11, 20),
('Kevin', 'Michals', 7, NULL),
('Bob', 'Tacket', 7, 23),
('Longhair', 'Guy', 9, 23);
