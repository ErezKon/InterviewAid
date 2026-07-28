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

## Examples

| cookies | k | Output | Explanation |
|---------|---|--------|-------------|
| [1,2,3,4,5,6] | 3 | 7 | One optimal distribution: child1→[6], child2→[5,1], child3→[4,3,2]; max = 7 |
| [8,15,10,20,8] | 2 | 31 | Distribute as [20,8] and [15,10,8]; max = 31 |

---

## Key Insight

> With n, k ≤ 8, use **backtracking**. Try assigning each bag to each child, pruning when the current max already exceeds the best answer found. Symmetric pruning: skip duplicate empty children.

---

## Approach: Backtracking with Pruning — O(k^n) ✅

```text
FUNCTION distributeCookies(cookies, k):
    SET children ← ARRAY of k zeros
    SET ans ← SUM(cookies)  // worst case

    FUNCTION backtrack(idx):
        IF idx == LENGTH(cookies):
            SET ans ← MIN(ans, MAX(children))
            RETURN
        SET seen ← SET()
        FOR i ← 0 TO k - 1:
            IF children[i] IN seen: CONTINUE
            IF children[i] + cookies[idx] >= ans: CONTINUE
            ADD children[i] TO seen
            SET children[i] ← children[i] + cookies[idx]
            CALL backtrack(idx + 1)
            SET children[i] ← children[i] - cookies[idx]

    CALL backtrack(0)
    RETURN ans
```

---

## Walkthrough

Consider `cookies = [1,2,3]`, `k = 2`.
1. Start with `children = [0,0]`, `ans = 6`.
2. Assign bag 1 to child0 → `children = [1,0]`.
3. Recurse: assign bag 2 to child0 → `children = [3,0]`.
4. Recurse: assign bag 3 to child0 → `children = [6,0]` → update `ans = 6`.
5. Backtrack, try bag 3 to child1 → `children = [3,3]` → `ans = 3` (better).
6. Continue exploring other assignments; final `ans = 3` which is optimal (distribution `[1,2]` and `[3]`).

---

## Complexity Analysis

- **Time:** O(k^n) worst‑case, dramatically reduced by pruning and symmetry breaking.
- **Space:** O(n) recursion stack plus O(k) for `children` array.

---

## Follow-Up Questions

- How would you adapt the solution if `n` could be up to 20? (Consider DP with state compression.)
- Can you design a greedy approximation when `k` is large?

---

## Key Takeaway

> **Small‑size combinatorial search:** backtrack over assignments, prune when current max ≥ best found, and skip identical empty children to avoid redundant work.