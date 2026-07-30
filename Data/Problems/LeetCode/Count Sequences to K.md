# 3850. Count Sequences to K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-sequences-to-k](https://leetcode.com/problems/count-sequences-to-k)
**Companies:** Google, Linkedin

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Count the number of valid sequences of length `n` whose elements sum to exactly `k`. Each position may choose from a set of allowed values that can depend on the step index. Return the count modulo `10^9 + 7`.

---

## Examples

**Example 1:**
```
Input: n = 3, k = 5, choices = [[1,2],[1,3],[2,3]]
Output: 2
Explanation: The two valid sequences are [1,1,3] and [2,1,2].
```

**Example 2:**
```
Input: n = 2, k = 4, choices = [[1,2,3],[1,2,3]]
Output: 1
Explanation: Only sequence [1,3] (or [3,1] if order matters) sums to 4.
```

---

## Key Insight

The problem is a bounded‑knapsack style DP where the state is the current sum. At each step we transition by adding each allowed choice for that position.

---

## Approach

```text
FUNCTION countSequences(n, k, choices):
    MOD ← 10^9 + 7
    dp ← ARRAY[0..k] INITIALIZED TO 0
    dp[0] ← 1

    FOR step ← 0 TO n-1 DO
        newDp ← ARRAY[0..k] INITIALIZED TO 0
        FOR sum ← 0 TO k DO
            IF dp[sum] > 0 THEN
                FOR val IN choices[step] DO
                    IF sum + val ≤ k THEN
                        newDp[sum + val] ← (newDp[sum + val] + dp[sum]) MOD MOD
        dp ← newDp

    RETURN dp[k]
```

---

## Walkthrough

Take **Example 1** (`n=3, k=5`).

| Step | dp after processing step | Explanation |
|------|--------------------------|-------------|
| 0 (init) | dp[0]=1, others 0 | Start with empty sequence |
| 1 (choices {1,2}) | dp[1]=1, dp[2]=1 | Add 1 → sum1, add 2 → sum2 |
| 2 (choices {1,3}) | dp[2]=1 (1+1), dp[4]=1 (1+3), dp[3]=1 (2+1) | Build on previous sums |
| 3 (choices {2,3}) | dp[5]=2 (2+3 and 3+2) | Two ways reach total 5 |

Result `dp[5]=2` matches the output.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × k × c) where `c` is average number of choices per step |
| **Space** | O(k) for the DP array |

---

## Follow-Up Questions

1. How would you modify the algorithm if the order of elements does not matter?
2. Can the solution be optimized when `k` is very large but choices are small?
3. What if each choice also has a cost and you need to minimize total cost while reaching sum `k`?

---

## Key Takeaway

> **Counting sequences to a target sum is a DP over the running sum, similar to bounded knapsack. Iterate positions, transition by adding each allowed value, and use modular arithmetic.**