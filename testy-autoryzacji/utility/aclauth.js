
import { permissions } from "./permissions.js";

function getGuestDefaultUser() {
    return {
        role: "user"
    };
}

function authRole(req, res, next) {
    /*
        req.passport.session: { user: "gds6df7sds7dfgs7d6f677s6d" } albo undefined
        req.user: {
            _id: s87dfgs8dfs87dfg,
            password: "ds87dfgs8dfgs87dfg8s7dfg",
            email: "ola@example.com",
            role: "user",
            created: ""
        }
    */

    console.log("authRole() - middleware");
    const resource = req.route.path; //   /dashboard
    const method = req.method.toLowerCase();
    console.log("resource:", resource, "metod:", method);

    if (!req.user) {
        // jeśli jest nie zalogowany to passport nie wstawił danych usera i nie ma role, tworzymy guest
        req.user = getGuestDefaultUser();
        // return res.redirect("/?msg=forbidden-access")
    }

    console.log("req.user", req.user);

    if (permissions.isResourceAllowedForUser(req.user.role, resource, method)) {
        // ma dostęp
        return next();
    } else {
        // nie ma dostępu
        res.status(401);
        return res.send("Access forbidden");
    }

    return next();
}

export {
    authRole
}