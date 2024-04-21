DROP TABLE IF EXISTS Edges;

CREATE TABLE Edges (
    source VARCHAR,
    target VARCHAR,
    value INT,
    FOREIGN KEY (source) REFERENCES Entries(bracket),
    FOREIGN KEY (target) REFERENCES Entries(bracket)
);

INSERT INTO Edges (source, target, value) VALUES ("hello", "descr", 1);