'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

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
     * Promise to fetch record
     *
     * @return {Promise}
     */
         async find(ctx) {

             // user_role_id 3 : Naturopath
            let naturopath_query = ctx.query;
            naturopath_query["by_user.role"] = '3';

            let plant_reviews = {};
            let naturopath_reviews = await strapi
            .query("plant-review")
            .find(naturopath_query);

            naturopath_reviews.map(naturopath_review => sanitizeEntity(naturopath_review, { model: strapi.models.plant_reviews }));

            // user_role_id 4 : Users
            let user_query = ctx.query;
            user_query["by_user.role"] = '4';

            let user_reviews = await strapi
            .query("plant-review")
            .find(user_query);

            user_reviews.map(user_review => sanitizeEntity(user_review, { model: strapi.models.plant_reviews }));
            
            plant_reviews['naturopath_reviews'] = {'count': naturopath_reviews.length, 'average_rate': getAverageRate(naturopath_reviews), 'reviews': naturopath_reviews};
            plant_reviews['user_reviews'] = {'count': user_reviews.length, 'average_rate': getAverageRate(user_reviews), 'reviews': user_reviews};

            return plant_reviews;
        },
};
