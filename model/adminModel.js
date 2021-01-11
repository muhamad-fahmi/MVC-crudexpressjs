const Entities = require('html-entities').AllHtmlEntities
const filter = new Entities()
module.exports = {
    login : function(dbcon, data, callback){
        const username = filter.encodeNonUTF(data.username)
        const password = filter.encodeNonUTF(data.password)
        dbcon.query(`
        SELECT * FROM admin WHERE username = '${username}' AND pass = '${password}'`, 
        callback)
    },
    dashboard : function(dbcon, callback){
        dbcon.query("SELECT * FROM mahasiswa", callback)
    },
    insert : function(dbcon, data, callback){
        const noinduk  = filter.encodeNonUTF(data.noinduk)
        const nama = filter.encodeNonUTF(data.nama)
        const prodi = filter.encodeNonUTF(data.prodi)
        const semester = filter.encodeNonUTF(data.semester)
        const alamat = filter.encodeNonUTF(data.alamat)
        dbcon.query(`
        INSERT INTO mahasiswa SET
        noinduk = '${noinduk}',
        nama = '${nama}',
        prodi = '${prodi}',
        semester = '${semester}',
        alamat = '${alamat}'`,
        callback)
    },
    editget : function(dbcon, id, callback){
        const idparams = filter.encodeNonUTF(id)
        dbcon.query(`SELECT * FROM mahasiswa WHERE id = '${idparams}'`, callback)
    },
    update : function(dbcon, data, id, callback){
        const noinduk  = filter.encodeNonUTF(data.noinduk)
        const nama = filter.encodeNonUTF(data.nama)
        const prodi = filter.encodeNonUTF(data.prodi)
        const semester = filter.encodeNonUTF(data.semester)
        const alamat = filter.encodeNonUTF(data.alamat)
        const idparams = filter.encodeNonUTF(id)
        dbcon.query(`
        UPDATE mahasiswa SET
        noinduk = '${noinduk}',
        nama = '${nama}',
        prodi = '${prodi}',
        semester = '${semester}',
        alamat = '${alamat}'
        WHERE id = '${idparams}'
        `, callback)
    },
    delete : function(dbcon, id, callback){
        const idparams = filter.encodeNonUTF(id)
        dbcon.query(`DELETE FROM mahasiswa WHERE id = '${idparams}'`, callback)
    }
}