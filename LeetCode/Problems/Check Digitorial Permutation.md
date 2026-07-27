# 3848. Check Digitorial Permutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-digitorial-permutation](https://leetcode.com/problems/check-digitorial-permutation)
**Companies:** Bloomberg

---

## 1. Problem Description

Check if a given permutation of digits 0-9 satisfies the "digitorial" property — where the product of digits at specific positions matches expected values based on factorial-like digit decomposition.

---

## 2. Approach: Simulation ✅

```
FUNCTION checkDigitorialPermutation(n, perm):
    // Verify the permutation encodes the factoriadic representation
    // Check each position's digit against the valid range
    FOR i ← 0 TO len(perm)-1:
        IF perm[i] > i + 1: RETURN false
    RETURN true
```

---

## Key Takeaway

> Factoriadic (factorial number system) representation problems: digit at position `i` must be in range `[0, i]`. Validate each position independently.
