# 3366. Minimum Array Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-array-sum](https://leetcode.com/problems/minimum-array-sum)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Oracle, Salesforce

---

## Key Insight

> Each element can have op1 (halve with ceiling), op2 (subtract k if ≥ k), both, or neither. Use DP tracking remaining op1 and op2 counts. Order of operations on the same element matters — try both orderings.

---

## Approach: DP — O(n · op1 · op2) ✅

```
FUNCTION minArraySum(nums, k, op1, op2):
    n ← LEN(nums)
    // dp[i][j] = min sum achievable with i op1's and j op2's remaining
    dp ← ARRAY(op1+1, op2+1, INFINITY)
    dp[op1][op2] ← 0
    
    FOR num IN nums DO
        newDp ← ARRAY(op1+1, op2+1, INFINITY)
        FOR i ← 0 TO op1 DO
            FOR j ← 0 TO op2 DO
                IF dp[i][j] = INFINITY THEN CONTINUE
                val ← num
                // No operation
                newDp[i][j] ← MIN(newDp[i][j], dp[i][j] + val)
                // Op1 only
                IF i > 0 THEN
                    v1 ← CEIL(val / 2)
                    newDp[i-1][j] ← MIN(newDp[i-1][j], dp[i][j] + v1)
                // Op2 only
                IF j > 0 AND val ≥ k THEN
                    v2 ← val - k
                    newDp[i][j-1] ← MIN(newDp[i][j-1], dp[i][j] + v2)
                // Op1 then Op2
                IF i > 0 AND j > 0 THEN
                    v12 ← CEIL(val / 2)
                    IF v12 ≥ k THEN v12 ← v12 - k
                    v21 ← val - k IF val ≥ k ELSE val
                    v21 ← CEIL(v21 / 2)
                    newDp[i-1][j-1] ← MIN(newDp[i-1][j-1], dp[i][j] + MIN(v12, v21))
        dp ← newDp
    
    RETURN MIN over all dp[i][j]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n · op1 · op2)** | **O(op1 · op2)** |

---

## Key Takeaway

> **DP over operation budgets** — track remaining operations and try all combinations per element. When both ops apply, try both orderings since they can yield different results.

---
