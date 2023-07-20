const db = require('../../data/db-config');

//Kullanıcıları veritabanından al.
const getAll = async () => {
    const AllUsers = await db('Users as u')
        .join('Roles', 'u.role_id', 'r.id')
        .select('*')
    return AllUsers;
};

// Kullanıcıları ID'ye göre al.
const getById = async (id) => {
    const users = await db('Users as u')
        .join('Roles as r', 'u.role_id', 'r.id')
        .select(
            'u.user_id',
            'u.email',
            'u.password',
            'u.username',
            'r.role_name as role_name'
        )
        .where('u.user_id', id)
        .first() // {...} => Obj dönecek
    return users;
};

// E-maile göre bir kullanıcıyı veritabanından al
const getByEmail = async (email) =>{
    const mail = await db('Users as u')
        .join('Roles as r', 'u.role_id','r.id')
        .select('user_id','username','email','password');
        return mail ;
}
const getByFilter = async (filter) => {
    const filterByUser = await db('Users as u')
        .join('Roles', 'u.role_id', 'r.id')
        .where(filter)
        .select(
            'u.user_id',
            'email',
            'password',
            'username',
            'r.role_name as role_name'
        )
    return filterByUser;
}
// Kullanıcı sil.
const remove = async (id) => {
    const deletedUsers = await db('Users')
        .where('user_id', id)
        .delete()

    return deletedUsers;
}
//Yeni bir kullanıcıyı oluştur.
const create = async (user) => {
    const [id] = await db('Users').insert(user);
    return getById(id);
}

// Kullanıcıyı güncelle
const update = async (id, updateUser) => {
    const updatedUser = await db('Users')
        .where('user_id', id)
        .update(updateUser)
    return updatedUser;
}
module.exports = {
    getAll,
    getById,
    getByFilter,
    remove,
    create,
    update,
    getByEmail,

}