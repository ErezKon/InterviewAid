# 1426. Counting Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/counting-elements](https://leetcode.com/problems/counting-elements)
**Companies:** Drw

---

## Problem Description

Given an array `arr`, count elements `x` such that `x + 1` also exists in `arr`.

---

## Approach

```
FUNCTION countElements(arr):
    s = set(arr)
    RETURN COUNT(x for x in arr if x + 1 in s)
```

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `arr = [1,2,3]` | `2` | Elements `1` and `2` have `+1` present (`2` and `3`). |
| `arr = [1,1,3,3,5,5,7,7]` | `0` | No element's successor exists. |
| `arr = [1,3,2,3,5,0]` | `3` | Elements `0`, `1`, `2` each have `+1` present.

---

## Walkthrough

1. Build a set `s` of all elements for O(1) look‑ups.
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
