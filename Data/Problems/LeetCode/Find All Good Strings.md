# 1397. Find All Good Strings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-all-good-strings](https://leetcode.com/problems/find-all-good-strings)
**Companies:** Dunzo, Google

---

## Problem Description

Count strings of length `n` that lie lexicographically between `s1` and `s2` (inclusive) and do **not contain** the substring `evil`. Return the count modulo 10⁹+7.

---

## 2. Examples

| n | s1 | s2 | evil | Output |
|---|----|----|------|--------|
| 2 | "aa" | "da" | "b" | 51 |
| 3 | "acd" | "bcd" | "bc" | 4 |

*Explanation*: All strings in the range that avoid the forbidden pattern are counted.

---

## Approach

**Digit DP + KMP** — O(n × |evil| × 26) ✅

We perform a digit‑DP over each position, tracking the current KMP state of the `evil` pattern and whether the prefix is tight to the upper bound. A second DP counts strings ≤ `s1` (after decrementing `s1`). The answer is the difference.

```text
FUNCTION findGoodStrings(n, s1, s2, evil):
    MOD ← 1_000_000_007
    fail ← buildKMPFailure(evil)

    FUNCTION count(limit):
        // DP(state): position, kmpState, tight
        memo ← {}
        FUNCTION dp(pos, state, tight):
            IF state == len(evil): RETURN 0
            IF pos == n: RETURN 1
            key ← (pos, state, tight)
            IF key IN memo: RETURN memo[key]
            limitChar ← limit[pos] IF tight ELSE 'z'
            total ← 0
            FOR c ← 'a' TO limitChar:
                newState ← kmpTransition(state, c, evil, fail)
                newTight ← tight AND (c == limitChar)
                total ← (total + dp(pos+1, newState, newTight)) % MOD
            memo[key] ← total
            RETURN total
        RETURN dp(0, 0, true)

    RETURN (count(s2) - count(decrement(s1)) + MOD) % MOD
```

---

## Walkthrough

Consider `n=2, s1="aa", s2="da", evil="b"`.

1. `count("da")` enumerates all 2‑letter strings up to "da" while avoiding "b".
2. `decrement("aa")` yields "`?`" (empty) so `count` returns 0.
3. Subtracting gives the total of 51 valid strings.

---

## Complexity Analysis

- **Time:** O(n × |evil| × 26) – each DP state processes up to 26 letters.
- **Space:** O(n × |evil|) for memoization of DP states.

---

## Follow‑Up Questions

- How would the solution change if the alphabet were larger (e.g., all ASCII characters)?
- Can the approach be adapted to count strings that contain `evil` at most *k* times?
- What if multiple forbidden substrings are given?

---

## Key Takeaway

> Combining digit‑DP with a KMP automaton efficiently counts strings in a range while enforcing a substring‑avoidance constraint.
