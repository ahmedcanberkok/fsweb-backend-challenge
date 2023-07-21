/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("Users", function usersTable(table) {
            table.increments("user_id").primary();
            table.string("username", 50)
                .notNullable();
            table.string("email", 50)
                .notNullable()
                .unique();
            table.string("password")
                .notNullable();
                
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

};
