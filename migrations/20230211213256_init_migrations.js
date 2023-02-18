/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table  => {
        table.increments('id');
        table.string('username').unique();
        table.string('email');
        table.string('password');
        table.string('user_type');
        table.boolean('is_verified').defaultTo(false);
        table.timestamps(true, true)
    })
    .createTable('uploads', table  => {
        table.increments('id').primary();
        table.string('upload_link');
        table.boolean('is_active').defaultTo(true);
        table.timestamps(true, true);
    })
    .createTable('fans', table => {
        table.increments('id').primary();
        table.string('full_name');
        table.string("phone_number");
        table.text('bio');
        table.string('address');
        table.string('city');
        table.string('state');
        table.string('country');
        table.integer('user_id').unsigned()
        table.integer('profile_image').unsigned()
        table.foreign('user_id').references('users.id'); 
        table.foreign('profile_image').references('uploads.id');
        table.timestamps(true, true);
    })
    .createTable('brands', table  => {
        table.increments('id').primary();
        table.string('brand_name');
        table.string('phone_number');
        table.text('bio');
        table.string('address');
        table.string('city');
        table.string('state');
        table.string('country');
        table.integer('user_id').unsigned()
        table.integer('brand_image').unsigned()
        table.foreign('user_id').references('users.id'); 
        table.foreign('brand_image').references('uploads.id')
        table.timestamps(true, true);
    })
    .createTable('fans_brands', table => {
        table.integer('fan_id').unsigned()
        table.integer('brand_id').unsigned()
        table.foreign('fan_id').references('fans.id'); 
        table.foreign('brand_id').references('brands.id'); 
        table.timestamps();
    })
    .createTable('otps', table => {
        table.increments('id').primary()
        table.string('otp');
        table.boolean('is_verified');
        table.string('expiration_time');
        table.timestamps(true, true)
    })
    .createTable('otps_requests', table => {
        table.increments('id');
        table.integer('user_id').unsigned();
        table.timestamp('request_time').notNullable().defaultTo(knex.fn.now());
        table.integer('otp_id').unsigned();

        table.foreign('otp_id').references('otps.id');
        table.foreign('user_id').references('users.id');
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('fans_brands')
        .dropTableIfExists('fans')
        .dropTableIfExists('brands')
        .dropTableIfExists('uploads')
        .dropTableIfExists('otps_requests')
        .dropTableIfExists('otps')
        .dropTable('users')

};
