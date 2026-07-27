# 704. Binary Search

**Difficulty:** 🟢 Easy
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/binary-search](https://leetcode.com/problems/binary-search)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Infosys, Meta, Microsoft, Oracle, Pure Storage, Tcs, Yandex, Zoho

---

## 1. Problem Description

Given a sorted array `nums` and a `target`, return the index if found, otherwise -1. Must be O(log n).

---

## 2. Approach: Standard Binary Search ✅

```
FUNCTION search(nums, target):
    lo, hi = 0, len(nums) - 1

    WHILE lo <= hi:
        mid = lo + (hi - lo) / 2

        IF nums[mid] == target:
            RETURN mid
        ELSE IF nums[mid] < target:
            lo = mid + 1
        ELSE:
            hi = mid - 1

    RETURN -1
```

| Time | Space |
|------|-------|
| O(log n) | O(1) |

---

## 3. Binary Search Variants

| Variant | Condition | Return |
|---------|-----------|--------|
| Find exact | `nums[mid] == target` | mid |
| Lower bound (leftmost) | `nums[mid] >= target → hi = mid` | lo |
| Upper bound (rightmost) | `nums[mid] <= target → lo = mid + 1` | lo - 1 |
| Find insert position | `nums[mid] < target → lo = mid + 1` | lo |

---

## Key Takeaway

> Binary search has subtle off-by-one pitfalls. The three key decisions: `lo <= hi` vs `lo < hi`, `hi = mid` vs `hi = mid - 1`, and what to return. Practice the variants.
