# 2014. Longest Subsequence Repeated k Times

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Google, Meta

---

## 1. Problem Description

Find the longest subsequence of `s` that can be repeated `k` times and still be a subsequence of `s`.

---

## 2. Approach: BFS on Candidates — O(26^(n/k)) ✅

```
// Only characters appearing ≥ k times can be in the answer
// BFS/DFS on candidate subsequences (length-first)
// For each candidate, check if candidate * k is a subsequence of s
// Return the lexicographically largest longest candidate
```

| Time | Space |
|------|-------|
| O(26^(n/k) · n) worst case, practical pruning makes it fast | O(n) |

---

## 3. Key Takeaway

> The answer length is at most n/k (≤ 7 for typical constraints). Prune characters with count < k, then BFS over candidates by length. Check each by verifying `candidate * k` is a subsequence.
