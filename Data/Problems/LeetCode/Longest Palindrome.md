# 409. Longest Palindrome

**Difficulty:** 🟢 Easy
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/longest-palindrome](https://leetcode.com/problems/longest-palindrome)
**Companies:** Accenture, Amazon, Bloomberg, Google, Hp, Meta, Microsoft, Tcs, Ubisoft

---

## 1. Problem Description

Given a string `s` consisting of lowercase and uppercase letters, determine the maximum length of a palindrome that can be constructed using the characters of `s`. Each character can be used at most as many times as it appears.

---

## 2. Examples

**Example 1:**
```
Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", length 7.
```

**Example 2:**
```
Input: s = "a"
Output: 1
Explanation: The single character itself is a palindrome.
```

---

## 3. Approach: Frequency Count — O(n) ✅

```text
FUNCTION longestPalindrome(s):
    SET freqMap ← empty hashmap
    FOR ch IN s:
        INCREMENT freqMap[ch]
    SET length ← 0
    SET hasOdd ← false
    FOR count IN freqMap.values():
        SET length ← length + (count // 2) * 2   // use even part
        IF count % 2 == 1:
            SET hasOdd ← true
    IF hasOdd:
        SET length ← length + 1
    RETURN length
```

---

## 4. Walkthrough

**Example:** `s = "abccccdd"`
| Character | Count | Even part added | Odd flag |
|-----------|-------|----------------|----------|
| a | 1 | 0 | true |
| b | 1 | 0 | true |
| c | 4 | 4 | false |
| d | 2 | 2 | false |
Sum of even parts = 6, an odd character exists → add 1 → total = 7.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) where n = |s| | O(1) (hashmap of at most 52 letters) |

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return the actual palindrome string, not just its length?
- What if the input could contain Unicode characters beyond English letters?
- Can the solution be adapted to handle case‑insensitive counting?

---

## Key Takeaway

> Use all even‑count characters and the even part of odd‑count characters; at most one odd character can occupy the center of the palindrome.
