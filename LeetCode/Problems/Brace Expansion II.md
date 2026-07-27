# 1096. Brace Expansion II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/brace-expansion-ii](https://leetcode.com/problems/brace-expansion-ii)
**Companies:** Google

---

## 1. Problem Description

Given a brace expression like `"{a,b}{c,{d,e}}"`, expand it into a sorted list of unique strings. Braces denote union (comma-separated) and concatenation (adjacent groups).

---

## 2. Key Insight

> Parse the expression recursively. At each level, maintain a **product** (concatenation) and a **union** (comma-separated alternatives). Use sets to avoid duplicates.

---

## 3. Approach: Recursive Parsing — O(output size) ✅

```
FUNCTION braceExpansionII(expression):
    FUNCTION parse(expr, i):
        groups = [[""]]  // list of union groups, each a set of strings
        WHILE i < len(expr) AND expr[i] != '}':
            IF expr[i] == '{':
                sub, i = parse(expr, i + 1)  // recurse
                // concatenate sub with current group
                groups[-1] = [a + b for a in groups[-1] for b in sub]
            ELSE IF expr[i] == ',':
                groups.ADD([""])  // new union branch
                i += 1
            ELSE:
                // letter: concatenate to current group
                groups[-1] = [s + expr[i] for s in groups[-1]]
                i += 1
        RETURN UNION of all groups, i + 1
    
    result = parse(expression, 0)
    RETURN SORTED(result)
```

| Time | Space |
|------|-------|
| O(output size × depth) | O(output size) |

---

## Key Takeaway

> Brace expansion is a grammar problem: parse with recursion handling `{` (recurse), `,` (union), `}` (return), and letters (concatenate). Use sets for dedup, sort at the end.
