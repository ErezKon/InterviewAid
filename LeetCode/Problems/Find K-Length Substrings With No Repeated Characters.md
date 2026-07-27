# 1100. Find K-Length Substrings With No Repeated Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters](https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters)
**Companies:** Amazon

---

## Problem Description

Count substrings of length `k` with all unique characters.

---

## Approach: Sliding Window — O(n) ✅

```
FUNCTION numKLenSubstrNoRepeats(s, k):
    IF k > 26: RETURN 0
    count = 0; freq = {}
    FOR i ← 0 TO len(s) - 1:
        freq[s[i]] = freq.get(s[i], 0) + 1
        IF i >= k:
            freq[s[i - k]] -= 1
            IF freq[s[i - k]] == 0: DELETE freq[s[i - k]]
        IF i >= k - 1 AND len(freq) == k:
            count += 1
    RETURN count
```

---

## Key Takeaway

> **Fixed-size sliding window with frequency map. Window has all unique chars iff distinct count == k.**
