const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList
} = require("graphql");
const axios = require("axios");
const keys = require("./constant");

const CryptoCurrencyType = new GraphQLObjectType({
  name: "CryptoCurrency",
  fields: () => ({
    currency: { type: GraphQLString },
    price: { type: GraphQLString }
  })
});

const CurrencyNewsType = new GraphQLObjectType({
  name: "CurrencyNews",
  fields: () => ({
    title: { type: GraphQLString },
    categories: { type: GraphQLString },
    url: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    currencies: {
      type: new GraphQLList(CryptoCurrencyType),
      resolve(parent, args) {
        return axios
          .get(`https://api.nomics.com/v1/currencies/ticker?key=${keys.ApiKey}`)
          .then(res => res.data);
      }
    },
    news: {
      type: new GraphQLList(CurrencyNewsType),
      resolve(parent, args) {
        return axios
          .get(
            `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${
              keys.newsApiKey
            }`
          )
          .then(res => res.data.Data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
