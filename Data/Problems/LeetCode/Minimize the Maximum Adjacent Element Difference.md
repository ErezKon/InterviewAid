# 3357. Minimize the Maximum Adjacent Element Difference

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimize-the-maximum-adjacent-element-difference](https://leetcode.com/problems/minimize-the-maximum-adjacent-element-difference)
**Companies:** Amazon

---

## Problem Description

You are given an array of integers `nums`. Some values in `nums` are **missing** and are denoted by `-1`.

You must choose a pair of **positive** integers `(x, y)` **exactly once** and replace each **missing** element with *either* `x` or `y`.

You need to **minimize** the **maximum** **absolute difference** between *adjacent* elements of `nums` after replacements.

Return the **minimum** possible difference.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `nums[i]` is either `-1` or in the range `[1, 10^9]`.

---

## Examples

```
Example 1:
  Input: nums = [1,2,-1,10,8]
  Output: 4
  Explanation: By choosing the pair as (6, 7), nums can be changed to [1, 2, 6, 10, 8].
  The absolute differences between adjacent elements are:
  - |1 - 2| == 1
  - |2 - 6| == 4
  - |6 - 10| == 4
  - |10 - 8| == 2
```

```
Example 2:
  Input: nums = [-1,-1,-1]
  Output: 0
  Explanation: By choosing the pair as (4, 4), nums can be changed to [4, 4, 4].
```

```
Example 3:
  Input: nums = [-1,10,-1,8]
  Output: 1
  Explanation: By choosing the pair as (11, 9), nums can be changed to [11, 10, 9, 8].
```

---

## Approach

The answer can be found via binary search on the maximum allowed difference `d`. For a candidate `d`, each `-1` must be assigned a value that lies within the intersection of ranges imposed by its known neighbors: `[neighbor - d, neighbor + d]`. If all intersections are non-empty, `d` is feasible.

```text
FUNCTION minimizeMaxDiff(nums):
    lo ← 0
    hi ← MAX(nums)   // upper bound for difference
    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        IF canAchieve(nums, mid) THEN
            hi ← mid
        ELSE
            lo ← mid + 1
    RETURN lo

FUNCTION canAchieve(nums, maxDiff):
    // Track feasible interval [low, high] for current -1 segment
    low ← -∞, high ← ∞
    FOR i FROM 0 TO LEN(nums)-1 DO
        IF nums[i] ≠ -1 THEN
            // Constrain previous -1 segment by this known value
            IF previous element was -1 THEN
                low ← MAX(low, nums[i] - maxDiff)
                high ← MIN(high, nums[i] + maxDiff)
                IF low > high THEN RETURN FALSE
            // Also check difference with previous known element
            IF i > 0 AND nums[i-1] ≠ -1 THEN
                IF ABS(nums[i] - nums[i-1]) > maxDiff THEN RETURN FALSE
    RETURN TRUE
```

---

## Walkthrough

For `nums = [1, -1, 3]` and `d = 1`:

1. Known left neighbor `1` gives interval `[1-1, 1+1] = [0,2]` for the `-1`.
2. Known right neighbor `3` gives interval `[3-1, 3+1] = [2,4]`.
3. Intersection is `[2,2]`, so we can set the `-1` to `2`.
4. All adjacent differences become `1`, which is ≤ `d`. Hence `d=1` is feasible and is the minimal answer.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary search + validation | **O(n log M)** | **O(1)** |

`M` is the range of possible values (bounded by input constraints).

---

## Follow-Up Questions

- How would the solution change if `-1` positions must be assigned integers within a given range?
- Can you extend the algorithm to also output the actual filled array?
- What if the cost function is the sum of absolute differences instead of the maximum?

---

## Key Takeaway

> **Binary search on max difference** — for each candidate, greedily verify that all `-1` gaps can be filled within the allowed difference. Constraint propagation from known neighbors bounds the valid range.

---