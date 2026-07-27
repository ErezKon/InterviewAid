# 2620. Counter

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/counter](https://leetcode.com/problems/counter)
**Companies:** Amazon, Bloomberg, Epam Systems, Google, Meta, Microsoft

---

```javascript
var createCounter = function(n) {
    return function() {
        return n++;
    };
};
```

Closure captures `n` and increments on each call.
