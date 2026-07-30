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

```text
FUNCTION equationsPossible(equations):
    uf ← UnionFind(26)
    // First pass: union all equalities
    FOR eq IN equations:
        IF eq[1] == '=':
            SET a ← ord(eq[0]) - ord('a')
            SET b ← ord(eq[3]) - ord('a')
            uf.union(a, b)
    // Second pass: check inequalities
    FOR eq IN equations:
        IF eq[1] == '!':
            SET a ← ord(eq[0]) - ord('a')
            SET b ← ord(eq[3]) - ord('a')
            IF uf.find(a) == uf.find(b):
                RETURN false
    RETURN true
```

---

## Examples

**Example 1:**
```
Input: ["a==b","b==c","a==c"]
Output: true
Explanation: All variables can be assigned the same value.
```

**Example 2:**
```
Input: ["a==b","b!=a"]
Output: false
Explanation: `a` and `b` are forced to be equal and unequal simultaneously.
```

---

## Walkthrough

1. **First pass (equalities)** – Union the pairs `a` and `b`, then `b` and `c`, resulting in one set `{a,b,c}`.
2. **Second pass (inequalities)** – Encounter `a!=b`; both belong to the same set, so return `false`.

---

## Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(N) – two linear scans of the equations |
| Space  | O(1) – Union‑Find for 26 letters (constant extra space) |

---

## Follow-Up Questions

1. How would you extend this to handle equations with more than two variables per statement?
2. Can you solve the problem without Union‑Find, using graph connectivity?
3. What changes are needed if the variable set is larger than 26 letters?

---

## Key Takeaway

> Union‑Find efficiently groups equal variables, allowing a quick check that no inequality contradicts those groups.
