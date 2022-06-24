'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const getProducts = async (indication_id) => {
    /* 
        1. get plants related to the indication_id
        2. get products from the plants data
    */

    // 1. get plants related to the indication_id
    let target_plants = await strapi.query('plant').find({'indications.id': indication_id});

    // 2. get products from the plants data
    let target_products = [];
    target_plants.forEach(plant => {
        if(plant.products.length > 0){
        plant.products.forEach(product => {
            let isDuplicate;
            isDuplicate = target_products.some((target_product) => target_product.id === product.id);
            if(!isDuplicate) target_products.push(product);
        });
        }
    });
    return target_products;
} 

module.exports = {
     /**
     * Promise to fetch record
     *
     * @return {Promise}
     */
    // async find(ctx) {
    //     let indications = await strapi
    //     .query("indication")
    //     .find();

    //     indications.map(indication => sanitizeEntity(indication, { model: strapi.models.indication }));

    //     let indicationWithProducts = [];

    //     for (let num in indications) {
    //         indications[num].products = await getProducts(indications[num].id);
    //         indicationWithProducts.push(indications[num]); 
    //     }

    //     // indications.forEach( async(indication) => {
    //     //     indication.products = getProducts(indication.id);
    //     //     indicationWithProducts.push(indication); 
    //     // });

    //     return indicationWithProducts;
    // },
};
