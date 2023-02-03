const client = require("../database/client");
const { ObjectId } = require("mongodb");

class Spell {

    constructor({ _id, spell, school }) {
        this.id = _id;
        this.name = spell;
        this.school = school;
    }

    static async getAll () {

        // Open the connection
        await client.connect();

        // Get the ability to pull the data
        const cursor = client.db("example").collection("magic").find();

        // Pull the data
        const data = await cursor.toArray();

        // Close the connection
        await client.close();

        // Wrangle the data
        return data.map(s => new Spell(s));
    }

    static async getOneById (id) {

        await client.connect();

        const data = await client.db("example").collection("magic").findOne({
            _id: new ObjectId(id)
        });

        // Close the connection
        await client.close();

        if (data._id) {
            // Wrangle the data
            return new Spell(data);
        } else {
            throw new Error("Unable to locat document.");
        }
    }

    static async create (data) {

        // Open the connection
        await client.connect();

        // Insert the doc
        const response = await client.db("example")
                                .collection("magic")
                                .insertOne(data);

        // Get the Id                        
        const newId = response.insertedId;

        // Get the new doc
        const newDoc = await client.db("example")
                                .collection("magic")
                                .findOne({ _id: newId })

        // Close the connection
        await client.close();

        // Wrangle the data
        return new Spell(newDoc);
    }

    async delete(data) {
         // Open the connection
         await client.connect();

         // Delete the doc
         const response = await client.db("example")
                                 .collection("magic")
                                 .deleteOne({
                                    _id : new ObjectId(this.id)
                                 });
 
         // Close the connection
         await client.close();
 
         if (response.deletedCount == 1) {
            return true;
         } else {
            return false;
         }
    }

}

module.exports = Spell;