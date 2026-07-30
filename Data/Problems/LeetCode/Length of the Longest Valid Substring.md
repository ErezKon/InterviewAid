# 2781. Length of the Longest Valid Substring

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google, Meta

---

## 1. Problem Description

Given a string and a list of forbidden substrings (each ≤ 10 chars), find the longest substring containing no forbidden word.

---

## 2. Examples

**Example 1:**
```
Input: word = "abcde", forbidden = ["ab", "cd"]
Output: 2
Explanation: The longest valid substrings are "c" and "e" with length 2.
```

**Example 2:**
```
Input: word = "aaaa", forbidden = ["aa"]
Output: 1
Explanation: Any longer substring contains "aa". The maximum length is 1.
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
