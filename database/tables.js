class Tables {
    init(connection) {
        this.connection = connection

        this.createService()
    }

    createService() {
        const sql = `CREATE TABLE IF NOT EXISTS Services (
            id int NOT NULL AUTO_INCREMENT, 
            client varchar(50) NOT NULL, 
            pet varchar(20),
            task varchar(20) NOT NULL, 
            status varchar(20) NOT NULL, 
            observations text,
            status varchar(20) NOT NULL,
            scheduledDate datetime NOT NULL,
            createdAt datetime NOT NULL,
            PRIMARY KEY(id)
        )`       

        this.connection.query(sql, (error) => {
            if (error) {
                console.error(error)
            } else {
                console.log("Table 'Services' successfully created")
            }
        })
    }

}

module.exports = new Tables