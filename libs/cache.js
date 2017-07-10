const NodeCache = require( "node-cache" );
const Case = require('case');
const envTTL = process.env.CACHE_TTL;
const botCache = new NodeCache({stdTTL:  envTTL || 24 * 60 * 60 });
module.exports = {
  store(query, results){
    return botCache.set(Case.kebab(query), results);
  },
  fetch(query){
    return botCache.get(Case.kebab(query));
  }
};
