'use strict';
const { sanitizeEntity } = require('strapi-utils');
const qs = require('qs');
const axios = require('axios');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */


const getKeywords = async (product) => {
    return ['Syndrome prémenstruel', 'Acidité gastrique', 'Constipation'];
    let plantIds = await strapi.connections.default.raw(
        `SELECT * FROM plants_products__products_plants WHERE product_id = (${product.id})`
      );
    //   plantIds = JSON.stringify(plantIds.rows);
    //   plantIds = JSON.parse(plantIds).map((a) => a.plant_id);
    plantIds =  plantIds[0].map((plant) => plant.plant_id);
  
      const results = await strapi
        .query("plant")
        .model.query((qb) => {
          qb.where("id", "in", plantIds);
        })
        .fetchAll({
        });
    return results.toJSON();
 }

module.exports = {
    /**
     * Promise to fetch record
     *
     * @return {Promise}
     */
     async find(ctx) {
        let final_data = [];
        let products = await strapi
        .query("product")
        .find(ctx.query);

        products.map(product => sanitizeEntity(product, { model: strapi.models.product }));

        if(ctx.state.user.role.id == 3 || ctx.state.user.role.id == 4){
          // add fav data if the login user is a Naturopath or a Patient
          const login_user = await strapi
          .query('user', 'users-permissions')
          .findOne({id: ctx.state.user.id});

          if(login_user.fav_products.length > 0){

            let fav_product_ids = [];
            fav_product_ids = login_user.fav_products.map(function(obj) {
                return obj['id'];
            });

            let rec_product_ids = [];
            // rec_product_ids = login_user.fav_products.map(function(obj) {
            //     return obj['id'];
            // });

            // add isFavorite field to the array
            products.forEach(product => {
              const isFavorite = fav_product_ids.includes(product.id);
              const isReccomended = false;
              // const isReccomended = rec_product_ids.includes(product.id);
              product.isFavorite = isFavorite;
              product.isReccomended = isReccomended;
              final_data.push(product);
            });
          }
        }
        return final_data;
    },

        /**
     * Promise to fetch record
     *
     * @return {Promise}
     */
         async findOne(ctx) {
          const product = await strapi
          .query("product")
          .findOne({ id: ctx.params.id }, ["plants.plant_family","plants.indications"]);
  
          product.keywords = await getKeywords(product);
  
          return product;
      },

    /**
     * Promise to fetch record
     *
     * @return {Promise}
     */
     async findByIndication(ctx) {
      /* 
        1. get indication_id from param 
        2. get plants related to the indication_id
        3. get products from the plants data
      */

      // 1. get indication_id from param 
      const indication_id = ctx.params.indication_id;

      // 2. get plants related to the indication_id
      let target_plants = await strapi.query('plant').find({'indications.id': indication_id});
      target_plants.map(target_plant => sanitizeEntity(target_plant, { model: strapi.models.plant }));

      // 3. get products from the plants data
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
    },
  };