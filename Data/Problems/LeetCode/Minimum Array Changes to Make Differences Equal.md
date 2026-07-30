# 3224. Minimum Array Changes to Make Differences Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-array-changes-to-make-differences-equal](https://leetcode.com/problems/minimum-array-changes-to-make-differences-equal)
**Companies:** Airbus, Google

---

## Problem Description

Given an integer array `nums` of length `n` and an integer `k` (the maximum possible value in the array), you can change any element to any value between `0` and `k` inclusive. For each mirrored pair `(nums[i], nums[n‑1‑i])` you consider the absolute difference. The goal is to make all these differences equal using the minimum number of element changes.

Constraints:
- `2 ≤ n ≤ 10^5`
- `0 ≤ nums[i] ≤ k ≤ 10^5`
- `n` is even (pairs are well‑defined).

## Examples

**Example 1**
```
Input: nums = [1,2,3,4], k = 5
Output: 1
Explanation: Change nums[0] to 4, then pairs become (4,4) and (2,3) with differences 0 and 1. Choose target difference 0, total changes = 1.
```

**Example 2**
```
Input: nums = [0,0,0,0], k = 0
Output: 0
Explanation: All differences are already 0; no changes needed.
```

## Approach

**Algorithm:** Difference Array (range update + prefix sweep)

The key insight is that for each pair we can determine for which target differences `d` the pair requires 0, 1, or 2 changes. By marking these ranges in a difference array we can later compute the total changes for every possible `d` in `O(k)` time.

```text
FUNCTION minChanges(nums, k):
    n ← LEN(nums)
    diff ← ARRAY(k + 2, 0)   // difference array for cost of each d
    FOR i ← 0 TO n/2 - 1 DO
        a ← nums[i]
        b ← nums[n-1-i]
        curDiff ← ABS(a - b)
        // Maximum difference achievable with a single change
        maxReach ← MAX(MAX(a, b), k - MIN(a, b))
        // 0 changes needed when target d == curDiff
        diff[curDiff] ← diff[curDiff] - 2
        diff[curDiff+1] ← diff[curDiff+1] + 2
        // 1 change needed for d in [0, maxReach] except curDiff
        diff[0] ← diff[0] + 1
        diff[maxReach+1] ← diff[maxReach+1] - 1
        // 2 changes needed for d > maxReach (already accounted by default)
    END FOR
    // Convert difference array to actual cost per d
    result ← INFINITY
    running ← 0
    FOR d ← 0 TO k DO
        running ← running + diff[d]
        result ← MIN(result, running)
    END FOR
    RETURN result
```

## Walkthrough

| Step | Pair `(a,b)` | `curDiff` | `maxReach` | Cost contribution to `diff` array |
|------|--------------|----------|-----------|------------------------------------|
| 1    | (1,4)        | 3        | 4         | `diff[0] +1`, `diff[3] -2`, `diff[4]+1`, `diff[5] -1` |
| 2    | (2,3)        | 1        | 3         | similar updates |

After processing all pairs we compute the prefix sums of `diff`. The minimum prefix value corresponds to the optimal target difference `d` and yields the minimal total changes.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(n + k)** – one pass over pairs and a sweep over `k` possible differences |
| Space  | **O(k)** – the difference array |

## Follow-Up Questions

1. How would the solution change if `n` could be odd, leaving a middle element without a pair?
2. Can the algorithm be adapted to minimize the sum of absolute differences instead of the number of changes?
3. What if each change has a different cost associated with the new value?

## Key Takeaway

Using a difference array to encode range‑based change costs lets us evaluate every possible target difference in linear time, turning a seemingly quadratic search into an efficient `O(n + k)` solution.
