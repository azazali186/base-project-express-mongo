const Permissions = require('../models/permissions')
const Role = require('../models/roles')

const getMethodName = (key) => {
    switch (key) {
        case "GET":
            return "View"
            break;
        case "POST":
            return "Create"
            break;
        case "PATCH":
            return "Edit-update"
            break;
        case "PUT":
            return "Edit-update"
            break;
        case "DELETE":
            return "delete"
            break;

        default:
            break;
    }
}



async function getRoleData() {
    try {
        let getRoleData = await  Role.findOne({
            name : "admin"
        });
        let perm = await Permissions.find()
        if(!getRoleData){
            await Role.create({
                "name": "admin",
                "permissions": perm
            })
        }else{
          let p = await Role.findOneAndUpdate(
                {
                    _id:getRoleData.id,
                },
                {
                    permissions: perm
                }
            )
        }
        getRoleData = await Role.findOne({
            name : "customer"
        });
        if(!getRoleData){
            await Role.create({
                "name": "customer"
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const getPermissionsData = (expressListRoutes, app) =>{
    const allRoute = expressListRoutes(app)
    allRoute.map(async (routeData) => {
        let name = (getMethodName(routeData.method) + (routeData.path).split(':')[0].replaceAll('\\', "-")).toLowerCase();
        if (name.endsWith('-')) {
            name = name.slice(0, -1);
        }
        let path = routeData.path
        if (path.endsWith('\\')) {
            path = path.slice(0, -1);
        }
        let permission = await Permissions.findOne({
            name: name,
            path: path
        })
        if (!permission) {
            await Permissions.create({
                name: name,
                path: path,
            })
        }
    })
}



const inserData = async (expressListRoutes, app) => {
    getPermissionsData(expressListRoutes, app)
    await getRoleData()
}

module.exports = { getMethodName ,inserData }