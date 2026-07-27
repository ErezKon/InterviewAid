# 779. K-th Symbol in Grammar

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-th-symbol-in-grammar](https://leetcode.com/problems/k-th-symbol-in-grammar)
**Companies:** Amazon, Bloomberg, De Shaw, Goldman Sachs, Google, Meta, Microsoft

---

## 1. Problem Description

Row 1: "0". Each subsequent row replaces 0→"01" and 1→"10". Return the k-th symbol in row n.

---

## 2. Key Insight

The k-th symbol in row n depends on the `⌈k/2⌉`-th symbol in row n-1. If k is odd, same as parent; if k is even, flipped. Recurse up to row 1.

---

## 3. Approach: Recursion — O(n) ✅

```
FUNCTION kthGrammar(n, k):
    IF n == 1: RETURN 0
    parent = kthGrammar(n - 1, (k + 1) / 2)
    IF k % 2 == 1: RETURN parent
    RETURN 1 - parent
```

| Time | Space |
|------|-------|
| O(n) | O(n) recursion stack |

---

## 4. Key Takeaway

> Each position's value is determined by its parent in the previous row and whether it's a left (odd) or right (even) child. Alternatively, count set bits in `k-1`: even → 0, odd → 1.
