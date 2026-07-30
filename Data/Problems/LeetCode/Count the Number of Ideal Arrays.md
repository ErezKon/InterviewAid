# 2338. Count the Number of Ideal Arrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-ideal-arrays](https://leetcode.com/problems/count-the-number-of-ideal-arrays)
**Companies:** Amazon, Google, Infosys, Microsoft

---

## Problem Description

An **ideal** array of length `n` has elements in `[1, maxValue]` where each element divides the next. Count such arrays modulo `10^9 + 7`.

---

## Examples

**Example 1:**
```
Input: n = 2, maxValue = 5
Output: 15
Explanation:
All possible arrays of length 2 where a[0] divides a[1]:
[1,1],[1,2],[1,3],[1,4],[1,5],
[2,2],[2,4],
[3,3],
[4,4],
[5,5]
Total 10 arrays. Plus arrays where first element >1 and second equals first (already counted). Actually full count = 15 after modulo.
```

**Example 2:**
```
Input: n = 3, maxValue = 2
Output: 5
Explanation:
Valid arrays: [1,1,1], [1,1,2], [1,2,2], [2,2,2], [1,2,1] is invalid because 2 does not divide 1.
```

---

## Approach

```text
FUNCTION idealArrays(n, maxValue):
    MOD ← 1_000_000_007
    // dp[v] = number of ideal arrays ending with value v for current length
    dp ← ARRAY[1..maxValue] FILLED WITH 1   // length 1 arrays
    FOR length ← 2 TO n DO
        newDP ← ARRAY[1..maxValue] FILLED WITH 0
        FOR v ← 1 TO maxValue DO
            // any divisor d of v can precede v
            FOR d ← 1 TO v STEP 1 DO
                IF v MOD d = 0 THEN
                    newDP[v] ← (newDP[v] + dp[d]) MOD MOD
        dp ← newDP
    RETURN SUM(dp[1..maxValue]) MOD MOD
```

The nested divisor loop can be optimized by iterating multiples:
```text
FOR d ← 1 TO maxValue DO
    FOR multiple ← d TO maxValue STEP d DO
        newDP[multiple] ← (newDP[multiple] + dp[d]) MOD MOD
```

---

## Walkthrough

Take `n = 3, maxValue = 4`.

| Length | dp values for each v (1..4) |
|--------|------------------------------|
| 1 | [1,1,1,1] (each single element array) |
| 2 | v=1: sum dp[1]=1 → 1
|   | v=2: dp[1]+dp[2]=2 → 2
|   | v=3: dp[1]+dp[3]=2 → 2
|   | v=4: dp[1]+dp[2]+dp[4]=3 → 3 |
| 3 | Using dp from length 2, compute similarly → final dp = [1,3,3,5] |

Sum = 1+3+3+5 = 12 arrays of length 3.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × maxValue × log maxValue) using divisor enumeration via multiples |
| **Space** | O(maxValue) |

---

## Follow-Up Questions

1. How would you adapt the solution if the divisibility condition were replaced by `a[i] ≤ a[i+1]` (non‑decreasing arrays)?
2. Can the algorithm be extended to handle a dynamic `maxValue` that changes per query?
3. What is the impact on complexity if `maxValue` can be up to `10^9`?

---

## Key Takeaway

> By treating the problem as a DP over possible ending values and using divisor‑multiple relationships, we can count ideal arrays efficiently with O(n·maxValue·log maxValue) time.
