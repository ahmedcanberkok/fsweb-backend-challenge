/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("Roles", function rolesTable(table) {
            table.increments("id").primary;
            table.string('role_name', 32)
                .notNullable()
                .unique();

        })
        .createTable("Users", function usersTable(table) {
            table.increments("user_id").primary();
            table.string("username", 50)
                .notNullable();
            table.string("email", 50)
                .notNullable()
                .unique();
            table.string("password")
                .notNullable();
            table.integer("role_id") //Foreign Key
                .notNullable()
                .defaultTo(2)
                .references('id')
                .inTable('Roles')
                .onUpdate('RESTRICT')
                .onDelete('RESTRICT'); // RESTRICT kullanıldıgında, ilgili satır silindiginde alt/üst satır silinmez
                
        })
        .createTable("Tweets", function tweetsTable(table) {
            table.increments("tweet_id").primary();
            table.string("tweet", 156)
                .notNullable();
            table.timestamp('created')
                .notNullable()
                .defaultTo(knex.fn.now());
            table.integer('likes_count')
                .defaultTo(0);
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references("user_id")
                .inTable("Users")
                .onDelete("RESTRICT")
                .onUpdate("RESTRICT");
        })
        .createTable("Mentions",function mentionsTable(table) {
            table.increments("mention_id");
            table.integer("user_id")
                .notNullable()
                .unsigned()
            table.foreign("user_id")
                .references("user_id")
                .inTable("Users")
                .onUpdate("RESTRICT")
                .onDelete("RESTRICT")
            table.integer("tweet_id")
                .notNullable()
                .unsigned()
            table.foreign("tweet_id")
                .references("tweet_id")
                .inTable("Tweets")
                .onUpdate("RESTRICT")
                .onDelete("RESTRICT")
            table.string("mention",156)
                .notNullable()
            table.timestamp('created')
                .notNullable()
                .defaultTo(knex.fn.now());
            table.integer('likes_count')
                .defaultTo(0);
            
        })
        .createTable("Likes",function likesTable(table) {
            table.increments("like_id").primary();
            table.integer("user_id")
                .notNullable()
                .unsigned()
            table.foreign("user_id")
                .references("user_id")
                .inTable("Users")
                .onUpdate("RESTRICT")
                .onDelete("RESTRICT")
            table.integer("tweet_id")
                .unsigned()
            table.foreign("tweet_id")
                .references("tweet_id")
                .inTable("Tweets")
                .onUpdate("RESTRICT")
                .onDelete("RESTRICT")
            table.integer("mention_id")
                .unsigned()
            table.foreign("mention_id")
                .references("mention_id")
                .inTable("Mentions")
                .onUpdate("RESTRICT")
                .onDelete("RESTRICT")
            table.timestamp('created')
                .notNullable()
                .defaultTo(knex.fn.now());
          
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("Likes") 
        .dropTableIfExists("Mentions")
        .dropTableIfExists("Tweets")
        .dropTableIfExists("Users")
        .dropTableIfExists("Roles");

};
