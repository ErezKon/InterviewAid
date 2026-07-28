# 2060. Check if an Original String Exists Given Two Encoded Strings

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-an-original-string-exists-given-two-encoded-strings](https://leetcode.com/problems/check-if-an-original-string-exists-given-two-encoded-strings)
**Companies:** Bitgo, Meta

---

## 1. Problem Description

Given two encoded strings where letters are literal and digits represent wildcard lengths (1‑3 digit numbers), determine if there exists an original string that both encodings could represent.

---

## 2. Key Insight

> DP with state `(i, j, diff)` where `i`, `j` are positions in the two strings and `diff` tracks the balance of unmatched wildcard characters (positive = first string ahead, negative = second ahead). Transitions consume letters when `diff == 0` or expand digit sequences to adjust `diff`.

---

## 3. Examples

| s1 | s2 | Output |
|----|----|--------|
| "a2c" | "3" | true |
| "a2c" | "2c" | false |
| "123" | "1a2" | true |

---

## 4. Walkthrough

Consider `s1 = "a2c"` and `s2 = "3"`:
1. Start at `(0,0,0)`. `s1[0] = 'a'`, `s2[0] = '3'` (digit).
2. Expand digit `3` in `s2` → `diff = -3` (s2 ahead by 3 wildcards).
3. Consume `'a'` from `s1` while `diff < 0` → `diff = -2`.
4. Expand digit `2` in `s1` → `diff = 0` (now both strings aligned).
5. Remaining `'c'` in `s1` matches the third wildcard from `s2` → `diff = 0` and both strings end.
6. All characters matched, return `true`.

---

## 5. Complexity Analysis

- **Time:** O(n × m × D) where `n` and `m` are the lengths of the two strings and `D` is the range of possible `diff` values (bounded by the maximum total wildcard length, ≤ 2000).
- **Space:** O(n × m × D) for memoization of DP states.

---

## 6. Follow‑Up Questions

- How would the solution change if digits could represent any length up to 10⁹?
- Can you adapt the DP to also output one possible original string?
- What if the encodings may contain wildcard characters `*` that match exactly one arbitrary letter?

---

## Key Takeaway

> Encoding matching reduces to a DP that tracks the difference in unmatched wildcard characters between the two strings, enabling systematic exploration of all possible expansions.
