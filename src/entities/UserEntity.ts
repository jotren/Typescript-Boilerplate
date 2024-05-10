import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import ErrorMessage from "../util/ErrorMessage"
import { HttpCode } from "../util/HttpCodes"

export const roles = {
    readonly: 'readonly',
    admin: 'admin'
}

export const rolesArray = [
    roles.readonly,
    roles.admin
]
@Entity({name: 'users'})
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    email: string

    @Column()
    name: string

    @Column()
    role: string

    static get notFoundError() {
        return new ErrorMessage(HttpCode.notFound, "User not found");
    }
}
