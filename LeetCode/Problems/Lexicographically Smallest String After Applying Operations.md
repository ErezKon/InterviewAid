# 1625. Lexicographically Smallest String After Applying Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations](https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations)
**Companies:** Amazon, Jpmorgan

---

## 1. Problem Description

Given a numeric string, you can: (1) add `a` to all odd-index digits, or (2) rotate the string right by `b` positions. Find the lex-smallest string achievable.

---

## 2. Approach: BFS / Enumerate States ✅

```
FUNCTION findLexSmallestString(s, a, b):
    visited = SET(); queue = [s]; best = s
    WHILE queue:
        curr = queue.DEQUEUE()
        IF curr IN visited: CONTINUE
        visited.ADD(curr)
        best = MIN(best, curr)
        // Operation 1: add a to odd indices
        // Operation 2: rotate by b
        queue.ENQUEUE(addOp(curr, a))
        queue.ENQUEUE(rotateOp(curr, b))
    RETURN best
```

| Time | Space |
|------|-------|
| O(10 · n/gcd(n,b) · 10) states | O(states) |

---

## 3. Key Takeaway

> BFS over all reachable states (add + rotate). The state space is bounded because digits cycle mod 10 and rotation positions cycle mod n.
