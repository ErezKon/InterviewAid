# 3752. Lexicographically Smallest Negated Permutation that Sums to Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-negated-permutation-that-sums-to-target](https://leetcode.com/problems/lexicographically-smallest-negated-permutation-that-sums-to-target)
**Companies:** Amazon

---

## 1. Problem Description

Find the lexicographically smallest permutation of `[1..n]` where you can negate some elements, such that the sum equals `target`.

---

## 2. Approach: Greedy + Subset Sum ✅

```
// Total sum of [1..n] = n*(n+1)/2
// Need to negate a subset with sum S where: total - 2*S = target
// S = (total - target) / 2 → standard subset sum
// Greedily negate largest elements first for lex-smallest result
```

| Time | Space |
|------|-------|
| O(n · S) | O(S) |

---

## 3. Key Takeaway

> Reduce to subset sum: find subset summing to `(total - target) / 2`. Negate those elements. For lex-smallest, prefer negating larger numbers.
