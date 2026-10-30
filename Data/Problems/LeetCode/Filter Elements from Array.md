# 2634. Filter Elements from Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/filter-elements-from-array](https://leetcode.com/problems/filter-elements-from-array)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description

Given an integer array `arr` and a filtering function `fn`, return a filtered array `filteredArr`.

The `fn` function takes one or two arguments:

- `arr[i]` - number from the `arr`
- `i` - index of `arr[i]`

`filteredArr` should only contain the elements from the `arr` for which the expression `fn(arr[i], i)` evaluates to a **truthy** value. A **truthy** value is a value where `Boolean(value)` returns `true`.

Please solve it without the built-in `Array.filter` method.

**Constraints:**

- `0 <= arr.length <= 1000`
- `-10^9 <= arr[i] <= 10^9`

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

```
Example 1:
  Input: arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }
  Output: [20,30]
  Explanation:
  const newArray = filter(arr, fn); // [20, 30]
  The function filters out values that are not greater than 10
```

```
Example 2:
  Input: arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; }
  Output: [1]
  Explanation:
  fn can also accept the index of each element
  In this case, the function removes elements not at index 0
```

```
Example 3:
  Input: arr = [-2,-1,0,1,2], fn = function plusOne(n) { return n + 1 }
  Output: [-2,0,1,2]
  Explanation:
  Falsey values such as 0 should be filtered out
```

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