const knex = require("knex");
const {NODE_ENV} = require('../config');
const config = require('../knexfile');

const db = knex(config[NODE_ENV]);7

module.exports = db;