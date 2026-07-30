# 1387. Sort Integers by The Power Value

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-integers-by-the-power-value](https://leetcode.com/problems/sort-integers-by-the-power-value)
**Companies:** Bloomberg, Google

---

## Problem Description

The power of an integer is the number of Collatz steps to reach 1 (if even, divide by 2; if odd, 3x+1). Given range `[lo, hi]` and integer `k`, return the k-th smallest number sorted by power value (break ties by value).

### Examples

- **Input:** `lo = 12, hi = 15, k = 2` → **Output:** `13` (powers: 12→9, 13→9, 14→17, 15→17; sorted by power then value)

## Approach: Memoized Collatz + Sort — O(n log n) ✅

```
FUNCTION getKth(lo, hi, k):
    memo = {}
    FUNCTION power(x):
        IF x == 1: RETURN 0
        IF x IN memo: RETURN memo[x]
        IF x % 2 == 0: memo[x] = 1 + power(x / 2)
        ELSE: memo[x] = 1 + power(3 * x + 1)
        RETURN memo[x]

    nums = [i for i in range(lo, hi + 1)]
    SORT(nums, key=lambda x: (power(x), x))
    RETURN nums[k - 1]
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n + n · P) — P = avg power steps |
| **Space** | O(n + memo size) |
