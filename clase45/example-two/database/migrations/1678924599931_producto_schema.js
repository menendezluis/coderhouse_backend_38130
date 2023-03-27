"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductoSchema extends Schema {
  up() {
    this.create("productos", (table) => {
      table.increments();
      table.string("name", 80).notNullable().unique();
      table.string("description", 150);
      table.integer("price");
      table.timestamps();
    });
  }

  down() {
    this.drop("productos");
  }
}

module.exports = ProductoSchema;
