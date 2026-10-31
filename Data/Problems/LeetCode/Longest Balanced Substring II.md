# 3714. Longest Balanced Substring II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-balanced-substring-ii](https://leetcode.com/problems/longest-balanced-substring-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs

---

## 1. Problem Description

> *Note: the Approach below normalizes all 26 counts against `freq['a']`, so it only finds substrings where **every** letter (including absent ones) is balanced — it misses substrings that use only one or two of the letters. Correct approach for #3714: handle three cases separately — (1) longest run of a single character; (2) for each pair of letters, prefix-difference hash map that is reset whenever the third letter appears; (3) all three letters, hash map keyed by `(cnt_b − cnt_a, cnt_c − cnt_a)`. O(n).*

You are given a string `s` consisting only of the characters `'a'`, `'b'`, and `'c'`.

A **substring** of `s` is called **balanced** if all **distinct** characters in the **substring** appear the **same** number of times.

Return the **length of the longest balanced substring** of `s`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` contains only the characters `'a'`, `'b'`, and `'c'`.

---

## 2. Examples

**Example 1:**
```
Input: s = "abbac"
Output: 4
Explanation: The longest balanced substring is "abba" because both distinct characters 'a' and 'b' each appear exactly 2 times.
```

**Example 2:**
```
Input: s = "aabcc"
Output: 3
Explanation: The longest balanced substring is "abc" because all distinct characters 'a', 'b' and 'c' each appear exactly 1 time.
```

**Example 3:**
```
Input: s = "aba"
Output: 2
Explanation: One of the longest balanced substrings is "ab" because both distinct characters 'a' and 'b' each appear exactly 1 time. Another longest balanced substring is "ba".
```

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

| i | char | freq(a) | freq(b) | ref | state (a-ref, b-ref) | firstSeen[state] |
|---|------|--------|--------|-----|----------------------|------------------|
|0| - |0|0|0|(0,0)|0|
|1| a |1|0|1|(0,-1)|new → 1|
|2| a |2|0|2|(0,-2)|new → 2|
|3| b |2|1|2|(0,-1)|seen at 1 → len=3-1=2|
|4| b |2|2|2|(0,0)|seen at 0 → len=4-0=4|

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
