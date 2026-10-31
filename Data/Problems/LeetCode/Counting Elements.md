# 1426. Counting Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/counting-elements](https://leetcode.com/problems/counting-elements)
**Companies:** Drw

---

## Problem Description

Given an integer array `arr`, count how many elements `x` there are, such that `x + 1` is also in `arr`. If there are duplicates in `arr`, count them separately.

**Constraints:**
- `1 <= arr.length <= 1000`
- `0 <= arr[i] <= 1000`

---

## Approach

```
FUNCTION countElements(arr):
    s = set(arr)
    RETURN COUNT(x for x in arr if x + 1 in s)
```

---

## Examples

```
Example 1:
  Input: arr = [1,2,3]
  Output: 2
  Explanation: 1 and 2 are counted cause 2 and 3 are in arr.
```

```
Example 2:
  Input: arr = [1,1,3,3,5,5,7,7]
  Output: 0
  Explanation: No numbers are counted, cause there is no 2, 4, 6, or 8 in arr.
```

---

## Walkthrough

1. Build a set `s` of all elements for O(1) look-ups.
2. Iterate over each element `x` in `arr`.
3. If `x + 1` is in `s`, increment the count.
4. Return the final count.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = length of `arr` |
| **Space** | O(n) for the hash set |

---

## Key Takeaway

> Put all elements in a set, then iterate and check if `x + 1` exists. O(1) lookup per element.
