# 3224. Minimum Array Changes to Make Differences Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-array-changes-to-make-differences-equal](https://leetcode.com/problems/minimum-array-changes-to-make-differences-equal)
**Companies:** Airbus, Google

---

## Problem Description

You are given an integer array `nums` of size `n` where `n` is **even**, and an integer `k`.

You can perform some changes on the array, where in one change you can replace **any** element in the array with **any** integer in the range from `0` to `k`.

You need to perform some changes (possibly none) such that the final array satisfies the following condition:
- There exists an integer `X` such that `abs(a[i] - a[n - i - 1]) = X` for all `(0 <= i < n)`.

Return the **minimum** number of changes required to satisfy the above condition.

**Constraints:**
- `2 ≤ n == nums.length ≤ 10^5`
- `n` is even.
- `0 ≤ nums[i] ≤ k ≤ 10^5`

## Examples

```
Example 1:
  Input: nums = [1,0,1,2,4,3], k = 4
  Output: 2
  Explanation: We can perform the following changes:
  - Replace nums[1] by 2. The resulting array is nums = [1,2,1,2,4,3].
  - Replace nums[3] by 3. The resulting array is nums = [1,2,1,3,4,3].
  The integer X will be 2.
```

```
Example 2:
  Input: nums = [0,1,2,3,3,6,5,4], k = 6
  Output: 2
  Explanation: We can perform the following operations:
  - Replace nums[3] by 0. The resulting array is nums = [0,1,2,0,3,6,5,4].
  - Replace nums[4] by 4. The resulting array is nums = [0,1,2,0,4,6,5,4].
  The integer X will be 4.
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
