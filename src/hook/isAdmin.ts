
export function isAdmin(authorities) {
    if(authorities){
        const userAuthorities = String(authorities).split(',');
        return ['ROLE_ADMIN'].every(permission => userAuthorities.includes(permission));
    }
}