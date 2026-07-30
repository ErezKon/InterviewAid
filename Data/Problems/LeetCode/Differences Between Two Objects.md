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

Write a function that accepts two deeply nested objects or arrays `obj1` and `obj2` and returns a new object representing their differences.

- If a value has changed, represent it as `[oldValue, newValue]`.
- Only include keys where values differ.
- If both values are objects (or arrays), recursively compare.
- If types differ (e.g., object vs primitive), treat as a full change.
- Ignore keys that exist in only one object (not a "difference").

This is a **JavaScript** problem (LeetCode 30 Days of JavaScript series).

---

## Examples

**Example 1:**
```javascript
obj1 = {"a": 1, "b": 2}
obj2 = {"a": 1, "b": 3}
Output: {"b": [2, 3]}
// Only "b" changed
```

**Example 2:**
```javascript
obj1 = {"a": {"x": 1}, "b": 2}
obj2 = {"a": {"x": 2}, "b": 2}
Output: {"a": {"x": [1, 2]}}
// Nested difference in a.x
```

**Example 3:**
```javascript
obj1 = {"a": [1, 2, 3]}
obj2 = {"a": [1, 2, 4]}
Output: {"a": {"2": [3, 4]}}
// Arrays compared by index, index 2 changed
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
