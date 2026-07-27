# 3463. Check If Digits Are Equal in String After Operations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-ii](https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-ii)
**Companies:** Adp, Google

---

## 1. Problem Description

Given a string of digits, repeatedly replace each pair of adjacent digits with their sum mod 10, reducing the string by one character each round, until two digits remain. Return whether the final two digits are equal. Constraints are large, requiring an efficient approach.

---

## 2. Key Insight

> The final two digits are linear combinations of the original digits with binomial coefficients modulo 10. Specifically, the `i`-th original digit contributes with coefficient `C(n-2, i) mod 10` to the first final digit and `C(n-2, i-1) mod 10` to the second. Use Lucas' theorem for binomial mod 2 and mod 5, then CRT.

---

## 3. Approach: Binomial Coefficients mod 10 — O(n) ✅

```
FUNCTION hasSameDigits(s):
    n = len(s)
    // Compute: sum1 = Σ s[i] * C(n-2, i) mod 10 for first final digit
    // Compute: sum2 = Σ s[i] * C(n-2, i-1) mod 10 for second final digit
    // Equivalently: check if Σ s[i] * (C(n-2,i) - C(n-2,i-1)) ≡ 0 mod 10
    
    // Use Lucas theorem for C(n,k) mod 2 and mod 5
    // Combine via CRT for mod 10
    
    diff = 0
    FOR i FROM 0 TO n-1:
        coeff = binomMod10(n-2, i) - binomMod10(n-2, i-1)
        diff = (diff + s[i] * coeff) % 10
    
    RETURN diff == 0
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Repeated pairwise reduction produces linear combinations with binomial coefficients. For large `n`, compute `C(n,k) mod p` via Lucas' theorem, then combine mod 2 and mod 5 results using CRT for mod 10.
