# 35. Search Insert Position

**Difficulty:** 🟢 Easy
**Acceptance:** 46.0%
**LeetCode:** [https://leetcode.com/problems/search-insert-position](https://leetcode.com/problems/search-insert-position)
**Companies:** Accenture, Amazon, Bloomberg, Cognizant, Google, Grammarly, Ibm, Meta, Microsoft, Tcs, Yandex, Zoho

---

## 1. Problem Description

Given a sorted array and a target, return the index if found. If not, return the index where it would be inserted.

---

## 2. Approach: Binary Search (Lower Bound) — O(log n) ✅

```text
FUNCTION searchInsert(nums, target):
    // lower bound binary search
    SET lo ← 0
    SET hi ← LENGTH(nums)
    WHILE lo < hi:
        SET mid ← (lo + hi) / 2
        IF nums[mid] < target:
            SET lo ← mid + 1
        ELSE:
            SET hi ← mid
    RETURN lo
```

---

## Examples

| nums | target | output |
|------|--------|--------|
| [1,3,5,6] | 5 | 2 |
| [1,3,5,6] | 2 | 1 |
| [1,3,5,6] | 7 | 4 |

---

## Walkthrough

Consider `nums = [1,3,5,6]`, `target = 5`.
1. `lo=0, hi=4` → `mid=2`, `nums[2]=5` → not `< target`, set `hi=2`.
2. `lo=0, hi=2` → `mid=1`, `nums[1]=3` → `< target`, set `lo=2`.
3. Loop ends (`lo==hi==2`), return `2` which is the index of `5`.

---

## Complexity Analysis

- **Time:** O(log n) – binary search halves the range each iteration.
- **Space:** O(1) – only a few scalar variables.

---

## Key Takeaway

> `lower_bound`: find the leftmost position where we can insert `target` to maintain sorted order. Returns the index of the first element ≥ target.
