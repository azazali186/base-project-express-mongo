const jwt = require("jsonwebtoken")
const Role = require('../models/roles')
const { getMethodName } = require('../utils')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(401).json(err)
      req.user = user
      next()
    })
  } else {
    return res.status(401).json("Required token in header!")
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, async () => {
    let granted = false;

    if(req.user.role != 'admin' || req.user.id != req.params.id ){
      let role = await Role.findOne({
        name: req.user.role
      })
      let permissions = role?.permissions
  
      let name = (getMethodName(req.method) + (req.baseUrl).split(':')[0].replaceAll('\\', "-")).toLowerCase();
      if (name.endsWith('-')) {
        name = name.slice(0, -1);
      }
      permissions.map((p)=>{
        if(name == p.name){
          granted = true
        }
      })
    }

    if (req.user.id === req.params.id || req.user.role == 'admin' || granted) {
      next();
    } else {
      res.status(403).json({
        message: 'You are not Authorize to perform this action!'
      })
    }
  })
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == 'admin') {
      next();
    } else {
      res.status(403).json({
        message: 'You are not Authorize to perform this action!'
      })
    }
  })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }