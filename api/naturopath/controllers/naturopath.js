'use strict';
const { sanitizeEntity } = require('strapi-utils');
const _ = require('lodash');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const sanitizeUser = user =>
 sanitizeEntity(user, {
   model: strapi.query('user', 'users-permissions').model,
 });

const orgRound = (value, base) => {
    return Math.round(value * base) / base;
}

const getAverageRate = (review_list) => {
    let total_rate = 0;
    review_list.forEach(review => {
        total_rate += review.rate;
    });
    return orgRound(total_rate / (review_list.length), 10);
 }

module.exports = {

    /**
     * Retrieve user records.
     * @return {Object|Array}
     */
    async find(ctx, next, { populate } = {}) {
        let users;
        let final_data = []; // user data + reviews data
        ctx.query.role = '3'; // 3: naturopath's role id

        if (_.has(ctx.query, '_q')) {
            // use core strapi query to search for users
            users = await strapi.query('user', 'users-permissions').search(ctx.query, populate);
        } else {
            users = await strapi.plugins['users-permissions'].services.user.fetchAll(ctx.query, populate);
        }
        users.map(user => sanitizeEntity(user, { model: strapi.models.user }));

        // add review count and average_rate to the array
        users.forEach(user => {
          let count = 0;
          let average_rate = null;
          if(user.given_naturopath_reviews.length > 0){
              count = user.given_naturopath_reviews.length;
              average_rate = getAverageRate(user.given_naturopath_reviews);
          }
          user.count = count;
          user.average_rate = average_rate;
          final_data.push(user);
        });

        return ctx.body = final_data;
    },

    /**
     * Promise to fetch record
     *
     * @return {Promise}
     */
      async findOne(ctx) {
        let users = await strapi
        .query("user")
        .find();

        users.map(user => sanitizeEntity(user, { model: strapi.models.user }));

        return users;
    },

     /**
     * Promise to fetch record
     *
     * @return {Promise}
     */
      async count(ctx) {
        let users = await strapi
        .query("user")
        .find();

        users.map(user => sanitizeEntity(user, { model: strapi.models.user }));

        return users.length;
    },
};