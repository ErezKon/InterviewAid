# 2619. Array Prototype Last

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/array-prototype-last](https://leetcode.com/problems/array-prototype-last)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```javascript
Array.prototype.last = function() {
    return this.length === 0 ? -1 : this[this.length - 1];
};
```
