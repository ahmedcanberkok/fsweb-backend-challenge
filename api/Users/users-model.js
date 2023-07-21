const db = require('../../data/db-config');

//Kullanıcıları veritabanından al.
const getAll = async () => {
    const AllUsers = await db('Users as u')
        .select('u.user_id',
                'u.username',
                'u.email'
        )
    return AllUsers;
};

// Kullanıcıları ID'ye göre al.
const getById = async (id) => {
    const users = await db('Users as u')
     
        .select(
            'u.user_id',
            'u.email',
            'u.password',
            'u.username',
        
        )
        .where('u.user_id', id)
        .first() // {...} => Obj dönecek
    return users;
};

// E-maile göre bir kullanıcıyı veritabanından al
const getByEmail = async (email) =>{
    const mail = await db('Users as u')
        .where(email)
        .select('u.user_id','username','email','password')
        .first()
        return mail ;
}
const getByFilter = async (filter) => {
    const filterByUser = await db('Users as u')
        .where(filter)
        .select("*")
    return filterByUser;
}
// Kullanıcı sil.
const remove =  (id) => {
    return  db('Users')
        .where("user_id" ,id)
        .del()

     
}
//Yeni bir kullanıcıyı oluştur.
const create = async (user) => {
    const [id] = await db('Users').insert(user);
    return await getById(id);
}

// Kullanıcıyı güncelle
const update =  (id, updateUser) => {
    return   db('Users')
        .where('user_id', id)
        .update(updateUser)
    
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