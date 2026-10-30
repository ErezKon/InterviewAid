# 704. Binary Search

**Difficulty:** 🟢 Easy
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/binary-search](https://leetcode.com/problems/binary-search)
**Companies:** Amazon, Bloomberg, Cognizant, Google, Infosys, Meta, Microsoft, Oracle, Pure Storage, Tcs, Yandex, Zoho

---

## 1. Problem Description

Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁴`
- `-10⁴ < nums[i], target < 10⁴`
- All the integers in `nums` are **unique**.
- `nums` is sorted in ascending order.

---

## 2. Approach: Standard Binary Search ✅

```text
FUNCTION search(nums, target):
    lo ← 0
    hi ← len(nums) - 1
    WHILE lo ≤ hi:
        mid ← lo + (hi - lo) / 2
        IF nums[mid] = target:
            RETURN mid
        ELSE IF nums[mid] < target:
            lo ← mid + 1
        ELSE:
            hi ← mid - 1
    RETURN -1
```

---

## 3. Examples

```
Example 1:
  Input: nums = [-1,0,3,5,9,12], target = 9
  Output: 4
  Explanation: 9 exists in nums and its index is 4

Example 2:
  Input: nums = [-1,0,3,5,9,12], target = 2
  Output: -1
  Explanation: 2 does not exist in nums so return -1
```

---

## 4. Walkthrough

| Step | lo | hi | mid | nums[mid] | Action |
|------|----|----|-----|----------|--------|
| 1 | 0 | 5 | 2 | 3 | 3 > 2 → hi = 1 |
| 2 | 0 | 1 | 0 | -1 | -1 < 2 → lo = 1 |
| 3 | 1 | 1 | 1 | 0 | 0 < 2 → lo = 2 |
| 4 | 2 | 1 | - | - | lo > hi → return -1 |

The table shows how the pointers converge and the algorithm terminates.

---

## 5. Complexity Analysis

- **Time:** O(log n) – each iteration halves the search interval.
- **Space:** O(1) – only a few integer variables are used.

---

## 6. Binary Search Variants

| Variant | Condition | Return |
|---------|-----------|--------|
| Find exact | `nums[mid] == target` | mid |
| Lower bound (leftmost) | `nums[mid] >= target → hi = mid` | lo |
| Upper bound (rightmost) | `nums[mid] <= target → lo = mid + 1` | lo - 1 |
| Find insert position | `nums[mid] < target → lo = mid + 1` | lo |

---

## Key Takeaway

> Binary search has subtle off-by-one pitfalls. The three key decisions: `lo <= hi` vs `lo < hi`, `hi = mid` vs `hi = mid - 1`, and what to return. Practice the variants.
