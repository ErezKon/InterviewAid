# 2068. Check Whether Two Strings are Almost Equivalent

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-whether-two-strings-are-almost-equivalent](https://leetcode.com/problems/check-whether-two-strings-are-almost-equivalent)
**Companies:** Salesforce

---

## 1. Problem Description

Two strings are "almost equivalent" if the frequency difference of every character between them is at most 3. Return true if so.

---

## 2. Approach: Frequency Count — O(n) ✅

```
FUNCTION checkAlmostEquivalent(word1, word2):
    freq = [0] * 26
    FOR ch IN word1: freq[ord(ch) - ord('a')] += 1
    FOR ch IN word2: freq[ord(ch) - ord('a')] -= 1
    RETURN all(ABS(f) <= 3 for f in freq)
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Count frequency differences. If all are within threshold, strings are "almost equivalent". Standard character frequency pattern.
