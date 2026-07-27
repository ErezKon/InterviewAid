# 1397. Find All Good Strings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-all-good-strings](https://leetcode.com/problems/find-all-good-strings)
**Companies:** Dunzo, Google

---

## Problem Description

Count strings in range `[s1, s2]` (lexicographic) of length `n` that do **not contain** `evil` as a substring. Return count modulo 10⁹+7.

---

## Key Insight

> **Digit DP + KMP**: enumerate strings digit-by-digit, tracking how much of the `evil` pattern is matched (KMP failure state). Use tight/loose bounds for s1 and s2 limits. A string is "good" if we never complete a full match of `evil`.

---

## Approach: Digit DP + KMP — O(n × |evil| × 26) ✅

```
FUNCTION findGoodStrings(n, s1, s2, evil):
    fail = buildKMPFailure(evil)

    FUNCTION count(s):
        // Count good strings ≤ s using digit DP
        // State: (position, kmpState, tight)
        memo = {}
        FUNCTION dp(pos, matched, tight):
            IF matched == len(evil): RETURN 0  // evil found
            IF pos == n: RETURN 1
            limit = s[pos] IF tight ELSE 'z'
            total = 0
            FOR c ← 'a' TO limit:
                newMatched = kmpTransition(matched, c, evil, fail)
                newTight = tight AND (c == limit)
                total += dp(pos + 1, newMatched, newTight)
            RETURN total % MOD
        RETURN dp(0, 0, true)

    RETURN (count(s2) - count(decremented s1) + MOD) % MOD
```

---

## Key Takeaway

> **Digit DP for range counting + KMP automaton for substring avoidance. Classic combination for "count strings in range without forbidden pattern" problems.**
