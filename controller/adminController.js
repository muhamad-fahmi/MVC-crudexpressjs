const adminModel = require('../model/adminModel')
const session = require('express-session')
const Entities =  require('html-entities').XmlEntities
const filter = new Entities()

module.exports = {
    index : function(req, res){
        res.render('admin/login')
    },
    login : function(req, res){
        adminModel.login(req.dbcon, req.body, function(err, field){
            if(err) throw err
            if(field.length > 0){
                req.session.loggedin = true
                req.session.username = field[0].username
                res.redirect('/admin/dashboard')
            }else{
                res.render('admin/login', {pesan : 'Invalid username and password!'})
            }
        })
    },
    dashboard : function(req, res){
        if(req.session.loggedin){
            adminModel.dashboard(req.dbcon, function(err, rows){
                if (err) throw err
                res.render('admin/index', {data : rows})
            })
        }else{
            res.render('admin/login', {pesan : 'Your session has been ended!'})
        }
    },
    tambah : function(req, res){
        if(req.session.loggedin){
            res.render('admin/insert')
        }else{
            res.render('admin/login', {pesan : 'Your session has been ended!'})
        }
        
    },
    insert : function(req, res){
       if(req.session.loggedin){
            adminModel.insert(req.dbcon, req.body, function(err){
                if(err) throw err
                res.redirect('/admin/dashboard')
            })
       }else{
        res.render('admin/login', {pesan : 'Your session has been ended!'})
       }
    },
    edit : function(req, res){
        if(req.session.loggedin){
            adminModel.editget(req.dbcon, req.params.id, function(err, field){
                if (err) throw err
                res.render('admin/edit', {data : field[0]})
            })
        }else{
            res.render('admin/login', {pesan : 'Your session has been ended!'})
        }
    },
    update : function(req, res){
        if(req.session.loggedin){
            adminModel.update(req.dbcon, req.body, req.params.id, function(err){
                if(err) throw err
                res.redirect('/admin/dashboard')
            })
        }else{
            res.render('admin/login', {pesan : 'Your session has been ended!'})
        }
    },
    delete : function(req, res){
        if(req.session.loggedin){
            adminModel.delete(req.dbcon, req.params.id, function(err){
                if(err) throw err
                res.redirect('/admin/dashboard')
            })
        }else{
            res.render('admin/login', {pesan : 'Your session has been ended!'})
        }
    },
    logout : function(req, res){
        req.session.destroy((err) => {
            res.redirect('/admin')
          })
    }
}