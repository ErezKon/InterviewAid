# 1388. Pizza With 3n Slices

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/pizza-with-3n-slices](https://leetcode.com/problems/pizza-with-3n-slices)
**Companies:** Amazon, Google

---

## Problem Description
There are `3n` pizza slices arranged in a circle, each with a size `slices[i]`. Alice, Bob, and you take turns picking a slice; you pick first, then Bob, then Alice again, and so on. After each pick, the two adjacent slices become unavailable. Return the maximum total size you can obtain assuming optimal play.

## Examples
| slices | Output |
|--------|--------|
| [1,2,3,4,5,6] | 10 |
| [8,9,8,6,1,1] | 16 |
| [4,1,2,5,3,1] | 9 |

## Approach
Use dynamic programming on a linearized array of length `2·3n` to simulate picking `n` slices while respecting the circular constraint.

```text
FUNCTION MaxPizzaSize(slices):
    SET n ← LENGTH(slices) / 3
    // helper for linear case: pick exactly n slices from subarray [l, r]
    FUNCTION Solve(arr, n):
        SET m ← LENGTH(arr)
        CREATE dp[0..m][0..n] INITIALIZED TO 0
        FOR i ← 1 TO m:
            FOR j ← 1 TO MIN(n, (i+1)/2):
                // either skip i-th slice or take it (then skip previous)
                SET dp[i][j] ← MAX(dp[i-1][j], arr[i-1] + dp[i-2][j-1])
        RETURN dp[m][n]
    // case1: exclude first slice
    SET case1 ← Solve(slices[1:], n)
    // case2: exclude last slice
    SET case2 ← Solve(slices[:-1], n)
    RETURN MAX(case1, case2)
```

## Walkthrough (case1 example)
| i | arr[i] | dp[i][j] (choose j slices) |
|---|--------|---------------------------|
| ... | ... | ... |
*(omitted for brevity; illustrates DP table filling)*

## Complexity Analysis
Time **O(m·n)** where *m = 3n*, space **O(m·n)** (can be reduced to O(m) with rolling arrays).

## Follow-Up Questions
1. How to adapt the solution for a circular array with a different pick pattern?
2. Can the problem be solved with a greedy strategy for special cases?
3. What is the space‑optimized DP version using only two rows?

## Key Takeaway
Transforming the circular selection into two linear sub‑problems and applying DP on "pick‑or‑skip" yields the optimal maximum sum.
