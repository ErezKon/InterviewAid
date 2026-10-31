# 2966. Divide Array Into Arrays With Max Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/divide-array-into-arrays-with-max-difference](https://leetcode.com/problems/divide-array-into-arrays-with-max-difference)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Salesforce

---

## Problem Description

You are given an integer array `nums` of size `n` where `n` is a multiple of 3 and a positive integer `k`.

Divide the array `nums` into `n / 3` arrays of size **3** satisfying the following condition:

- The difference between **any** two elements in one array is **less than or equal** to `k`.

Return a **2D** array containing the arrays. If it is impossible to satisfy the conditions, return an empty array. And if there are multiple answers, return **any** of them.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 10^5`
- `n` is a multiple of 3
- `1 <= nums[i] <= 10^5`
- `1 <= k <= 10^5`

---

## Approach: Sort + Group ✅

```text
FUNCTION divideArray(nums, k):
    // Sort the numbers to minimize spread within each group
    SORT nums
    SET result ← []
    FOR i ← 0 TO len(nums) - 1 STEP 3:
        // Check the spread of the current triple
        IF nums[i+2] - nums[i] > k:
            RETURN []
        APPEND [nums[i], nums[i+1], nums[i+2]] TO result
    RETURN result
```

---

## Examples

```
Example 1:
  Input: nums = [1,3,4,8,7,9,3,5,1], k = 2
  Output: [[1,1,3],[3,4,5],[7,8,9]]
  Explanation: The difference between any two elements in each array is less than or equal to 2.
```

```
Example 2:
  Input: nums = [2,4,2,2,5,2], k = 2
  Output: []
  Explanation:
  Different ways to divide nums into 2 arrays of size 3 are:
  - [[2,2,2],[2,4,5]] (and its permutations)
  - [[2,2,4],[2,2,5]] (and its permutations)
  Because there are four 2s there will be an array with the elements 2 and 5 no matter how we divide it. since 5 - 2 = 3 > k, the answer is [].
```

```
Example 3:
  Input: nums = [4,2,9,8,2,12,7,12,10,5,8,5,5,7,9,2,5,11], k = 14
  Output: [[2,2,2],[4,5,5],[5,5,7],[7,8,8],[9,9,10],[11,12,12]]
  Explanation: The difference between any two elements in each array is less than or equal to 14.
```

---

## Walkthrough

**Example 1:** `nums = [1,3,5,6,8,10]`, `k = 4`

| Step | Action | Sorted nums | Triple | Max-Min | Valid? |
|------|--------|-------------|--------|--------|-------|
| 1 | Sort | `[1,3,5,6,8,10]` | — | — | — |
| 2 | Form first triple (indices 0-2) | — | `[1,3,5]` | `5-1 = 4` | ✅ |
| 3 | Form second triple (indices 3-5) | — | `[6,8,10]` | `10-6 = 4` | ✅ |

All triples satisfy the constraint, so the result is `[[1,3,5],[6,8,10]]`.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n log n) | Sorting dominates |
| **Space** | O(n) | Result storage |

---

## Follow-Up Questions

1. How would you modify the algorithm if groups could be of size `m` (not just 3)?
2. Can you solve it in O(1) extra space if the input array can be reordered in-place?
3. What if the constraint was on the sum of each group instead of max-min difference?

---

## Key Takeaway

> **Minimizing within-group spread = sort first, then group adjacent elements. If any group violates the constraint, no valid partition exists.**