# 1759. Count Number of Homogenous Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-homogenous-substrings](https://leetcode.com/problems/count-number-of-homogenous-substrings)
**Companies:** Google, Virtu

---

## 1. Problem Description

Given a string `s`, count the number of **homogenous** substrings (substrings where all characters are the same). Return modulo 10^9+7.

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

| Input | Output | Explanation |
|-------|--------|-------------|
| `"abbcccaa"` | `13` | Runs: `a(1)`, `bb(2)`, `ccc(3)`, `aa(2)`. Contributions: `1`, `3`, `6`, `3` → total `13` |
| `"xy"` | `2` | Each character forms a run of length 1 → `1 + 1 = 2` |
| `"zzzzz"` | `15` | Run length 5 → `5·6/2 = 15` |

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
