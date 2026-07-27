# 902. Numbers At Most N Given Digit Set

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/numbers-at-most-n-given-digit-set](https://leetcode.com/problems/numbers-at-most-n-given-digit-set)
**Companies:** Amazon, Google, Microsoft, Tiktok

---

## Approach: Digit DP — O(log N) ✅

```
FUNCTION atMostNGivenDigitSet(digits, n):
    s = str(n); k = len(s); d = len(digits)
    // Numbers with fewer digits: d + d^2 + ... + d^(k-1)
    result = SUM(d^i for i in range(1, k))

    // Numbers with exactly k digits
    FOR i ← 0 TO k - 1:
        hasSame = false
        FOR digit IN digits:
            IF digit < s[i]: result += d^(k - 1 - i)
            ELSE IF digit == s[i]: hasSame = true
        IF NOT hasSame: RETURN result

    RETURN result + 1    // n itself is valid
```
