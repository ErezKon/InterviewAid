# 2915. Length of the Longest Subsequence That Sums to Target

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Intuit, Meta

---

## 1. Problem Description

Find the length of the longest subsequence that sums to `target`. Return -1 if impossible.

---

## 2. Approach: DP (0/1 Knapsack variant) — O(n·target) ✅

```text
FUNCTION lengthOfLongestSubsequence(nums, target):
    // dp[j] = maximum length of subsequence that sums to j
    SET dp ← array of size target+1 filled with -infinity
    SET dp[0] ← 0
    FOR num IN nums:
        FOR j ← target DOWN TO num:
            SET dp[j] ← MAX(dp[j], dp[j - num] + 1)
    RETURN dp[target] IF dp[target] > 0 ELSE -1
```

---

## Examples

| nums | target | Output |
|------|--------|--------|
| [1,2,3,4,5] | 9 | 3 |
| [5,5,5] | 10 | 2 |
| [1,2,3] | 7 | -1 |

*Explanation*: In the first example the subsequence `[1,3,5]` (or `[2,3,4]`) sums to 9 and has length 3.

---

## Walkthrough

Take `nums = [1,2,3,4,5]`, `target = 9`.

1. Initialize `dp[0]=0`, others = -∞.
2. Process `num=1`:
   - Update `dp[1]=1`.
3. Process `num=2`:
   - Update `dp[3]=dp[1]+1=2`, `dp[2]=1`.
4. Process `num=3`:
   - Update `dp[6]=dp[3]+1=3`, `dp[5]=dp[2]+1=2`, `dp[4]=dp[1]+1=2`.
5. Process `num=4` and `num=5` similarly.
6. Final `dp[9]=3`, representing a subsequence of length 3.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n·target) | O(target) |

The DP iterates over each number and each possible sum up to `target`.

---

## Follow-Up Questions

1. How would you modify the solution to return the actual subsequence, not just its length?
2. Can the algorithm be optimized for large `target` using meet‑in‑the‑middle?
3. What changes are needed if numbers can be negative?

---

## Key Takeaway

> Classic 0/1 knapsack variant where `dp[j]` stores the maximum count of elements summing to `j`. Iterate numbers outer, sums inner (descending) to enforce each element is used at most once.
