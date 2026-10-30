# 2414. Length of the Longest Alphabetical Continuous Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/length-of-the-longest-alphabetical-continuous-substring](https://leetcode.com/problems/length-of-the-longest-alphabetical-continuous-substring)
**Companies:** Amazon, Tiktok

---

## 1. Problem Description

An **alphabetical continuous string** is a string consisting of consecutive letters in the alphabet. In other words, it is any substring of the string `"abcdefghijklmnopqrstuvwxyz"`.

- For example, `"abc"` is an alphabetical continuous string, while `"acb"` and `"za"` are not.

Given a string `s` consisting of lowercase letters only, return the *length of the **longest** alphabetical continuous substring.*

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of only English lowercase letters.

---

## 2. Examples

```
Example 1:
  Input: s = "abacaba"
  Output: 2
  Explanation: There are 4 distinct continuous substrings: "a", "b", "c" and "ab".
  "ab" is the longest continuous substring.
```

```
Example 2:
  Input: s = "abcde"
  Output: 5
  Explanation: "abcde" is the longest continuous substring.
```

---

## 3. Approach: Linear Scan — O(n) ✅

```text
FUNCTION longestContinuousSubstring(s):
    SET maxLen ← 1
    SET curr ← 1
    FOR i ← 1 TO LENGTH(s) - 1:
        IF ORD(s[i]) == ORD(s[i-1]) + 1:
            SET curr ← curr + 1
            SET maxLen ← MAX(maxLen, curr)
        ELSE:
            SET curr ← 1
    RETURN maxLen
```

---

## 4. Walkthrough

| Index | Char | curr | maxLen | Action |
|-------|------|------|--------|--------|
| 0 | a | 1 | 1 | start |
| 1 | b | 2 | 2 | b follows a → increment |
| 2 | c | 3 | 3 | c follows b → increment |
| 3 | z | 1 | 3 | break, reset |
| 4 | a | 2 | 3 | a follows z? no, reset then start new |
| ... | ... | ... | ... | ... |

The algorithm maintains a running streak (`curr`). When the alphabetical order breaks, `curr` resets to 1. `maxLen` records the longest streak seen.

---

## 5. Complexity Analysis

- **Time:** O(n) – each character visited once.
- **Space:** O(1) – only constant extra variables.

---

## 3. Key Takeaway

> Track current streak of consecutive letters. Reset when the chain breaks. Classic single-pass counting.
