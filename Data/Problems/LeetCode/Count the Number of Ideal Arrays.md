# 2338. Count the Number of Ideal Arrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-ideal-arrays](https://leetcode.com/problems/count-the-number-of-ideal-arrays)
**Companies:** Amazon, Google, Infosys, Microsoft

---

## Problem Description

You are given two integers `n` and `maxValue`, which are used to describe an **ideal** array.

A **0-indexed** integer array `arr` of length `n` is considered **ideal** if the following conditions hold:

- Every `arr[i]` is a value from `1` to `maxValue`, for `0 <= i < n`.
- Every `arr[i]` is divisible by `arr[i - 1]`, for `0 < i < n`.

Return *the number of **distinct** ideal arrays of length* `n`. Since the answer may be very large, return it modulo `10^9 + 7`.

**Constraints:**
- `2 <= n <= 10^4`
- `1 <= maxValue <= 10^4`

---

## Examples

```
Example 1:
  Input: n = 2, maxValue = 5
  Output: 10
  Explanation: The following are the possible ideal arrays:
  - Arrays starting with the value 1 (5 arrays): [1,1], [1,2], [1,3], [1,4], [1,5]
  - Arrays starting with the value 2 (2 arrays): [2,2], [2,4]
  - Arrays starting with the value 3 (1 array): [3,3]
  - Arrays starting with the value 4 (1 array): [4,4]
  - Arrays starting with the value 5 (1 array): [5,5]
  There are a total of 5 + 2 + 1 + 1 + 1 = 10 distinct ideal arrays.
```

```
Example 2:
  Input: n = 5, maxValue = 3
  Output: 11
  Explanation: The following are the possible ideal arrays:
  - Arrays starting with the value 1 (9 arrays):
     - With no other distinct values (1 array): [1,1,1,1,1]
     - With 2nd distinct value 2 (4 arrays): [1,1,1,1,2], [1,1,1,2,2], [1,1,2,2,2], [1,2,2,2,2]
     - With 2nd distinct value 3 (4 arrays): [1,1,1,1,3], [1,1,1,3,3], [1,1,3,3,3], [1,3,3,3,3]
  - Arrays starting with the value 2 (1 array): [2,2,2,2,2]
  - Arrays starting with the value 3 (1 array): [3,3,3,3,3]
  There are a total of 9 + 1 + 1 = 11 distinct ideal arrays.
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
