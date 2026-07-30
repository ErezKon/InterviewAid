# 1625. Lexicographically Smallest String After Applying Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations](https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations)
**Companies:** Amazon, Jpmorgan

---

## 1. Problem Description

Given a numeric string, you can: (1) add `a` to all odd-index digits, or (2) rotate the string right by `b` positions. Find the lexicographically smallest string achievable.

---

## 2. Approach: BFS / Enumerate States — O(n·states) ✅

```text
FUNCTION findLexSmallestString(s, a, b):
    visited ← SET()
    queue ← [s]
    best ← s
    WHILE queue NOT EMPTY:
        curr ← queue.DEQUEUE()
        IF curr IN visited: CONTINUE
        visited.ADD(curr)
        best ← MIN(best, curr)
        // Operation 1: add a to odd indices
        op1 ← ADD_A_TO_ODD(curr, a)
        // Operation 2: rotate by b
        op2 ← ROTATE_RIGHT(curr, b)
        queue.ENQUEUE(op1)
        queue.ENQUEUE(op2)
    RETURN best
```

---

## 3. Examples

| Input | Output |
|-------|--------|
| `"1234567", a = 5, b = 2` | `"0234567"` |
| `"111111", a = 1, b = 2` | `"111111"` |

*Explanation*: BFS explores all reachable strings; the smallest encountered is returned.

---

## 4. Walkthrough

Take `s = "1234567"`, `a = 5`, `b = 2`.

1. Start with `"1234567"` (best = `"1234567"`).
2. Apply operation 1 → add 5 to odd indices (1‑based): positions 1,3,5,7 become `6,8,0,2` → `"6284502"`.
3. Apply operation 2 → rotate right by 2 → `"6712345"`.
4. Continue expanding each new string; the smallest string encountered is `"0234567"`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(10·n/gcd(n,b)·10) states | O(states) |

---

## 6. Follow-Up Questions

1. How would the solution change if the addition operation applied to even indices instead?
2. Can you prove the state space is bounded by `10 * n / gcd(n, b)`?
3. What if the rotation could be left or right?

---

## Key Takeaway

> BFS over all reachable states (add + rotate) efficiently finds the lexicographically smallest string because the state space is limited by digit cycles and rotation periodicity.
