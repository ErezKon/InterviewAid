# 2311. Longest Binary Subsequence Less Than or Equal to K

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

Find the longest subsequence of a binary string whose value (as a binary number) is ≤ `k`.

---

## 2. Approach: Greedy — O(n) ✅

Take all '0's (they don't increase value). Then greedily add '1's from right to left while value stays ≤ k.

```
FUNCTION longestSubsequence(s, k):
    zeros = s.count('0')
    ones = 0; val = 0
    FOR i ← len(s) - 1 DOWN TO 0:
        IF s[i] == '1':
            IF val + (1 << ones) <= k:
                val += (1 << ones)
                ones += 1
        ELSE:
            ones += 0  // zeros already counted
    RETURN zeros + ones
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> All zeros are free (they contribute nothing to value). Greedily add 1s from the right (low-order bits) since they contribute the least value per bit.
