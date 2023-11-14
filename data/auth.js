import SQ from 'sequelize';
import {sequelize} from '../db/database.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
    'user', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },  
        username: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        url: DataTypes.TEXT
    },
    {timestamps: false}
);
//  이런식으로 필드를 만드는거임
// orm이나 odm 자동적으로 s가 붙음 
// user 테이블을 만들기위한 코드
// 기존테이블이 있을때 user 테이블이 만들어지지 않음 // 없으면 기존 테이블을 사용함

export async function findByUsername(username) {
    return User.findOne({where: {username}});
}

export async function findById(id) {
    return User.findByPk(id);
}

export async function createUser(user) {
    return User.create(user).then((data) => data.dataValues.id);
}