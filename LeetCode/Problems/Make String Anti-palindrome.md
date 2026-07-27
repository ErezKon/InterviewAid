# 3088. Make String Anti-palindrome

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/make-string-anti-palindrome](https://leetcode.com/problems/make-string-anti-palindrome)
**Companies:** Intuit

---

## 1. Problem Description

Rearrange characters so that for every `i`, `s[i] != s[n-1-i]`. Return the lexicographically smallest such string, or `""` if impossible.

---

## 2. Approach: Sort + Greedy Swap — O(n log n) ✅

```
// Sort the string
// If the middle half has too many of the same character, impossible
// Swap characters from the second half to ensure s[i] != s[n-1-i]
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Key Takeaway

> Sort for lex-smallest base. Check if the most frequent character exceeds n/2 (impossible case). Then greedily fix mirror conflicts by swapping from the sorted second half.
