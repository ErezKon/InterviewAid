# 3883. Count Non Decreasing Arrays With Given Digit Sums

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-non-decreasing-arrays-with-given-digit-sums](https://leetcode.com/problems/count-non-decreasing-arrays-with-given-digit-sums)
**Companies:** Docusign

---

## 1. Problem Description

Given an array of digit sums, count the number of non-decreasing arrays where each element's digit sum matches the corresponding given digit sum.

---

## 2. Key Insight

> This is a combinatorial DP problem. For each position, enumerate valid values with the required digit sum, constrained to be ≥ the previous value. Use DP with states tracking the previous value.

---

## 3. Approach: DP with Digit Sum Enumeration ✅

```
FUNCTION countArrays(digitSums):
    // For each digit sum, precompute valid numbers
    // DP: dp[i][prevVal] = count of valid arrays up to position i
    // Optimize by tracking only the minimum valid value
    ...
```

| Time | Space |
|------|-------|
| Depends on constraints | O(n × value_range) |

---

## Key Takeaway

> Non-decreasing constraint + digit sum constraint: enumerate valid values per position using digit sum properties, then DP with the monotonicity constraint.
