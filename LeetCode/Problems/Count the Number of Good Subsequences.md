# 2539. Count the Number of Good Subsequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-good-subsequences](https://leetcode.com/problems/count-the-number-of-good-subsequences)
**Companies:** Nvidia, Palantir, Tusimple, Ukg

---

## Problem Description

A **good** subsequence is one where every distinct character appears the same number of times. Count non-empty good subsequences of string `s`, modulo `10^9 + 7`.

---

## Key Insight

Fix the target frequency `f` (1 to max character count). For each character `c` with count `cnt[c] ≥ f`, you can either skip it or choose `f` of its occurrences: `C(cnt[c], f) + 1` options (the +1 is for skipping). Multiply across all characters, subtract 1 (for the all-skip case). Sum over all valid `f`.

---

## Approach

```
FUNCTION countGoodSubsequences(s):
    MOD = 10^9 + 7
    cnt = Counter(s)
    maxCount = MAX(cnt.values())
    result = 0

    FOR f ← 1 TO maxCount DO
        ways = 1
        FOR c IN cnt DO
            IF cnt[c] >= f:
                ways = ways * (C(cnt[c], f) + 1) % MOD
            // If cnt[c] < f, this char can only be skipped (×1, no change)
        ways -= 1   // subtract the all-skip case
        result = (result + ways) % MOD

    RETURN result
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(maxCount × 26) with precomputed factorials |
| **Space** | O(n) for factorials |

---

## Key Takeaway

> **Good subsequences with uniform character frequency: fix the target frequency f, then for each character independently choose to include f copies or skip. Multiply choices, subtract the empty case, sum over all f.**
