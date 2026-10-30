# 2727. Is Object Empty

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/is-object-empty](https://leetcode.com/problems/is-object-empty)
**Companies:** Google

---

## 1. Problem Description

Given an object or an array, return if it is empty.

- An empty object contains no key-value pairs.
- An empty array contains no elements.

You may assume the object or array is the output of `JSON.parse`.

**Constraints:**
- `obj` is a valid JSON object or array
- `2 <= JSON.stringify(obj).length <= 10^5`

---

## 2. Approach — O(1) ✅

```text
FUNCTION isEmpty(obj):
    // Return true if object has no own enumerable keys
    RETURN Object.keys(obj).length == 0
```

---

## 3. Examples

**Example 1:**
```
Input: obj = {"x": 5, "y": 42}
Output: false
Explanation: The object has 2 key-value pairs so it is not empty.
```

**Example 2:**
```
Input: obj = {}
Output: true
Explanation: The object doesn't have any key-value pairs so it is empty.
```

**Example 3:**
```
Input: obj = [null, false, 0]
Output: false
Explanation: The array has 3 elements so it is not empty.
```

---

## 4. Walkthrough

Consider the input `{}`:
1. `Object.keys({})` returns an empty list `[]`.
2. Its length is `0`, so the function returns `true`.

For input `{"a":1}`:
1. `Object.keys({"a":1})` returns `['a']`.
2. Length is `1`, not `0`; function returns `false`.

The same logic applies to arrays using `Object.keys` (which yields indices) or by checking `Array.isArray` and `length`.

---

## 5. Complexity Analysis

- **Time:** O(1) – retrieving keys and checking length are constant‑time operations.
- **Space:** O(1) – no additional data structures proportional to input size are created.

---

## 6. Follow‑Up Questions

- How would you modify the solution to differentiate between empty objects and empty arrays?
- Can you implement the check without using `Object.keys`?
- How would you handle nested structures where you need to verify deep emptiness?

---

## Key Takeaway

> A JavaScript fundamentals problem. `Object.keys()` works for both objects and arrays. For arrays, `Array.isArray(obj) && obj.length === 0` is also valid.
