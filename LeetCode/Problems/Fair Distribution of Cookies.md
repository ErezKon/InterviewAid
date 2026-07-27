# 2305. Fair Distribution of Cookies

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fair-distribution-of-cookies](https://leetcode.com/problems/fair-distribution-of-cookies)
**Companies:** Amazon, Zoho

---

## Problem Description

Distribute `n` bags of cookies among `k` children. Each bag goes to exactly one child. Minimize the **maximum total cookies** any single child receives (the "unfairness").

**Constraints:**
- `2 <= k <= 8`
- `k <= n <= 8`

---

## Key Insight

> With n, k ≤ 8, use **backtracking**. Try assigning each bag to each child, pruning when the current max already exceeds the best answer found. Symmetric pruning: skip duplicate empty children.

---

## Approach: Backtracking with Pruning — O(k^n) ✅

```
FUNCTION distributeCookies(cookies, k):
    children = [0] * k
    ans = SUM(cookies)  // worst case: one child gets all

    FUNCTION backtrack(idx):
        IF idx == len(cookies):
            ans = MIN(ans, MAX(children))
            RETURN
        seen = SET()  // avoid duplicate states for same-valued children
        FOR i ← 0 TO k - 1:
            IF children[i] IN seen: CONTINUE
            IF children[i] + cookies[idx] >= ans: CONTINUE  // prune
            seen.ADD(children[i])
            children[i] += cookies[idx]
            backtrack(idx + 1)
            children[i] -= cookies[idx]

    backtrack(0)
    RETURN ans
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(k^n) worst case, much less with pruning |
| **Space** | O(n) — recursion depth |

---

## Key Takeaway

> **Small constraints (n,k ≤ 8) → backtracking with pruning. Key optimizations: skip children with same current total (symmetry breaking) and prune if already exceeding best answer.**
