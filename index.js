const express = require('express')
const app = express()
const port = 3000;
const db = require('./models');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server started on port 3000 `);
})

db.sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log("Server started");
        })
    })
    .catch((err) => {
        console.log(err);
    });

app.post("/Buku", async (req, res) => {
    const data =req.body;
    try {
        const buku = await db.Buku.create(data);
        res.send(buku);
    } catch (err) {
        res.send(err);
    }
});

app.get("/Buku", async (req, res) => {
    try {
        const buku = await db.Buku.findAll();
        res.send(buku);
    } catch (err) {
        res.send(err);
    }
});

app.put("/Buku/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        // gunakan nama model yang benar (besar )
        const buku = await db.Buku.findByPk(id);
        if (!buku) {
            return res.status(404).send({ message: "Buku tidak ditemukan" });
        }

        await buku.update(data);
        res.send({ message: 'buku berhasil diupdate', buku });
    } catch (err) {
        res.status(500).send({ error: err.message || err });
    }
});

app.delete("/Buku/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const buku = await db.Buku.findByPk(id);
        if (!buku) {
            return res.status(404).send({ message: "buku tidak ditemukan" });
        }
        await buku.destroy();
        res.send({ message: "buku berhasil dihapus" });
    } catch (err) {
        res.status(500).send(err);
    }
});