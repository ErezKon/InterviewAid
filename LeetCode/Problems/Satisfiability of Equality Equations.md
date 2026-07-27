# 990. Satisfiability of Equality Equations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/satisfiability-of-equality-equations](https://leetcode.com/problems/satisfiability-of-equality-equations)
**Companies:** Amazon, Clevertap, Google, Meta, Sumologic, Uipath

---

## Problem Description

Given string equations like `"a==b"`, `"b!=c"`, determine if all equations can be satisfied simultaneously.

---

## Key Insight

> Process equalities first (union connected variables), then check inequalities — if two variables that should be unequal are in the same connected component, it's unsatisfiable.

---

## Approach: Union-Find — O(n) ✅

```
FUNCTION equationsPossible(equations):
    uf = UnionFind(26)

    // First pass: union all equalities
    FOR eq IN equations:
        IF eq[1] == '=':
            uf.union(ord(eq[0]) - ord('a'), ord(eq[3]) - ord('a'))

    // Second pass: check inequalities
    FOR eq IN equations:
        IF eq[1] == '!':
            IF uf.find(ord(eq[0]) - ord('a')) == uf.find(ord(eq[3]) - ord('a')):
                RETURN false

    RETURN true
```
