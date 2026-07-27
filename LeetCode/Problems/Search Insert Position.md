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

```
FUNCTION searchInsert(nums, target):
    lo, hi = 0, len(nums)

    WHILE lo < hi:
        mid = (lo + hi) / 2
        IF nums[mid] < target:
            lo = mid + 1
        ELSE:
            hi = mid

    RETURN lo
```

This is the classic `lower_bound` / `bisect_left` implementation.

| Time | Space |
|------|-------|
| O(log n) | O(1) |

---

## Key Takeaway

> `lower_bound`: find the leftmost position where we can insert `target` to maintain sorted order. Returns the index of the first element ≥ target.
