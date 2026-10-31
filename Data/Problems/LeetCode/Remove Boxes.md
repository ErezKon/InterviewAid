# 546. Remove Boxes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/remove-boxes](https://leetcode.com/problems/remove-boxes)
**Companies:** Amazon, Capital One, Google, Meta, Microsoft, Phonepe, Sprinklr, Tencent, Teradata, Zeta

---

## Problem Description
You are given several `boxes` with different colors represented by different positive numbers.

You may experience several rounds to remove boxes until there is no box left. Each time you can choose some continuous boxes with the same color (i.e., composed of `k` boxes, `k >= 1`), remove them and get `k * k` points.

Return *the maximum points you can get*.

**Constraints:**

- `1 <= boxes.length <= 100`
- `1 <= boxes[i] <= 100`

## Examples

```
Example 1:
  Input: boxes = [1,3,2,2,2,3,4,3,1]
  Output: 23
  Explanation:
    [1, 3, 2, 2, 2, 3, 4, 3, 1]
    ----> [1, 3, 3, 4, 3, 1] (3*3=9 points)
    ----> [1, 3, 3, 3, 1] (1*1=1 points)
    ----> [1, 1] (3*3=9 points)
    ----> [] (2*2=4 points)
```

```
Example 2:
  Input: boxes = [1,1,1]
  Output: 9
```

```
Example 3:
  Input: boxes = [1]
  Output: 1
```

## Approach
Use 3-dimensional dynamic programming where `dp(l, r, k)` denotes the maximum points for subarray `boxes[l..r]` with `k` extra boxes of the same color as `boxes[l]` appended to its left. The recurrence either removes the left group now or merges it with a later same-color box after clearing the middle part.

```text
FUNCTION removeBoxes(boxes):
    n ← LENGTH(boxes)
    memo ← 3D array of size n×n×n initialized to 0

    FUNCTION dp(l, r, k):
        IF l > r: RETURN 0
        IF memo[l][r][k] ≠ 0: RETURN memo[l][r][k]
        // Collapse consecutive same-color boxes at the left
        WHILE l + 1 ≤ r AND boxes[l+1] = boxes[l]:
            l ← l + 1; k ← k + 1
        // Option 1: remove the left group now
        result ← (k + 1)² + dp(l + 1, r, 0)
        // Option 2: try to merge with a later same-color box
        FOR m ← l + 1 TO r:
            IF boxes[m] = boxes[l]:
                result ← MAX(result, dp(l + 1, m - 1, 0) + dp(m, r, k + 1))
        memo[l][r][k] ← result
        RETURN result

    RETURN dp(0, n - 1, 0)
```

## Walkthrough
Example 1: `boxes = [1,3,2,2,2,3,4,3,1]` (indices 0..8). Following the optimal branch at each state:

| Step | State | Options compared | Best |
|------|-------|------------------|------|
| 1 | dp(0,8,0), left color 1 | remove 1 now: 1 + dp(1,8,0) = 1 + 20 = 21; merge with m=8: dp(1,7,0) + dp(8,8,1) = 19 + 4 = 23 | 23 |
| 2 | dp(1,7,0) = [3,2,2,2,3,4,3] | merge 3 with m=5: dp(2,4,0) + dp(5,7,1) = 9 + 10 = 19; merge with m=7: dp(2,6,0) + dp(7,7,1) = 11 + 4 = 15 | 19 |
| 3 | dp(2,4,0) = [2,2,2] | collapse to k=2, remove: (2+1)² = 9 | 9 |
| 4 | dp(5,7,1) = [3,4,3] with one extra 3 | remove now: 2² + dp(6,7,0) = 4 + 2 = 6; merge with m=7: dp(6,6,0) + dp(7,7,2) = 1 + 9 = 10 | 10 |
| 5 | dp(8,8,1) = [1] with one extra 1 | (1+1)² = 4 | 4 |

Result: `dp(0,8,0) = 23`, matching the expected output. This corresponds to removing 2,2,2 (9), then 4 (1), then 3,3,3 (9), then 1,1 (4).

## Complexity Analysis
Time: `O(n⁴)` in the worst case due to three dimensions and an inner loop over `m`.
Space: `O(n³)` for the memoization table.

## Follow-Up Questions
1. Can the DP be optimized to `O(n³)` using monotonicity or pruning?
2. How would the solution change if removal gave `k` points instead of `k*k`?
3. What if the colors are limited to a small alphabet—can we use a more compact state representation?

## Key Takeaway
Modeling the problem with `dp(l, r, k)` captures the benefit of delaying removal to merge same-color groups, enabling the optimal scoring strategy.
