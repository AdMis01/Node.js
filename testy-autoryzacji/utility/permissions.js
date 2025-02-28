
const usersRoles = [
    {
        role: "admin",
        allows: [
            { resource: "/admin/users", permissions: "*" }, // * to wszystkie metody jak get, post
            { resource: "/admin/users/add", permissions: "*" },
            { resource: "/admin/users/edit", permissions: "*" },
            { resource: "/admin/users/edit/:id", permissions: "*" }
        ]
    },
    {
        role: "user",
        allows: [
            { resource: "/dashboard", permissions: ["post", "get"] }
        ]
    },
    {
        role: "guest",
        allows: []
    }
];

const permissions = {
    usersRoles: usersRoles,
    addRoleParents: function(targetRole, sourceRole) {
        // kopiuje role z source do target czyli np admin ma dodatkowo role usera aby się nie powtarzać z urlami
        const targetData = this.usersRoles.find( v => v.role === targetRole ); // np obiekt z role admin
        const sourceData = this.usersRoles.find( v => v.role === sourceRole ); // np obiekt z role user

        targetData.allows = targetData.allows.concat( sourceData.allows );
    },
    isResourceAllowedForUser: function(userRole, resource, method) {
        // sprawdza czy user o określonej roli może mieć dostęp do resource
        // zwraca false jeśli nie ma dostępu, true jeśli ma dostęp
        const roleData = this.usersRoles.find( v => v.role === userRole );

        if (!roleData) return false; // brak dostępu bo nie ma takie roli obsługiwanej na serwerze
        
        const resourceData = roleData.allows.find( v => v.resource === resource );
        if (!resourceData) return false; // osoba o tej roli nie ma info o tym adresie więc nie ma dostępu
        if (!resourceData.permissions) return false; // nie ma dostępu bo nie ma opisanych dozwolonych metod

        if (!Array.isArray(resourceData.permissions)) {
            if (resourceData.permissions === "*") return true; // dostęp do wszystkich metod, może korzystać z url
            if (resourceData.permissions === method) return true; // ma dostęp do tej metody, więc może korzystać
        } else {
            // tablica
            if (resourceData.permissions.find(v => v === "*")) return true; // ma dostęp
            if (resourceData.permissions.find(v => v === method)) return true; // ma dostęp
        }

        return false; // brak dostępu
    }
};

permissions.addRoleParents("admin", "user");
//console.log( JSON.stringify(permissions.usersRoles, null, 4));

console.log( permissions.isResourceAllowedForUser("admin", "/dashboard", "get") ); // true
console.log( permissions.isResourceAllowedForUser("admin", "/dashboard", "delete") ); // false
console.log( permissions.isResourceAllowedForUser("admin", "/admin/users", "get") ); // true
console.log( permissions.isResourceAllowedForUser("admin", "/api/data/10", "get") ); // false
console.log( permissions.isResourceAllowedForUser("user", "/admin/users", "get") ); // false
console.log( permissions.isResourceAllowedForUser("user", "/dashboard", "get") ); // true
console.log( permissions.isResourceAllowedForUser("user", "/api/user/1", "get") ); // false
console.log( permissions.isResourceAllowedForUser("guest", "/dashboard", "get") ); // false


export {
    permissions
};