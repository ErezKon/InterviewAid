# 2900. Longest Unequal Adjacent Groups Subsequence I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-i](https://leetcode.com/problems/longest-unequal-adjacent-groups-subsequence-i)
**Companies:** Fourkites

---

## 1. Problem Description

Select the longest subsequence of words where no two adjacent words belong to the same group.

---

## 2. Approach: Greedy — O(n) ✅

```
FUNCTION getLongestSubsequence(words, groups):
    result = [words[0]]
    lastGroup = groups[0]
    FOR i ← 1 TO n - 1:
        IF groups[i] != lastGroup:
            result.ADD(words[i])
            lastGroup = groups[i]
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Greedily pick every word whose group differs from the last picked word. This always yields the longest valid subsequence.
