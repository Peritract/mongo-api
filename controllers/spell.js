const e = require("cors");
const Spell = require("../models/spell");

async function index (req, res) {
    try {
        const data = await Spell.getAll();
        res.json(data);
    } catch (err) {
        console.log(err.message);
        res.status(500);
        res.json("Unable to retrieve spells.")
    }
}

async function create (req, res) {
    try {
        const data = await Spell.create(req.body);
        res.status(201);
        res.json(data);
    } catch (err) {
        console.log(err.message);
        res.status(400);
        res.json("Unable to create spell.")
    }
}
    
async function destroy(req, res) {
    
    const id = req.params.id;

    try {

        const doc = await Spell.getOneById(id);

        const deleted = await doc.delete();

        if (deleted) {
            res.sendStatus(204);
        } else {
            throw new Error("Unable to delete document.");
        }
    } catch (err) {
        console.log(err.message);
        res.status(400);
        res.json("Unable to delete spell.")
    }    
}

async function show(req, res) {

    const id = req.params.id;

    try {

        const data = await Spell.getOneById(id);

        res.json(data);

    } catch (err) {
        console.log(err.message);
        res.status(404);
        res.json({
            error: true,
            message: "Unable to locate record."
        })
    }

}

module.exports = {
    index,
    create,
    show,
    destroy
}