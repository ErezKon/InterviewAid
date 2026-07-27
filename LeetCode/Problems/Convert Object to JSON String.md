# 2633. Convert Object to JSON String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-object-to-json-string](https://leetcode.com/problems/convert-object-to-json-string)
**Companies:** Apple, Google

---

## 1. Problem Description

Implement `JSON.stringify` — convert a JavaScript object/value into a JSON string without using the built-in method. *(JavaScript problem)*

---

## 2. Approach: Recursive Serialization — O(n) ✅

```javascript
function jsonStringify(object) {
    if (object === null) return "null";
    if (typeof object === "boolean") return String(object);
    if (typeof object === "number") return String(object);
    if (typeof object === "string") return '"' + object + '"';
    if (Array.isArray(object)) {
        return "[" + object.map(jsonStringify).join(",") + "]";
    }
    // object
    const pairs = Object.keys(object).map(
        key => '"' + key + '":' + jsonStringify(object[key])
    );
    return "{" + pairs.join(",") + "}";
}
```

| Time | Space |
|------|-------|
| O(n) total elements | O(depth) recursion |

---

## Key Takeaway

> Dispatch on type: null, boolean, number, string, array, or object. Recursively serialize children. Arrays use `[]` with comma-separated values; objects use `{}` with `"key":value` pairs.
