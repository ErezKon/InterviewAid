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
2. If `i % 10 == nums[i]`, return `i` (first hit is the smallest index).
3. If the loop finishes without a match, return `-1`.

**Pseudocode:**
```text
FUNCTION smallestEqual(nums):
    FOR i <- 0 TO LENGTH(nums)-1:
        IF i MOD 10 = nums[i]:
            RETURN i
    RETURN -1
```

## Walkthrough
For `nums = [4,3,2,1]` (Example 2):
- `i=0`: `0 mod 10 = 0`, `nums[0]=4` -> no match.
- `i=1`: `1 mod 10 = 1`, `nums[1]=3` -> no match.
- `i=2`: `2 mod 10 = 2`, `nums[2]=2` -> match, return `2`.

For `nums = [1,2,3,4,5,6,7,8,9,0]` (Example 3): every `i mod 10` differs from `nums[i]` (e.g. `i=9`: `9 != 0`), so the loop ends and we return `-1`.

## Complexity Analysis
- **Time:** O(n) - each element examined once.
- **Space:** O(1) - no extra data structures.

## Follow-Up Questions
1. How would you return all indices satisfying `i mod 10 == nums[i]` instead of just the smallest?
2. For the related problem `nums[i] == i` on a sorted array of distinct integers, how can binary search achieve O(log n)?
3. How would you answer many queries "smallest valid index in range [l, r]" efficiently?

## Key Takeaway
A simple linear scan suffices: the first index satisfying `i mod 10 == nums[i]` is the answer, otherwise `-1`.
