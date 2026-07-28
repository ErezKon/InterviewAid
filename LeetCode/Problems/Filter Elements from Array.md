# 2634. Filter Elements from Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/filter-elements-from-array](https://leetcode.com/problems/filter-elements-from-array)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

Implement a function that filters an array based on a callback `fn(element, index)`. Return a new array with only elements where `fn` returns truthy. Do **not** use `Array.filter`.

---

## Approach: Manual Filter ✅

```text
FUNCTION filter(arr, fn):
    SET result ← []
    FOR i ← 0 TO LENGTH(arr) - 1:
        IF fn(arr[i], i):
            APPEND arr[i] TO result
    RETURN result
```

---

## Examples

| Input Array | Callback (value % 2 == 0) | Output |
|-------------|--------------------------|--------|
| `[1,2,3,4,5]` | keep even numbers | `[2,4]` |
| `[]` | any predicate | `[]` |

## Walkthrough

Take the first example `[1,2,3,4,5]` with predicate `value % 2 == 0`:
1. Initialize `result = []`.
2. i=0, value=1 → predicate false → skip.
3. i=1, value=2 → true → `result = [2]`.
4. i=2, value=3 → false.
5. i=3, value=4 → true → `result = [2,4]`.
6. i=4, value=5 → false.
7. Return `[2,4]`.

## Complexity Analysis

- **Time:** O(n) – each element inspected once.
- **Space:** O(n) – result array stores up to n elements.

## Follow-Up Questions

- How would you implement the filter in‑place without extra space?
- How to handle asynchronous predicates?

## Key Takeaway

> **Basic functional programming: iterate and collect elements where the predicate returns truthy. Foundation for understanding higher‑order functions.**