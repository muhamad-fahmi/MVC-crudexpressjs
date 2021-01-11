const clientModel = require('../model/clientModel')
module.exports = {
    index : function(req, res){
        clientModel.index(req.dbcon, function(err, fields){
            if(err) throw err
            res.render('client/index', {data : fields})
        })
    }
}