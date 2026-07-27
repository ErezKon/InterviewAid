# 395. Longest Substring with At Least K Repeating Characters

**Difficulty:** 🟡 Medium
**Acceptance:** 44.0%
**LeetCode:** [https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters)
**Companies:** Amazon, Baidu, Bloomberg, Google, Meta, Microsoft, Tiktok, Walmart Labs, Yandex

---

## 1. Problem Description

Given a string `s` and integer `k`, return the length of the longest substring where every character appears at least `k` times.

---

## 2. Approach: Divide and Conquer — O(26·n) ✅

Any character with count < k cannot be in the answer. Split on such characters and recurse.

```
FUNCTION longestSubstring(s, k):
    IF len(s) < k: RETURN 0

    count = frequency of s
    FOR char IN s:
        IF count[char] < k:
            // Split on this character
            RETURN MAX(longestSubstring(part, k) for part in s.SPLIT(char))

    RETURN len(s)    // all characters appear ≥ k times
```

### Approach 2: Sliding Window with Unique Chars

Fix the number of unique characters (1 to 26), then sliding window.

| Approach | Time | Space |
|----------|------|-------|
| **Divide & Conquer** | O(26·n) | O(26·n) stack |
| Sliding Window | O(26·n) | O(1) |

---

## Key Takeaway

> Characters with frequency < k act as "walls" — the answer cannot cross them. Split on these characters and recurse on each segment.
