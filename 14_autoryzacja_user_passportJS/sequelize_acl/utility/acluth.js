import { permissions } from "./permissions.js";

function getGuestDefaultUser(){
    return {
        role: 'user'
    }
}

function authRole(req,res,next){

    console.log('authRole');
    const resource = req.route.path;
    const method = req.method.toLowerCase();
    console.log('resource: ', resource, ',method', method);

    if(!req.user){
        req.user = getGuestDefaultUser();
        //return res.redirect('/?msg=forbidden-access)
    }

    console.log('req.user',req.user);
    if(permissions.isResourceAllowedForUser(req.user.role, resource,method)){
        return next();
    }else{
        req.status(401);
        return res.send('accress forbidden');
    }

    return next();
}

export {
    authRole
}