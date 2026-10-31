# 990. Satisfiability of Equality Equations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/satisfiability-of-equality-equations](https://leetcode.com/problems/satisfiability-of-equality-equations)
**Companies:** Amazon, Clevertap, Google, Meta, Sumologic, Uipath

---

## Problem Description

You are given an array of strings `equations` that represent relationships between variables where each string `equations[i]` is of length `4` and takes one of two different forms: `"xi==yi"` or `"xi!=yi"`. Here, `xi` and `yi` are lowercase letters (not necessarily different) that represent one-letter variable names.

Return `true` *if it is possible to assign integers to variable names so as to satisfy all the given equations, or* `false` *otherwise*.

**Constraints:**

- `1 <= equations.length <= 500`
- `equations[i].length == 4`
- `equations[i][0]` is a lowercase letter.
- `equations[i][1]` is either `'='` or `'!'`.
- `equations[i][2]` is `'='`.
- `equations[i][3]` is a lowercase letter.

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

```
Example 1:
  Input: equations = ["a==b","b!=a"]
  Output: false
  Explanation: If we assign say, a = 1 and b = 1, then the first equation is satisfied, but not the second.
  There is no way to assign the variables to satisfy both equations.
```

```
Example 2:
  Input: equations = ["b==a","a==b"]
  Output: true
  Explanation: We could assign a = 1 and b = 1 to satisfy both equations.
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
| Space  | O(1) – Union-Find for 26 letters (constant extra space) |

---

## Follow-Up Questions

1. How would you extend this to handle equations with more than two variables per statement?
2. Can you solve the problem without Union-Find, using graph connectivity?
3. What changes are needed if the variable set is larger than 26 letters?

---

## Key Takeaway

> Union-Find efficiently groups equal variables, allowing a quick check that no inequality contradicts those groups.
