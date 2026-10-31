# 1397. Find All Good Strings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-all-good-strings](https://leetcode.com/problems/find-all-good-strings)
**Companies:** Dunzo, Google

---

## Problem Description

Given the strings `s1` and `s2` of size `n` and the string `evil`, return *the number of **good** strings*.

A **good** string has size `n`, it is alphabetically greater than or equal to `s1`, it is alphabetically smaller than or equal to `s2`, and it does not contain the string `evil` as a substring. Since the answer can be a huge number, return this **modulo** `10⁹ + 7`.

**Constraints:**

- `s1.length == n`
- `s2.length == n`
- `s1 <= s2`
- `1 <= n <= 500`
- `1 <= evil.length <= 50`
- All strings consist of lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input: n = 2, s1 = "aa", s2 = "da", evil = "b"
  Output: 51
  Explanation: There are 25 good strings starting with 'a': "aa","ac","ad",...,"az". Then there are 25 good strings starting with 'c': "ca","cc","cd",...,"cz" and finally there is one good string starting with 'd': "da".
```

```
Example 2:
  Input: n = 8, s1 = "leetcode", s2 = "leetgoes", evil = "leet"
  Output: 0
  Explanation: All strings greater than or equal to s1 and smaller than or equal to s2 start with the prefix "leet", therefore, there is not any good string.
```

```
Example 3:
  Input: n = 2, s1 = "gx", s2 = "gz", evil = "x"
  Output: 2
```

---

## Approach

**Digit DP + KMP** — O(n × |evil| × 26) ✅

We perform a digit-DP over each position, tracking the current KMP state of the `evil` pattern and whether the prefix is tight to the upper bound. A second DP counts strings ≤ `s1` (after decrementing `s1`). The answer is the difference.

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

1. `count("da")` enumerates all 2-letter strings up to "da" while avoiding "b".
2. `decrement("aa")` yields "`?`" (empty) so `count` returns 0.
3. Subtracting gives the total of 51 valid strings.

---

## Complexity Analysis

- **Time:** O(n × |evil| × 26) – each DP state processes up to 26 letters.
- **Space:** O(n × |evil|) for memoization of DP states.

---

## Follow-Up Questions

- How would the solution change if the alphabet were larger (e.g., all ASCII characters)?
- Can the approach be adapted to count strings that contain `evil` at most *k* times?
- What if multiple forbidden substrings are given?

---

## Key Takeaway

> Combining digit-DP with a KMP automaton efficiently counts strings in a range while enforcing a substring-avoidance constraint.
