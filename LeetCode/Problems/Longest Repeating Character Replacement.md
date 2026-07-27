# 424. Longest Repeating Character Replacement

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/longest-repeating-character-replacement](https://leetcode.com/problems/longest-repeating-character-replacement)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Bytedance, Cred, Docusign, Flipkart, Goldman Sachs, Google, Meta, Microsoft, Payu, Pocket Gems, Publicis Sapient, Servicenow, Tiktok, Uber, Uipath, Yahoo, Yandex, Zepto

---

## 1. Problem Description

Given a string `s` and integer `k`, you can replace at most `k` characters. Return the length of the longest substring containing the same letter after replacements.

---

## 2. Approach: Sliding Window — O(n) ✅

```
FUNCTION characterReplacement(s, k):
    count = array of 26 zeros
    maxFreq = 0
    left = 0
    maxLen = 0

    FOR right ← 0 TO n - 1:
        count[s[right]] += 1
        maxFreq = MAX(maxFreq, count[s[right]])

        // Window is valid if: windowSize - maxFreq <= k
        // i.e., characters to replace ≤ k
        WHILE (right - left + 1) - maxFreq > k:
            count[s[left]] -= 1
            left += 1

        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

### Key Insight

The window is valid when `windowSize - maxFreq ≤ k` (we need to replace at most k characters). `maxFreq` only ever increases, which is fine — it gives a valid upper bound.

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Sliding window where validity = `windowSize - maxFrequency ≤ k`. The trick is that `maxFreq` doesn't need to decrease when the window shrinks — the window size can only increase when a higher frequency is found.
