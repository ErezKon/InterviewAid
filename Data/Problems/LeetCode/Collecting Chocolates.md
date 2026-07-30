# 2735. Collecting Chocolates

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/collecting-chocolates](https://leetcode.com/problems/collecting-chocolates)
**Companies:** Amazon, Deutsche Bank

---

## 1. Problem Description

Given `n` chocolate types with costs `nums[i]` and an operation that costs `x` and rotates all types by one position (each chocolate becomes the next type), find the minimum total cost to collect one chocolate of each type.

---

## 2. Approach: Enumerate Rotations — O(n²) ✅

```text
FUNCTION minCost(nums, x):
    n = LENGTH(nums)
    minCosts = COPY(nums)               // current minimum cost for each type
    best = SUM(nums)                    // cost with 0 rotations
    
    FOR k FROM 1 TO n-1:                // try k rotations
        FOR i FROM 0 TO n-1:
            SET minCosts[i] ← MIN(minCosts[i], nums[(i + k) MOD n])
        total = SUM(minCosts) + k * x
        best = MIN(best, total)
    
    RETURN best
```

---

## 3. Examples

| nums | x | output |
|------|---|--------|
| [1,2,3] | 1 | 6 |
| [5,4,3,2,1] | 2 | 12 |
| [10,10,10] | 5 | 30 |

*Explanation*: For the first case, rotating once reduces the cost of type 2 to `1`, but adds rotation cost `1`, total `6` which is optimal.

---

## 4. Walkthrough

Consider `nums = [1,2,3]`, `x = 1`.

1. `k = 0`: `minCosts = [1,2,3]`, total = `1+2+3 + 0 = 6`.
2. `k = 1`: compare each type with its rotated counterpart:
   - type 0: min(1,2) = 1
   - type 1: min(2,3) = 2
   - type 2: min(3,1) = 1 → `minCosts = [1,2,1]`
   total = `1+2+1 + 1*1 = 5`? actually sum=4 +1=5, which is lower.
3. `k = 2`: further rotation yields `minCosts = [1,1,1]`, total = `3 + 2 = 5`.
4. Minimum across all `k` is `5`.

---

## 5. Complexity Analysis

- **Time:** O(n²) – try each of the `n‑1` rotations and update `n` types.
- **Space:** O(n) – `minCosts` array.

---

## 6. Follow-Up Questions

- How would you improve the solution if `n` were up to 10⁵? (Hint: use a sliding‑window minimum.)
- What if each rotation had a different cost instead of a constant `x`?
- Can you extend the problem to allow collecting multiple chocolates per type?

---

## Key Takeaway

> Enumerating rotations while maintaining a running minimum per type captures the trade‑off between rotation cost and cheaper chocolate prices.
