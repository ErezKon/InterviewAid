# 2414. Length of the Longest Alphabetical Continuous Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/length-of-the-longest-alphabetical-continuous-substring](https://leetcode.com/problems/length-of-the-longest-alphabetical-continuous-substring)
**Companies:** Amazon, Tiktok

---

## 1. Problem Description

Find the longest substring of consecutive alphabetical characters (e.g., "abc", "xyz").

---

## 2. Examples

**Example 1:**
```
Input: s = "abczabc"
Output: 3
Explanation: The longest alphabetical continuous substrings are "abc" and "xyz" (if present). The length is 3.
```

**Example 2:**
```
Input: s = "a"
Output: 1
Explanation: Single character is trivially a continuous alphabetical substring.
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
