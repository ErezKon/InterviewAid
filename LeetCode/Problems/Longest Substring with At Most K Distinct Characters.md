# 340. Longest Substring with At Most K Distinct Characters

**Difficulty:** 🟡 Medium
**Acceptance:** 49.0%
**LeetCode:** [https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters)
**Companies:** Amazon, Appdynamics, Apple, Bitgo, Coupang, Goldman Sachs, Google, Meta, Microsoft, Oracle, Tiktok, Yandex

---

## 1. Problem Description

Given a string `s` and an integer `k`, return the length of the longest substring that contains at most `k` distinct characters.

---

## 2. Approach: Sliding Window + Hash Map — O(n) ✅

```
FUNCTION lengthOfLongestSubstringKDistinct(s, k):
    IF k == 0: RETURN 0

    charCount = {}
    left = 0
    maxLen = 0

    FOR right ← 0 TO len(s) - 1:
        charCount[s[right]] += 1

        WHILE len(charCount) > k:
            charCount[s[left]] -= 1
            IF charCount[s[left]] == 0:
                DELETE charCount[s[left]]
            left += 1

        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(k) |

---

## Follow-Up

### Longest Substring Without Repeating Characters (LeetCode #3)?

Special case where k = number of distinct characters (each appears at most once). Same sliding window with a set.

### Longest Substring with At Most Two Distinct Characters (LeetCode #159)?

Special case where k = 2.

---

## Key Takeaway

> Sliding window + hash map for "at most k distinct" is a fundamental template. Expand right, shrink left when the constraint is violated, track maximum window size.
