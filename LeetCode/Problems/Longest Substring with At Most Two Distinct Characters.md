# 159. Longest Substring with At Most Two Distinct Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters)
**Companies:** Amazon, Google, Meta, Microsoft, Tiktok

---

## 1. Problem Description

Find the longest substring containing at most 2 distinct characters.

---

## 2. Approach: Sliding Window — O(n) ✅

Special case of At Most K Distinct Characters (#340) with k=2.

```
FUNCTION lengthOfLongestSubstringTwoDistinct(s):
    count = {}
    left = 0
    maxLen = 0

    FOR right ← 0 TO len(s) - 1:
        count[s[right]] = count.get(s[right], 0) + 1

        WHILE len(count) > 2:
            count[s[left]] -= 1
            IF count[s[left]] == 0:
                DELETE count[s[left]]
            left += 1

        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Classic sliding window with a hash map tracking character counts. Shrink left when distinct count exceeds 2. Generalizes to k distinct characters.
