# 2618. Check if Object Instance of Class

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-object-instance-of-class](https://leetcode.com/problems/check-if-object-instance-of-class)
**Companies:** Google, Microsoft

---

## 1. Problem Description

Implement a function that checks if a value is an instance of a given class or superclass, similar to `instanceof` but also works for primitives (e.g., `5` should be instance of `Number`). *(JavaScript problem)*

---

## 2. Approach: Prototype Chain Walk — O(depth) ✅

```javascript
var checkIfInstanceOf = function(obj, classFunction) {
    if (obj === null || obj === undefined || typeof classFunction !== 'function')
        return false;
    let proto = Object.getPrototypeOf(Object(obj));
    while (proto !== null) {
        if (proto === classFunction.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};
```

Key: wrap `obj` with `Object(obj)` to handle primitives (auto-boxing).

---

## Key Takeaway

> Walk the prototype chain via `Object.getPrototypeOf()`. Use `Object(obj)` to auto-box primitives so they have a prototype chain to traverse.
