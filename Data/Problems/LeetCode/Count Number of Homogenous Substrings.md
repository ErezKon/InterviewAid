# 1759. Count Number of Homogenous Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-homogenous-substrings](https://leetcode.com/problems/count-number-of-homogenous-substrings)
**Companies:** Google, Virtu

---

## 1. Problem Description

Given a string `s`, return *the number of **homogenous** substrings of* `s`*.* Since the answer may be too large, return it **modulo** `10^9 + 7`.

A string is **homogenous** if all the characters of the string are the same.

A **substring** is a contiguous sequence of characters within a string.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase letters.

---

## 2. Key Insight

> Group consecutive identical characters. A run of length `k` contributes `k × (k + 1) / 2` homogenous substrings.

---

## 3. Approach: Group Runs — O(n) ✅

```text
FUNCTION countHomogenous(s):
    MOD ← 10^9 + 7
    count ← 0
    run ← 1
    FOR i ← 1 TO len(s) - 1:
        IF s[i] == s[i-1]:
            run ← run + 1
        ELSE:
            count ← (count + run * (run + 1) / 2) % MOD
            run ← 1
    count ← (count + run * (run + 1) / 2) % MOD
    RETURN count
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 4. Examples

```
Example 1:
  Input: s = "abbcccaa"
  Output: 13
  Explanation: The homogenous substrings are listed as below:
  "a"   appears 3 times.
  "aa"  appears 1 time.
  "b"   appears 2 times.
  "bb"  appears 1 time.
  "c"   appears 3 times.
  "cc"  appears 2 times.
  "ccc" appears 1 time.
  3 + 1 + 2 + 1 + 3 + 2 + 1 = 13.
```

```
Example 2:
  Input: s = "xy"
  Output: 2
  Explanation: The homogenous substrings are "x" and "y".
```

```
Example 3:
  Input: s = "zzzzz"
  Output: 15
```

---

## 5. Walkthrough

Consider the string `"abbcccaa"`.

1. Initialize `run = 1` at first character `a`.
2. Next char `b` differs → add contribution of previous run: `1·2/2 = 1`. Reset `run = 1`.
3. Next char `b` same as previous → `run = 2`.
4. Next char `c` differs → add `2·3/2 = 3`. Reset `run = 1`.
5. Next two chars `c` same → `run` becomes `3`.
6. Next char `a` differs → add `3·4/2 = 6`. Reset `run = 1`.
7. Next char `a` same → `run = 2`.
8. End of string → add final run `2·3/2 = 3`.
9. Sum contributions: `1 + 3 + 6 + 3 = 13`.

---

## 6. Complexity Analysis

- **Time:** O(n) – single pass through the string.
- **Space:** O(1) – only a few integer variables.

---

## 7. Follow-Up Questions

- How would you modify the algorithm to return the list of all homogenous substrings instead of just the count?
- Can the approach be adapted to handle a stream of characters where the length is unknown upfront?

---

## Key Takeaway

> A run of `k` identical characters yields `k(k+1)/2` substrings. Just track run lengths and sum the triangular numbers.
