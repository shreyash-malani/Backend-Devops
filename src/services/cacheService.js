const cache = new Map();

function set(key, value, ttl = 300000) {   // 5 minutes default TTL //millisecond 
  cache.set(key, { value, expires: Date.now() + ttl });
}

function get(key) {
  const item = cache.get(key);
  if (item && item.expires > Date.now()) {
    return item.value;
  }
  cache.delete(key);
  return null;
}

function clear() {
  cache.clear();
}

module.exports = { set, get, clear };