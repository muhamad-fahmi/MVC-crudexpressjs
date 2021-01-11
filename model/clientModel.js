module.exports = {
    index : function(dbcon, callback){
        dbcon.query(`SELECT * FROM mahasiswa`, callback)
    }
}