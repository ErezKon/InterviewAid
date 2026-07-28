# 2755. Deep Merge of Two Objects

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/deep-merge-of-two-objects](https://leetcode.com/problems/deep-merge-of-two-objects)
**Companies:** Valve

---

## Problem Description

Recursively merge two objects. If both values are objects, merge deeply. Otherwise, the second value wins.

---

## Examples

**Example 1:**
```
Input: obj1 = {a:1, b:{c:2}}, obj2 = {b:{d:3}, e:4}
Output: {a:1, b:{c:2, d:3}, e:4}
Explanation: `b` is an object in both, so merge its fields; `e` is added from obj2.
```

**Example 2:**
```
Input: obj1 = {x:5}, obj2 = {x:{y:6}}
Output: {x:{y:6}}
Explanation: Since obj2's value for `x` is an object while obj1's is a primitive, the second value overwrites.
```

---

## Approach

```
FUNCTION deepMerge(obj1, obj2):
    IF NOT isObject(obj1) OR NOT isObject(obj2):
        RETURN obj2
    result ← COPY(obj1)
    FOR EACH key IN KEYS(obj2):
        IF key IN result AND isObject(result[key]) AND isObject(obj2[key]):
            result[key] ← deepMerge(result[key], obj2[key])
        ELSE:
            result[key] ← obj2[key]
    RETURN result

FUNCTION isObject(val):
    RETURN val ≠ NULL AND TYPE(val) = OBJECT AND NOT IS_ARRAY(val)
```

---

## Walkthrough

**Example 1:** `obj1 = {a:1, b:{c:2}}, obj2 = {b:{d:3}, e:4}`

1. Call `deepMerge` on the top‑level objects.
2. `a` exists only in `obj1` → copied to result.
3. `b` exists in both and both values are objects → recurse:
   - Merge `{c:2}` with `{d:3}` → result `{c:2, d:3}`.
4. `e` exists only in `obj2` → added to result.
5. Final merged object: `{a:1, b:{c:2, d:3}, e:4}`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – each key is visited once, recursion follows the depth of nesting |
| **Space** | O(d) – recursion stack depth `d` equals the maximum nesting level |

---

## Follow-Up Questions

- How would you modify the algorithm to merge arrays by concatenation instead of overwriting?
- Can you implement the merge iteratively using an explicit stack?
- How would you handle circular references in the objects?

---

## Key Takeaway

> **Deep merge = recursive descent. If both values are plain objects, recurse; otherwise, the second value overwrites. Use an `isObject` guard to avoid merging arrays or primitives.**