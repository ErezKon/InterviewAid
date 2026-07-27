# 3669. Balanced K-Factor Decomposition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/balanced-k-factor-decomposition](https://leetcode.com/problems/balanced-k-factor-decomposition)
**Companies:** Amazon, Google

---

## 1. Problem Description

Given integers `n` and `k`, decompose `n` into `k` factors such that the ratio between the largest and smallest factor is minimized. Return the factors sorted.

---

## 2. Key Insight

> Find all factors of `n`, then use DFS/backtracking to find `k` factors whose product is `n` and whose max/min ratio is minimized. Prune branches where remaining product can't be split into enough factors.

---

## 3. Approach: Factor Enumeration + Backtracking ✅

```
FUNCTION balancedDecomposition(n, k):
    factors = sorted divisors of n
    best = None
    
    FUNCTION backtrack(remaining, k_left, min_factor, path):
        IF k_left == 1:
            IF remaining >= min_factor:
                candidate = path + [remaining]
                update best if ratio is smaller
            RETURN
        FOR f IN factors:
            IF f < min_factor: CONTINUE
            IF remaining % f != 0: CONTINUE
            IF f > remaining: BREAK
            backtrack(remaining / f, k_left - 1, f, path + [f])
    
    backtrack(n, k, 1, [])
    RETURN best
```

| Time | Space |
|------|-------|
| O(d(n)^k) worst case, pruned | O(k) recursion |

---

## Key Takeaway

> Factor decomposition problems use backtracking over divisors. Enforce non-decreasing order to avoid duplicates and use the target product constraint for aggressive pruning.
