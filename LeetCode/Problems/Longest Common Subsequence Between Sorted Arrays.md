# 1940. Longest Common Subsequence Between Sorted Arrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-common-subsequence-between-sorted-arrays](https://leetcode.com/problems/longest-common-subsequence-between-sorted-arrays)
**Companies:** Google

---

## 1. Problem Description

Given multiple sorted arrays, find the longest common subsequence across all of them.

---

## 2. Approach: Count Intersection — O(n·L) ✅

Since arrays are sorted, common elements appear in all arrays. Count occurrences across arrays.

```
FUNCTION longestCommonSubseq(arrays):
    count = Counter()
    FOR arr IN arrays:
        FOR num IN arr:
            count[num] += 1
    RETURN sorted [num for num in count if count[num] == len(arrays)]
```

| Time | Space |
|------|-------|
| O(total elements) | O(total elements) |

---

## 3. Key Takeaway

> Since arrays are sorted and contain distinct elements, the common subsequence is exactly the set intersection. Elements in all arrays form the answer (sorted order preserved).
