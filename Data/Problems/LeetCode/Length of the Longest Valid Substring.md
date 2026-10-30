# 2781. Length of the Longest Valid Substring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/length-of-the-longest-valid-substring](https://leetcode.com/problems/length-of-the-longest-valid-substring)
**Companies:** Amazon, Google, Meta

---

## 1. Problem Description

You are given a string `word` and an array of strings `forbidden`.

A string is called **valid** if none of its substrings are present in `forbidden`.

Return *the length of the **longest valid substring** of the string* `word`.

A **substring** is a contiguous sequence of characters in a string, possibly empty.

**Constraints:**
- `1 <= word.length <= 10^5`
- `word` consists only of lowercase English letters.
- `1 <= forbidden.length <= 10^5`
- `1 <= forbidden[i].length <= 10`
- `forbidden[i]` consists only of lowercase English letters.

---

## 2. Examples

```
Example 1:
  Input: word = "cbaaaabc", forbidden = ["aaa","cb"]
  Output: 4
  Explanation: There are 11 valid substrings in word: "c", "b", "a", "ba", "aa", "bc", "baa", "aab", "ab", "abc" and "aabc".
  The length of the longest valid substring is 4.
  It can be shown that all other substrings contain either "aaa" or "cb" as a substring.
```

```
Example 2:
  Input: word = "leetcode", forbidden = ["de","le","e"]
  Output: 4
  Explanation: There are 11 valid substrings in word: "l", "t", "c", "o", "d", "tc", "co", "od", "tco", "cod", and "tcod".
  The length of the longest valid substring is 4.
  It can be shown that all other substrings contain either "de", "le", or "e" as a substring.
```

---

## 3. Walkthrough

| left | right (initial) | checked substrings | action | new right |
|------|----------------|--------------------|--------|----------|
| 3 | 3 | "a" (not forbidden) | keep | 3 |
| 2 | 3 | "a", "aa" (forbidden) | shrink right to 1 | 1 |
| 1 | 1 | "a" (not forbidden) | keep | 1 |
| 0 | 1 | "a", "aa" (forbidden) | shrink right to -1 | -1 |

The algorithm scans from right to left, tightening the right boundary whenever a forbidden substring is encountered within the next 10 characters.

---

## 4. Approach: Reverse Sliding Window — O(n·10) ✅

```text
FUNCTION longestValidSubstring(word, forbidden):
    SET forbSet ← SET(forbidden)
    SET maxLen ← 0
    SET right ← LENGTH(word) - 1
    FOR left ← LENGTH(word) - 1 DOWNTO 0:
        FOR k ← left TO MIN(left + 9, right):
            SET sub ← SUBSTRING(word, left, k)
            IF sub IN forbSet:
                SET right ← k - 1
                BREAK
        SET maxLen ← MAX(maxLen, right - left + 1)
    RETURN maxLen
```

---

## 5. Complexity Analysis

- **Time:** O(n·L) where L ≤ 10, effectively O(n).
- **Space:** O(F) for the forbidden set, where F is the number of forbidden strings.

---

## 6. Key Takeaway

> Exploit the short length of forbidden words. By scanning right‑to‑left and only checking up to 10 characters ahead, we efficiently maintain the longest valid window.
