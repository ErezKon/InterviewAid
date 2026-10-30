# 2755. Deep Merge of Two Objects

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/deep-merge-of-two-objects](https://leetcode.com/problems/deep-merge-of-two-objects)
**Companies:** Valve

---

## Problem Description

Given two values `obj1` and `obj2`, return a **deepmerged** value.

Values should be **deepmerged** according to these rules:

- If the two values are objects, the resulting object should have all the keys that exist on either object. If a key belongs to both objects, **deepmerge** the two associated values. Otherwise, add the key-value pair to the resulting object.
- If the two values are arrays, the resulting array should be the same length as the longer array. Apply the same logic as you would with objects, but treat the indices as keys.
- Otherwise the resulting value is `obj2`.

You can assume `obj1` and `obj2` are the output of `JSON.parse()`.

**Constraints:**

- `obj1` and `obj2` are valid JSON values
- `1 <= JSON.stringify(obj1).length <= 5 * 10^5`
- `1 <= JSON.stringify(obj2).length <= 5 * 10^5`

---

## Examples

```
Example 1:
  Input: obj1 = {"a": 1, "c": 3}, obj2 = {"a": 2, "b": 2}
  Output: {"a": 2, "c": 3, "b": 2}
  Explanation: The value of obj1["a"] changed to 2 because if both objects have the same key and their
  value is not an array or object then we change the obj1 value to the obj2 value. Key "b" with value
  was added to obj1 as it doesn't exist in obj1.
```

```
Example 2:
  Input: obj1 = [{}, 2, 3], obj2 = [[], 5]
  Output: [[], 5, 3]
  Explanation: result[0] = obj2[0] because obj1[0] and obj2[0] have different types.
  result[2] = obj1[2] because obj2[2] does not exist.
```

```
Example 3:
  Input:
  obj1 = {"a": 1, "b": {"c": [1 , [2, 7], 5], "d": 2}},
  obj2 = {"a": 1, "b": {"c": [6, [6], [9]], "e": 3}}
  Output: {"a": 1, "b": {"c": [6, [6, 7], [9]], "d": 2, "e": 3}}
  Explanation:
  Arrays obj1["b"]["c"] and obj2["b"]["c"] have been merged in way that obj2 values overwrite obj1 values
  deeply only if they are not arrays or objects.
  obj2["b"]["c"] has key "e" that obj1 doesn't have so it's added to obj1.
```

```
Example 4:
  Input: obj1 = true, obj2 = null
  Output: null
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