# 1153. String Transforms Into Another String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/string-transforms-into-another-string](https://leetcode.com/problems/string-transforms-into-another-string)
**Companies:** Google

---

## Problem Description
You are given two strings `s` and `t` of equal length consisting of lowercase English letters. In one operation you may choose a character `c` that appears in `s` and replace **all** its occurrences with any other lowercase letter `d` (`c ≠ d`). You may perform any number of operations. Determine whether it is possible to transform `s` into `t`.

## Examples
- **Input:** `s = "ab", t = "ba"` **Output:** `true`
  // Use a temporary character, e.g., replace `a`→`c`, then `b`→`a`, then `c`→`b`.
- **Input:** `s = "aabcc", t = "ccdee"` **Output:** `false`
  // No unused character to break the cycle `a→c→e→a`.
- **Input:** `s = "leetcode", t = "codeleet"` **Output:** `true`

## Approach
**Algorithm:** Build a directed graph of character dependencies and check for cycles, using an extra unused character as a buffer.
- **Insight 1:** For each position `i`, if `s[i] ≠ t[i]` we need to eventually change `s[i]` into `t[i]`. This creates a directed edge `s[i] → t[i]`.
- **Insight 2:** The transformation is possible iff the graph has no cycles **or** there exists at least one unused character (a letter not appearing in `s`) that can serve as a temporary placeholder to break cycles.
- **Steps:**
  1. Record all distinct letters present in `s`.
  2. Build adjacency sets for edges `src → dst` where `src ≠ dst`.
  3. Detect cycles via DFS (or Kahn's topological sort).
  4. If a cycle exists and there is no unused letter, return `false`; otherwise `true`.

### Pseudocode
```text
FUNCTION canConvert(s, t):
    IF LENGTH(s) ≠ LENGTH(t): RETURN false
    CREATE set usedLetters ← letters in s
    CREATE adjacency map graph
    FOR i ← 0 TO LENGTH(s)-1:
        IF s[i] = t[i]: CONTINUE
        ADD edge s[i] → t[i] TO graph
    // Cycle detection
    CREATE visited map, recursionStack map
    FUNCTION dfs(node):
        visited[node] ← true
        recursionStack[node] ← true
        FOR neighbor IN graph[node]:
            IF NOT visited[neighbor]:
                IF dfs(neighbor): RETURN true
            ELSE IF recursionStack[neighbor]:
                RETURN true   // cycle found
        recursionStack[node] ← false
        RETURN false
    FOR each node IN graph keys:
        IF NOT visited[node]:
            IF dfs(node):
                // Cycle detected
                IF SIZE(usedLetters) = 26:   // no spare character
                    RETURN false
                BREAK
    RETURN true
```

## Walkthrough
Consider `s = "ab", t = "ba"`.
- Edges: `a → b` and `b → a` → cycle of length 2.
- `usedLetters = {a,b}`; there are 24 unused letters, so we can break the cycle using a temporary character (e.g., `c`). Hence the algorithm returns `true`.

## Complexity Analysis
- **Time:** O(n + 26) where n is string length (building graph + DFS on at most 26 nodes).
- **Space:** O(26) for the adjacency structure and visitation maps.

## Follow-Up Questions
- How would the solution change if each operation could replace only a **single** occurrence instead of all occurrences?
- Can the algorithm be extended to support a limited number of operations?
- What if the alphabet size is larger than 26 (e.g., Unicode)?

## Key Takeaway
Model character replacements as a dependency graph; the existence of a spare character determines whether cycles can be resolved.
