# 3669. Balanced K-Factor Decomposition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/balanced-k-factor-decomposition](https://leetcode.com/problems/balanced-k-factor-decomposition)
**Companies:** Amazon, Google

---

## 1. Problem Description

Given integers `n` and `k`, decompose `n` into exactly `k` positive integer factors (not necessarily distinct) such that the ratio between the largest and smallest factor is minimized. Return the factors in non‑decreasing order.

---

## 2. Key Insight

> Enumerate all divisors of `n` and use backtracking to pick `k` factors in non‑decreasing order. Prune when the remaining product cannot be split into the required number of factors or when the current ratio already exceeds the best found.

---

## 3. Approach: Factor Enumeration + Backtracking — ✅

```text
FUNCTION balancedDecomposition(n, k):
    // Gather all divisors of n and sort them
    SET divisors ← SORT(all divisors of n)
    SET bestRatio ← INFINITY
    SET bestFactors ← []
    
    FUNCTION backtrack(remaining, kLeft, minFactor, path):
        // remaining: product still to factor
        // kLeft: how many factors still needed
        // minFactor: smallest factor allowed for non‑decreasing order
        IF kLeft == 1:
            IF remaining >= minFactor:
                SET candidate ← path + [remaining]
                SET ratio ← candidate[-1] / candidate[0]
                IF ratio < bestRatio:
                    bestRatio ← ratio
                    bestFactors ← candidate
            RETURN
        FOR f IN divisors:
            IF f < minFactor: CONTINUE
            IF remaining % f != 0: CONTINUE
            // Prune: even if we use the smallest possible remaining factors, product may be too large
            backtrack(remaining / f, kLeft - 1, f, path + [f])
    
    backtrack(n, k, 1, [])
    RETURN bestFactors
```

---

## 4. Examples

| n | k | Output | Explanation |
|---|---|--------|-------------|
| 12 | 3 | `[2,2,3]` | Factors `2·2·3 = 12`; max/min = 3/2 = 1.5, which is minimal. |
| 100 | 2 | `[10,10]` | Two equal factors give ratio 1, the smallest possible. |
| 30 | 4 | `[1,2,3,5]` | Product `1·2·3·5 = 30`; ratio `5/1 = 5`. No other 4‑factor decomposition yields a smaller ratio.

---

## 5. Walkthrough

Consider `n = 12`, `k = 3`.

1. **Divisors** of 12 → `[1,2,3,4,6,12]`.
2. **First level**: pick `f = 1` → recurse with `remaining = 12`, `kLeft = 2`, `minFactor = 1`.
3. **Second level**: pick `f = 2` → recurse with `remaining = 6`, `kLeft = 1`, `minFactor = 2`.
4. **Base case**: `remaining = 6` ≥ `minFactor`. Candidate `[1,2,6]` → ratio `6/1 = 6`.
5. Backtrack, try `f = 3` at second level → candidate `[1,3,4]` → ratio `4/1 = 4`.
6. Backtrack to first level, pick `f = 2` → recurse with `remaining = 6`, `kLeft = 2`, `minFactor = 2`.
7. Second level pick `f = 2` → base case candidate `[2,2,3]` → ratio `3/2 = 1.5` (best so far).
8. All branches explored; algorithm returns `[2,2,3]`.

---

## 6. Complexity Analysis

- **Time:** Enumerating divisors is `O(√n)`. Backtracking explores combinations of up to `k` factors; worst‑case `O(d(n)^k)` where `d(n)` is the number of divisors, but pruning reduces practical runtime.
- **Space:** `O(k)` recursion stack plus storage for divisor list `O(d(n))`.

---

## 7. Follow‑Up Questions

1. How would you modify the algorithm to return *all* optimal decompositions?
2. Can the problem be solved in polynomial time for fixed `k` using dynamic programming?
3. How would you handle very large `n` where enumerating all divisors is expensive?

---

## Key Takeaway

> Enumerate divisors and backtrack with non‑decreasing order, pruning aggressively on the remaining product and current ratio, to find the factor set that minimizes the max/min ratio.
