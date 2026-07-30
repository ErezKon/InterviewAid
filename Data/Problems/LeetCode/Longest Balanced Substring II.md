# 3714. Longest Balanced Substring II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-balanced-substring-ii](https://leetcode.com/problems/longest-balanced-substring-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## 1. Problem Description

Find the longest substring with balanced character distribution (each character appears equally).

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"aabb"` | `4` | The whole string has two `a` and two `b`.
| `"abcabcab"` | `6` | Substring `"abcabc"` balances three characters each appearing twice.

---

## 3. Approach

**Normalized Prefix State**

```text
FUNCTION longestBalanced(s):
    SET n ← LENGTH(s)
    SET freq[26] ← ARRAY OF 0
    SET firstSeen ← MAP WITH KEY (0,…,0) → 0
    SET maxLen ← 0
    FOR i ← 1 TO n:
        SET idx ← ORD(s[i-1]) - ORD('a')
        INCREMENT freq[idx]
        // Normalize by subtracting frequency of first character (or any reference)
        SET ref ← freq[0]
        SET state ← TUPLE( freq[j] - ref FOR j ← 0 TO 25 )
        IF state IN firstSeen:
            SET maxLen ← MAX(maxLen, i - firstSeen[state])
        ELSE:
            SET firstSeen[state] ← i
    RETURN maxLen
```

---

## 4. Walkthrough

Consider `s = "aabb"`:

| i | char | freq(a) | freq(b) | ref | state (a‑ref, b‑ref) | firstSeen[state] |
|---|------|--------|--------|-----|----------------------|------------------|
|0| - |0|0|0|(0,0)|0|
|1| a |1|0|1|(0,‑1)|new → 1|
|2| a |2|0|2|(0,‑2)|new → 2|
|3| b |2|1|2|(0,‑1)|seen at 1 → len=3‑1=2|
|4| b |2|2|2|(0,0)|seen at 0 → len=4‑0=4|

Maximum length recorded is 4.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n·Σ) where Σ=26 → O(n) | O(n) for hashmap of states |

---

## 6. Follow-Up Questions

1. How would the algorithm change for Unicode characters with a larger alphabet?
2. Can we extend the method to require each character to appear at least *k* times?
3. What is the impact of allowing deletions instead of requiring a contiguous substring?

---

## 7. Key Takeaway

> Normalizing frequency counts to a reference character creates a hashable state; identical states at two indices indicate a balanced substring between them.
