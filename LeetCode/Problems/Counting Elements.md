# 1426. Counting Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/counting-elements](https://leetcode.com/problems/counting-elements)
**Companies:** Drw

---

## 1. Problem Description

Given an array `arr`, count elements `x` such that `x + 1` also exists in `arr`.

---

## 2. Approach: HashSet Lookup — O(n) ✅

```
FUNCTION countElements(arr):
    s = set(arr)
    RETURN COUNT(x for x in arr if x + 1 in s)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Put all elements in a set, then iterate and check if `x + 1` exists. O(1) lookup per element.
