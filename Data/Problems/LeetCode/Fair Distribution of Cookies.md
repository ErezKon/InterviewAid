# 2305. Fair Distribution of Cookies

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/fair-distribution-of-cookies](https://leetcode.com/problems/fair-distribution-of-cookies)
**Companies:** Amazon, Zoho

---

## Problem Description

You are given an integer array `cookies`, where `cookies[i]` denotes the number of cookies in the `i^th` bag. You are also given an integer `k` that denotes the number of children to distribute **all** the bags of cookies to. All the cookies in the same bag must go to the same child and cannot be split up.

The **unfairness** of a distribution is defined as the **maximum** **total** cookies obtained by a single child in the distribution.

Return *the **minimum** unfairness of all distributions*.

**Constraints:**

- `2 <= cookies.length <= 8`
- `1 <= cookies[i] <= 10^5`
- `2 <= k <= cookies.length`

---

## Examples

```
Example 1:
  Input: cookies = [8,15,10,20,8], k = 2
  Output: 31
  Explanation: One optimal distribution is [8,15,8] and [10,20]
  - The 1st child receives [8,15,8] which has a total of 8 + 15 + 8 = 31 cookies.
  - The 2nd child receives [10,20] which has a total of 10 + 20 = 30 cookies.
  The unfairness of the distribution is max(31,30) = 31.
  It can be shown that there is no distribution with an unfairness less than 31.
```

```
Example 2:
  Input: cookies = [6,1,3,2,2,4,1,2], k = 3
  Output: 7
  Explanation: One optimal distribution is [6,1], [3,2,2], and [4,1,2]
  - The 1st child receives [6,1] which has a total of 6 + 1 = 7 cookies.
  - The 2nd child receives [3,2,2] which has a total of 3 + 2 + 2 = 7 cookies.
  - The 3rd child receives [4,1,2] which has a total of 4 + 1 + 2 = 7 cookies.
  The unfairness of the distribution is max(7,7,7) = 7.
  It can be shown that there is no distribution with an unfairness less than 7.
```

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