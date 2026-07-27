# 1147. Longest Chunked Palindrome Decomposition

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-chunked-palindrome-decomposition](https://leetcode.com/problems/longest-chunked-palindrome-decomposition)
**Companies:** Google

---

## 1. Problem Description

Split string into the maximum number of chunks `k₁, k₂, ..., kₘ` such that `kᵢ == kₘ₋ᵢ₊₁` (palindrome of chunks).

---

## 2. Approach: Greedy Two Pointers — O(n) ✅

```
FUNCTION longestDecomposition(text):
    count = 0; lo = 0; hi = len(text) - 1
    leftChunk = ""; rightChunk = ""
    WHILE lo < hi:
        leftChunk += text[lo]; rightChunk = text[hi] + rightChunk
        IF leftChunk == rightChunk:
            count += 2
            leftChunk = ""; rightChunk = ""
        lo += 1; hi -= 1
    IF lo == hi OR leftChunk: count += 1
    RETURN count
```

| Time | Space |
|------|-------|
| O(n²) naive, O(n) with rolling hash | O(n) |

---

## 3. Key Takeaway

> Greedily match the shortest possible equal prefix and suffix chunks. This maximizes the number of chunks. Rolling hash avoids O(n) string comparison per match.
