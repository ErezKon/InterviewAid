# 2755. Deep Merge of Two Objects

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/deep-merge-of-two-objects](https://leetcode.com/problems/deep-merge-of-two-objects)
**Companies:** Valve

---

## Problem Description

Recursively merge two objects. If both values are objects, merge deeply. Otherwise, the second value wins.

---

## Approach

```javascript
function deepMerge(obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)) return obj2;
    const result = { ...obj1 };
    for (const key of Object.keys(obj2)) {
        result[key] = key in obj1 ? deepMerge(obj1[key], obj2[key]) : obj2[key];
    }
    return result;
}

function isObject(val) {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
}
```

---

## Key Takeaway

> **Deep merge = recursive descent. If both values are plain objects, recurse. Otherwise, second value overwrites. Check `isObject` to avoid merging arrays or primitives.**
