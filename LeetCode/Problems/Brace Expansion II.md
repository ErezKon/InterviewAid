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

```text
FUNCTION braceExpansionII(expression):
    FUNCTION parse(expr, i):
        // groups holds each union branch as a list of strings
        groups ← [[""]]
        WHILE i < LEN(expr) AND expr[i] != '}':
            IF expr[i] == '{':
                sub, i ← parse(expr, i + 1)
                // concatenate each string in current branch with every string in sub
                groups[-1] ← [a + b FOR a IN groups[-1] FOR b IN sub]
            ELSE IF expr[i] == ',':
                // start a new union branch
                groups.APPEND([""])
                i ← i + 1
            ELSE:
                // literal character, concatenate to current branch
                groups[-1] ← [s + expr[i] FOR s IN groups[-1]]
                i ← i + 1
        RETURN UNION of all groups, i + 1
    
    result ← parse(expression, 0)
    RETURN SORTED(result)
```

---

## 4. Examples

| Input | Output |
|-------|--------|
| `{a,b}{c,{d,e}}` | `["ac","ad","ae","bc","bd","be"]` |
| `{{a,b},{c,d}}` | `["a","b","c","d"]` |

---

## 5. Walkthrough

Consider the expression `{a,b}{c,{d,e}}`.
1. Parse outer level: encounter `{` → recurse.
2. Inside first braces `a,b` → union branch produces `['a','b']`.
3. After closing `}` we have current groups `[['a','b']]`.
4. Next character is `{` again → recurse for `c,{d,e}`.
5. Inside second braces: start with `['']`.
   - Read `c` → `['c']`.
   - Encounter `,` → start new branch `['']`.
   - Read `{d,e}` → recurse → `['d','e']`.
   - Concatenate with current branch → `['d','e']`.
   - Union of branches → `['c','d','e']`.
6. Concatenate first union `['a','b']` with second union `['c','d','e']` → `['ac','ad','ae','bc','bd','be']`.
7. Sort the list → final output.

---

## 6. Complexity Analysis

- **Time:** Proportional to the total size of the output strings, i.e., O(total characters produced). Each character is processed once during parsing.
- **Space:** Stores intermediate sets of strings; worst‑case O(total output size).

---

## 7. Follow‑Up Questions

- How would you modify the algorithm to handle escaped braces or nested commas?
- Can you generate the output lazily without storing all strings at once?
- Extend to support range expressions like `{1..3}`.

---

## Key Takeaway

> Brace expansion is a grammar problem: parse with recursion handling `{` (recurse), `,` (union), `}` (return), and letters (concatenate). Use sets for dedup, sort at the end.
