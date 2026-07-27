# 2727. Is Object Empty

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/is-object-empty](https://leetcode.com/problems/is-object-empty)
**Companies:** Google

---

## 1. Problem Description

Given an object or array, return `true` if it is empty (no keys for objects, length 0 for arrays).

---

## 2. Approach — O(1) ✅

```javascript
FUNCTION isEmpty(obj):
    RETURN Object.keys(obj).length === 0
```

---

## 3. Key Takeaway

> A JavaScript fundamentals problem. `Object.keys()` works for both objects and arrays. For arrays, `Array.isArray(obj) && obj.length === 0` is also valid.
