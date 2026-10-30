# 2131. Longest Palindrome by Concatenating Two Letter Words

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words](https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words)
**Companies:** Amazon, Bloomberg, Databricks, Google, Meta, Microsoft

---

## 1. Problem Description

You are given an array of strings `words`. Each element of `words` consists of **two** lowercase English letters.

Create the **longest possible palindrome** by selecting some elements from `words` and concatenating them in **any order**. Each element can be selected **at most once**.

Return *the **length** of the longest palindrome that you can create*. If it is impossible to create any palindrome, return `0`.

A **palindrome** is a string that reads the same forward and backward.

**Constraints:**
- `1 <= words.length <= 10^5`
- `words[i].length == 2`
- `words[i]` consists of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: words = ["lc","cl","gg"]
Output: 6
Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", of length 6.
Note that "clgglc" is another longest palindrome that can be created.
```

**Example 2:**
```
Input: words = ["ab","ty","yt","lc","cl","ab"]
Output: 8
Explanation: One longest palindrome is "ty" + "lc" + "cl" + "yt" = "tylcclyt", of length 8.
Note that "lcyttycl" is another longest palindrome that can be created.
```

**Example 3:**
```
Input: words = ["cc","ll","xx"]
Output: 2
Explanation: One longest palindrome is "cc", of length 2.
Note that "ll" is another longest palindrome that can be created, and so is "xx".
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