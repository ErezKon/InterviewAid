# 2700. Differences Between Two Objects

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/differences-between-two-objects](https://leetcode.com/problems/differences-between-two-objects)
**Companies:** Couchbase, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Recursive Comparison](#approach-recursive-comparison)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Write a function that accepts two deeply nested objects or arrays `obj1` and `obj2` and returns a new object representing their differences.

The function should compare the properties of the two objects and identify any changes. The returned object should only contains keys where the value is different from `obj1` to `obj2`.

For each changed key, the value should be represented as an array `[obj1 value, obj2 value]`. Keys that exist in one object but not in the other should not be included in the returned object. The end result should be a deeply nested object where each leaf value is a difference array.

When comparing two arrays, the indices of the arrays are considered to be their keys.

You may assume that both objects are the output of `JSON.parse`.

**Constraints:**
- `obj1` and `obj2` are valid JSON objects or arrays
- `2 <= JSON.stringify(obj1).length <= 10^4`
- `2 <= JSON.stringify(obj2).length <= 10^4`

---

## Examples

**Example 1:**
```
Input: obj1 = {}
obj2 = {
  "a": 1,
  "b": 2
}
Output: {}
Explanation: There were no modifications made to obj1. New keys "a" and "b" appear in obj2, but keys that are added or removed should be ignored.
```

**Example 2:**
```
Input: obj1 = {
  "a": 1,
  "v": 3,
  "x": [],
  "z": {
    "a": null
  }
}
obj2 = {
  "a": 2,
  "v": 4,
  "x": [],
  "z": {
    "a": 2
  }
}
Output: {
  "a": [1, 2],
  "v": [3, 4],
  "z": {
    "a": [null, 2]
  }
}
Explanation: The keys "a", "v", and "z" all had changes applied. "a" was changed from 1 to 2. "v" was changed from 3 to 4. "z" had a change applied to a child object. "z.a" was changed from null to 2.
```

**Example 3:**
```
Input: obj1 = {
  "a": 5,
  "v": 6,
  "z": [1, 2, 4, [2, 5, 7]]
}
obj2 = {
  "a": 5,
  "v": 7,
  "z": [1, 2, 3, [1]]
}
Output: {
  "v": [6, 7],
  "z": {
    "2": [4, 3],
    "3": {
      "0": [2, 1]
    }
  }
}
Explanation: In obj1 and obj2, the keys "v" and "z" have different assigned values. "a" is ignored because the value is unchanged. In the key "z", there is a nested array. Arrays are treated like objects where the indices are keys. There were two alterations to the the array: z[2] and z[3][0]. z[0] and z[1] were unchanged and thus not included. z[3][1] and z[3][2] were removed and thus not included.
```

**Example 4:**
```
Input: obj1 = {
  "a": {"b": 1},
}
obj2 = {
  "a": [5],
}
Output: {
  "a": [{"b": 1}, [5]]
}
Explanation: The key "a" exists in both objects. Since the two associated values have different types, they are placed in the difference array.
```

**Example 5:**
```
Input: obj1 = {
  "a": [1, 2, {}],
  "b": false
}
obj2 = {
  "b": false,
  "a": [1, 2, {}]
}
Output: {}
Explanation: Apart from a different ordering of keys, the two objects are identical so an empty object is returned.
```

---

## Key Insight

> Recursively walk both objects in parallel. At each key, if both values are objects/arrays, recurse. If they're primitives and differ, record `[old, new]`. If types mismatch (one is object, other is primitive), record the full change.

---

## Approach: Recursive Comparison ✅

```
FUNCTION objDiff(obj1, obj2):
    // Base case: if either is not an object (or is null), compare directly
    IF NOT isObject(obj1) OR NOT isObject(obj2) THEN
        IF obj1 = obj2 THEN RETURN {}
        RETURN [obj1, obj2]

    result ← {}
    FOR key IN intersection of keys(obj1) and keys(obj2) DO
        sub ← objDiff(obj1[key], obj2[key])
        IF sub is not empty THEN
            result[key] ← sub

    RETURN result

FUNCTION isObject(val):
    RETURN val is not null AND typeof val = "object"
```

---

## Walkthrough

```javascript
obj1 = {"a": {"x": 1, "y": 2}, "b": 5}
obj2 = {"a": {"x": 1, "y": 3}, "b": 5}
```

1. Key `"a"`: both objects → recurse
   - Key `"x"`: `1 == 1` → no diff
   - Key `"y"`: `2 != 3` → `[2, 3]`
   - Return `{"y": [2, 3]}`
2. Key `"b"`: `5 == 5` → no diff
3. Result: `{"a": {"y": [2, 3]}}` ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | n = total number of keys across both objects |
| **Space** | O(d) | d = maximum nesting depth (recursion stack) |

---

## Follow-Up Questions

**Q1: Why ignore keys present in only one object?**
> Per problem definition, "differences" only apply to shared keys. Added/removed keys are not considered.

**Q2: How do arrays work?**
> Arrays are objects with numeric indices. Compare by index — `arr1[0]` vs `arr2[0]`, etc. Indices present in only one array are ignored.

**Q3: What about circular references?**
> Not handled in the basic problem. In production, you'd track visited objects with a `WeakSet` to avoid infinite recursion.

---

## Key Takeaway

> **Deep object comparison is a recursive tree walk — at each node, check types, recurse into matching sub-objects, and record leaf-level differences as `[old, new]` pairs.**
