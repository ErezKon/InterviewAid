# 493. Reverse Pairs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/reverse-pairs](https://leetcode.com/problems/reverse-pairs)
**Companies:** Amazon, Apple, Bloomberg, Deloitte, Ebay, Google, Intuit, Meta, Microsoft

---

## Problem Description

Given an integer array `nums`, return the number of **reverse pairs** — pairs `(i, j)` where `i < j` and `nums[i] > 2 * nums[j]`.

**Constraints:**
- `1 <= nums.length <= 5 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

---

## Examples

- **Input:** `nums = [1,3,2,3,1]` → **Output:** `2` (pairs: (1,4) and (3,4))
- **Input:** `nums = [2,4,3,5,1]` → **Output:** `3`

---

## Key Insight

> Modified **merge sort** — during the merge step, both halves are sorted, so counting pairs where `left[i] > 2 * right[j]` uses a two-pointer technique in O(n) per level. Total: O(n log n).

---

## Approach: Merge Sort — O(n log n) ✅

```
FUNCTION reversePairs(nums):
    count = 0

    FUNCTION mergeSort(arr):
        IF len(arr) <= 1: RETURN arr
        mid = len(arr) / 2
        left = mergeSort(arr[:mid])
        right = mergeSort(arr[mid:])

        // Count pairs
        j = 0
        FOR i ← 0 TO len(left) - 1:
            WHILE j < len(right) AND left[i] > 2 * right[j]:
                j += 1
            count += j

        // Standard merge
        RETURN merge(left, right)

    mergeSort(nums)
    RETURN count
```

Same technique as Count of Smaller Numbers After Self (#315). Count during merge step.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n log n) — merge sort with linear counting per level |
| Space  | O(n) — merge buffer |

---

## Key Takeaway

> Any "count pairs with ordering constraint" problem can often be solved by **merge sort + counting during merge** — the sorted halves enable two-pointer counting in O(n) per merge level.
