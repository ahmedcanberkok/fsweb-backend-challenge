/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').truncate()
  await knex('Roles').truncate()
  await knex('Tweets').truncate()
  await knex('Mentions').truncate()
  await knex('Likes').truncate()
  
  await knex('Roles').insert([
    {id:1, role_name: 'admin'},
    {id:2,role_name: 'owner'}
  ])
  await knex('Users').insert([
    {user_id: 1, email: 'canbo@tclone.com', password: '1234', username: 'canberkok', role_id: 1 },
    {user_id: 2, email: 'ali@tclone.com', password: '1234', username: 'alitclone', role_id: 2 },
    {user_id: 3, email: 'veli@tclone.com', password: '1234', username: 'velitclone', role_id: 2 }
    
  ]);
  await knex('Tweets').insert([
    {tweet_id: 1, tweet: 'bu benim ilk tweetim', created: new Date() , likes_count: 0, user_id: 1 },
    {tweet_id: 2, tweet: 'merhaba ben Ali', created: new Date() , likes_count: 0, user_id: 2 },
    {tweet_id: 3, tweet: 'merhaba ben veli', created: new Date() , likes_count: 0, user_id: 3 },
    {tweet_id: 4, tweet: 'ben adminim', created: new Date() , likes_count: 0, user_id: 1 },
    
  ]);
  await knex('Mentions').insert([
    {mention_id: 1, user_id:2, tweet_id:1, mention: 'ilk mention benden', created: new Date() },
    {mention_id: 2, user_id:1, tweet_id:4, mention: 'Merhaba Twitter', created: new Date() },
    {mention_id: 3, user_id:3, tweet_id:2, mention: 'Selam Ali', created: new Date() },
  ]);

  await knex('Likes').insert([
    {like_id: 1, user_id:2, tweet_id:1,  created: new Date() },
    {like_id: 2, user_id:1, tweet_id:3, created: new Date() },
    {like_id: 3, user_id:3, mention_id: 2, created: new Date() },
  ]);
};


