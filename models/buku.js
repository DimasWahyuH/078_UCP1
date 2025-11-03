module.exports = (sequelize, DataTypes) => {
    const buku_perpustakaan = sequelize.define("Buku", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
            judul: {
            type: DataTypes.STRING,
        },
            pengarang: {
            type: DataTypes.STRING,
        },
            tahun_terbit: {
            type: DataTypes.STRING,
        },
            bidang: {
            type: DataTypes.STRING,
        },
    });

    return buku_perpustakaan;
}