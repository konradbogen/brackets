DROP TABLE IF EXISTS Entries;

CREATE TABLE Entries (
    bracket VARCHAR NOT NULL,
    content VARCHAR
);

INSERT INTO Entries (bracket, content) VALUES ("hello", "Hello World[descr]");
INSERT INTO Entries (bracket, content) VALUES ("descr", "Whats Up");