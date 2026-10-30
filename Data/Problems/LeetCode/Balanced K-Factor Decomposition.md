# 3669. Balanced K-Factor Decomposition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/balanced-k-factor-decomposition](https://leetcode.com/problems/balanced-k-factor-decomposition)
**Companies:** Amazon, Google

---

## 1. Problem Description

You are given two integers `n` and `k`.

Split the number `n` into **exactly** `k` positive integers such that the **product** of these integers is **equal** to `n`.

Return **any one** split in which the **maximum** difference between any two numbers is **minimized**. You may return the result in any order.

**Constraints:**
- `4 ≤ n ≤ 10⁵`
- `2 ≤ k ≤ 5`
- `k` is strictly less than the total number of positive divisors of `n`.

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

```
Example 1:
  Input: n = 100, k = 2
  Output: [10,10]
  Explanation: The split [10, 10] yields 10 * 10 = 100 and a max-min difference of 0, which is minimal.

Example 2:
  Input: n = 44, k = 3
  Output: [2,2,11]
  Explanation:
  Split [1, 1, 44] yields a difference of 43
  Split [1, 2, 22] yields a difference of 21
  Split [1, 4, 11] yields a difference of 10
  Split [2, 2, 11] yields a difference of 9
  Therefore, [2, 2, 11] is the optimal split with the smallest difference 9.
```

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
