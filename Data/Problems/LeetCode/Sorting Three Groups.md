# 2826. Sorting Three Groups

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sorting-three-groups](https://leetcode.com/problems/sorting-three-groups)
**Companies:** Uipath

---

## Problem Description

You are given an integer array `nums`. Each element in `nums` is 1, 2 or 3. In each operation, you can remove an element from `nums`. Return the **minimum** number of operations to make `nums` **non-decreasing**.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 3`

**Follow-up:** Can you come up with an algorithm that runs in `O(n)` time complexity?

### Examples

```
Example 1:
  Input: nums = [2,1,3,2,1]
  Output: 3
  Explanation: One of the optimal solutions is to remove nums[0], nums[2] and nums[3].
```

```
Example 2:
  Input: nums = [1,3,2,1,3,3]
  Output: 2
  Explanation: One of the optimal solutions is to remove nums[1] and nums[2].
```

```
Example 3:
  Input: nums = [2,2,2,2,3,3]
  Output: 0
  Explanation: nums is already non-decreasing.
```

## Approach: LIS (Longest Non-Decreasing Subsequence) — O(n log n) ✅

**Key Insight:** The minimum changes = n − length of longest non-decreasing subsequence. Since values are only 1,2,3, we can use patience sorting.

```
FUNCTION minimumOperations(nums):
    // Find longest non-decreasing subsequence
    tails = []
    FOR num IN nums:
        // Binary search for first tail > num (upper bound)
        pos = upper_bound(tails, num)
        IF pos == len(tails):
            tails.APPEND(num)
        ELSE:
            tails[pos] = num
    RETURN len(nums) - len(tails)
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(n) |
