# 3824. Minimum K to Reduce Array Within Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-k-to-reduce-array-within-limit](https://leetcode.com/problems/minimum-k-to-reduce-array-within-limit)
**Companies:** Google

---

## Problem Description

Find the minimum `k` such that repeatedly dividing each element by `k` (or reducing by `k`) brings the entire array within a given limit.

## Examples

| nums | limit | Output |
|------|-------|--------|
| [9, 7, 5] | 3 | 2 |
| [10, 20, 30] | 5 | 3 |

*Explanation*: For the first example, `k=2` reduces the array to `[4,3,2]` which are all ≤ 3.

## Approach

**Algorithm**: Binary Search — O(n log M).

We binary‑search the answer `k`. For a candidate `k`, we simulate reducing each element (e.g., `ceil(num/k)`) and check if all results are ≤ limit. If true, we can try a smaller `k`; otherwise we need a larger one.

```text
FUNCTION minimumK(nums, limit):
    SET lo ← 1
    SET hi ← MAX(nums)
    WHILE lo < hi:
        SET mid ← (lo + hi) / 2
        IF canReduce(nums, mid, limit):
            SET hi ← mid
        ELSE:
            SET lo ← mid + 1
    RETURN lo

FUNCTION canReduce(nums, k, limit):
    FOR each num IN nums:
        IF CEIL(num / k) > limit:
            RETURN false
    RETURN true
```

## Walkthrough

Example: `nums = [9,7,5], limit = 3`

1. `lo=1, hi=9` → `mid=5`. `canReduce` fails because `ceil(9/5)=2 ≤3`, `ceil(7/5)=2`, `ceil(5/5)=1` → all ≤3, so success → `hi=5`.
2. `mid=3` → `ceil(9/3)=3`, `ceil(7/3)=3`, `ceil(5/3)=2` → success → `hi=3`.
3. `mid=2` → `ceil(9/2)=5` > 3 → fail → `lo=3`.
4. Loop ends, return `3`.

## Complexity Analysis

- **Time**: O(n log M) where `M` is the maximum element value (binary search steps) and `n` is the array length.
- **Space**: O(1) – only a few scalar variables.

## Follow‑Up Questions

1. How would the solution change if the reduction operation were subtraction by `k` instead of division?
2. Can you design an O(n) algorithm without binary search using monotonic properties?
3. What if the limit constraint applied to the sum of the array rather than each element individually?

## Key Takeaway

> When finding the minimum parameter that satisfies a monotonic constraint, **binary search** on the parameter value — verify each candidate in O(n).
