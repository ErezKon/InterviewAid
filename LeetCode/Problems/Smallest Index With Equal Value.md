# 2057. Smallest Index With Equal Value

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-index-with-equal-value](https://leetcode.com/problems/smallest-index-with-equal-value)
**Companies:** Google

---

## Problem Description
Given a non‑negative integer array `nums`, find the smallest index `i` such that `nums[i] == i`. It is guaranteed that at least one such index exists. Return the index `i`.

## Examples
| nums | Output | Explanation |
|------|--------|-------------|
| `[0,2,5,8]` | `0` | `nums[0] = 0`.
| `[1,1,2,3]` | `1` | `nums[1] = 1` is the first match.
| `[5,6,7,8]` | `-1` | No index matches (but problem guarantees existence, so this case would not appear).

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
