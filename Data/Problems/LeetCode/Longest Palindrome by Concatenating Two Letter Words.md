# 2131. Longest Palindrome by Concatenating Two Letter Words

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words](https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words)
**Companies:** Amazon, Bloomberg, Databricks, Google, Meta, Microsoft

---

## 1. Problem Description

Given an array of 2-letter words, find the longest palindrome that can be formed by concatenating some of them in any order. Each word can be used at most once.

---

## 2. Examples

**Example 1:**
```
Input: words = ["lc","cl","gg"]
Output: 6
Explanation: Concatenate "lc" + "gg" + "cl" to form "lcggcl", which is a palindrome of length 6.
```

**Example 2:**
```
Input: words = ["ab","ty","yt","lc","cl","ab"]
Output: 8
Explanation: Use "ab" + "lc" + "cl" + "ba" (where "ba" is the reverse of "ab") to get "ablcclba".
```

---

## 3. Approach: Counting Pairs — O(n) ✅

```text
FUNCTION longestPalindrome(words):
    SET count ← Counter(words)
    SET length ← 0
    SET hasCenter ← false

    FOR word, c IN count.items():
        SET rev ← REVERSE(word)
        IF word == rev:
            SET length ← length + (c // 2) * 4
            IF c % 2 == 1:
                SET hasCenter ← true
        ELSE IF word < rev AND rev IN count:
            SET length ← length + MIN(c, count[rev]) * 4

    IF hasCenter:
        SET length ← length + 2
    RETURN length
```

---

## 4. Walkthrough

**Example 1:** `words = ["lc","cl","gg"]`
| Step | word | count | Action | length | hasCenter |
|------|------|-------|--------|--------|-----------|
| 1 | "lc" | 1 | reverse = "cl" (exists) → add 4 | 4 | false |
| 2 | "cl" | 1 | already paired with "lc" (skip) | 4 | false |
| 3 | "gg" | 1 | palindrome word, c//2 = 0, odd → set hasCenter | 4 | true |
After loop, `hasCenter` true → add 2 → total length = 6.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) where n is number of words (single pass with hash map) | O(n) for the counter hashmap |

---

## 6. Follow-Up Questions

- How would the solution change if words could have length > 2?
- Can you extend the approach to return the actual palindrome string, not just its length?
- What if each word could be used multiple times?

---

## 7. Key Takeaway

> Palindromic words pair with themselves; non‑palindromic words pair with their reverse. One unpaired palindromic word can sit in the center (+2).