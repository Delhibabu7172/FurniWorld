import { ADMINMENUS } from "./AdminMenu"
import { DEFAULTMENUS } from "./DefaultMenu";

export enum Role {
    ADMIN = 'ADMIN',
}

export const getRoleMenuItems: any = (role : any) => {

    if (!role) { // if role is undefined or falsy, return DEFAULTMENUS
        return DEFAULTMENUS;
    }
    
    switch(role){
        case Role.ADMIN:
             return ADMINMENUS;
        default: 
            return DEFAULTMENUS
    }
}

