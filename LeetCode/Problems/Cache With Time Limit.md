# 2622. Cache With Time Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cache-with-time-limit](https://leetcode.com/problems/cache-with-time-limit)
**Companies:** Amazon, Confluent, Google, Microsoft, Netflix, Oracle, Uber

---

```javascript
var TimeLimitedCache = function() {
    this.cache = new Map(); // key → {value, timer}
};

TimeLimitedCache.prototype.set = function(key, value, duration) {
    const exists = this.cache.has(key);
    if (exists) clearTimeout(this.cache.get(key).timer);
    const timer = setTimeout(() => this.cache.delete(key), duration);
    this.cache.set(key, { value, timer });
    return exists;
};

TimeLimitedCache.prototype.get = function(key) {
    return this.cache.has(key) ? this.cache.get(key).value : -1;
};

TimeLimitedCache.prototype.count = function() {
    return this.cache.size;
};
```
