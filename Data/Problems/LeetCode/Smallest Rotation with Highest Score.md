# 798. Smallest Rotation with Highest Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-rotation-with-highest-score](https://leetcode.com/problems/smallest-rotation-with-highest-score)

---

## Problem Description

Given an array `nums`, rotating it by index `k` means moving each element at index `i` to index `(i - k + n) % n`. An element scores a point if its value ≤ its new index. Return the rotation index `k` that yields the highest score.

### Examples

- **Input:** `nums = [2,3,1,4,0]` → **Output:** `3` (rotation by 3 gives `[4,0,2,3,1]`, score = 3)
- **Input:** `nums = [1,3,0,2,4]` → **Output:** `0`

## Approach: Difference Array — O(n) ✅

**Key Insight:** For each element, compute the range of rotations where it scores a point, then use a difference array to find the rotation with the most scoring elements.

```
FUNCTION bestRotation(nums):
    n = len(nums)
    change = [0] * n

    FOR i ← 0 TO n - 1:
        // Rotation k where nums[i] starts losing its point
        change[(i - nums[i] + 1 + n) % n] -= 1

    // Accumulate and find max
    FOR i ← 1 TO n - 1:
        change[i] += change[i - 1] + 1

    RETURN argmax(change)
```

### Walkthrough (nums = [2,3,1,4,0])

| i | nums[i] | Losing rotation k | change update |
|---|---------|-------------------|---------------|
| 0 | 2 | (0-2+1+5)%5 = 4 | change[4] -= 1 |
| 1 | 3 | (1-3+1+5)%5 = 4 | change[4] -= 1 |
| 2 | 1 | (2-1+1+5)%5 = 2 | change[2] -= 1 |
| 3 | 4 | (3-4+1+5)%5 = 0 | change[0] -= 1 |
| 4 | 0 | (4-0+1+5)%5 = 0 | change[0] -= 1 |

After prefix sum accumulation, k=3 has the highest score.

### Complexity

| | |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |
