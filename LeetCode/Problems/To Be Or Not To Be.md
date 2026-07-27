# 2704. To Be Or Not To Be

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/to-be-or-not-to-be](https://leetcode.com/problems/to-be-or-not-to-be)
**Companies:** Adobe, Amazon, Bloomberg, Google, Meta, Microsoft

---

```javascript
var expect = function(val) {
    return {
        toBe: function(expected) {
            if (val !== expected) throw new Error("Not Equal");
            return true;
        },
        notToBe: function(expected) {
            if (val === expected) throw new Error("Equal");
            return true;
        }
    };
};
```
