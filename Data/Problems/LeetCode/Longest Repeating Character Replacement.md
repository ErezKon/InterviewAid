# 424. Longest Repeating Character Replacement

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/longest-repeating-character-replacement](https://leetcode.com/problems/longest-repeating-character-replacement)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Bytedance, Cred, Docusign, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Payu, Pocket Gems, Publicis Sapient, Servicenow, Tiktok, Uber, Uipath, Yahoo, Yandex, Zepto

---

## 1. Problem Description

You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.

Return *the length of the longest substring containing the same letter you can get after performing the above operations*.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of only uppercase English letters.
- `0 <= k <= s.length`

---

## 2. Approach: Sliding Window — O(n) ✅

```text
FUNCTION characterReplacement(s, k):
    count ← ARRAY[26] OF 0
    maxFreq ← 0
    left ← 0
    maxLen ← 0

    FOR right ← 0 TO LENGTH(s) - 1:
        idx ← ORD(s[right]) - ORD('A')
        count[idx] ← count[idx] + 1
        maxFreq ← MAX(maxFreq, count[idx])

        // Window is valid when we can replace at most k chars
        WHILE (right - left + 1) - maxFreq > k:
            leftIdx ← ORD(s[left]) - ORD('A')
            count[leftIdx] ← count[leftIdx] - 1
            left ← left + 1

        maxLen ← MAX(maxLen, right - left + 1)

    RETURN maxLen
```

---

## Examples

**Example 1:**
```
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
```

**Example 2:**
```
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
```

---

## Walkthrough

Consider `s = "AABABBA"`, `k = 1`.

1. Expand window to include first three characters `AAB` – `maxFreq = 2`, window size 3, valid.
2. Add fourth character `A` → window `AABA`, `maxFreq = 3`, still valid (size 4, replacements needed 1).
3. Add fifth character `B` → window `AABAB`, size 5, `maxFreq = 3`, replacements needed 2 > k, shrink left until valid.
4. Continue sliding; the maximum valid window size observed is 4.

---

## Complexity Analysis

- **Time:** O(n) – each character is visited at most twice (once by `right`, once by `left`).
- **Space:** O(1) – fixed array of 26 counters.

---

## Follow-Up Questions

1. How would the solution change if the alphabet size were not constant (e.g., Unicode characters)?
2. Can you adapt the algorithm to return the actual substring(s) achieving the maximum length?
3. What if replacements have different costs per character?

---

## Key Takeaway

> Sliding window where validity = `windowSize - maxFrequency ≤ k`. The trick is that `maxFreq` never needs to decrease when the window shrinks, providing an efficient upper bound.
