# 2057. Smallest Index With Equal Value

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-index-with-equal-value](https://leetcode.com/problems/smallest-index-with-equal-value)
**Companies:** Google

---

## Problem Description
Given a **0-indexed** integer array `nums`, return *the **smallest** index `i` of `nums` such that `i mod 10 == nums[i]`, or `-1` if such index does not exist*.

`x mod y` denotes the **remainder** when `x` is divided by `y`.

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 9`

## Examples
```
Example 1:
  Input: nums = [0,1,2]
  Output: 0
  Explanation:
    i=0: 0 mod 10 = 0 == nums[0].
    i=1: 1 mod 10 = 1 == nums[1].
    i=2: 2 mod 10 = 2 == nums[2].
    All indices have i mod 10 == nums[i], so we return the smallest index 0.
```

```
Example 2:
  Input: nums = [4,3,2,1]
  Output: 2
  Explanation:
    i=0: 0 mod 10 = 0 != nums[0].
    i=1: 1 mod 10 = 1 != nums[1].
    i=2: 2 mod 10 = 2 == nums[2].
    i=3: 3 mod 10 = 3 != nums[3].
    2 is the only index which has i mod 10 == nums[i].
```

```
Example 3:
  Input: nums = [1,2,3,4,5,6,7,8,9,0]
  Output: -1
  Explanation: No index satisfies i mod 10 == nums[i].
```

## Approach
**Algorithm:** Linear scan.

1. Iterate `i` from `0` to `len(nums)-1`.
2. If `nums[i] == i`, return `i`.
3. Since a solution is guaranteed, the loop will always return.

**Pseudocode:**
```text
FUNCTION smallestEqualIndex(nums):
    FOR i ← 0 TO LENGTH(nums)-1:
        IF nums[i] = i:
            RETURN i
    RETURN -1  // should never happen per guarantee
```

## Walkthrough
For `nums = [0,2,5,8]`:
- `i=0`: `nums[0]=0` matches → return `0`.

## Complexity Analysis
- **Time:** O(n) – each element examined once.
- **Space:** O(1) – no extra data structures.

## Follow‑Up Questions
1. How would you modify the solution for a sorted array to achieve O(log n) using binary search?
2. What if there could be multiple indices where `nums[i] == i`; how would you return all of them?
3. Can the approach be adapted for a 2‑D matrix where `matrix[i][j] == i + j`?

## Key Takeaway
A simple linear scan suffices to locate the first index where the value equals its position.
