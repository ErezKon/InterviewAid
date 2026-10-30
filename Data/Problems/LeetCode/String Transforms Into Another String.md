# 1153. String Transforms Into Another String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/string-transforms-into-another-string](https://leetcode.com/problems/string-transforms-into-another-string)
**Companies:** Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. Correct criterion (the Approach below is close but checks the wrong set): if `str1 == str2` return `true`; otherwise every character of `str1` must map to a single character of `str2` (consistent mapping), and `str2` must use **fewer than 26** distinct letters (so a free letter exists to break cycles).*

Given two strings `str1` and `str2` of the same length, determine whether you can transform `str1` into `str2` by doing **zero or more** *conversions*.

In one conversion you can convert **all** occurrences of one character in `str1` to **any** other lowercase English character.

Return `true` if and only if you can transform `str1` into `str2`.

**Constraints:**
- `1 <= str1.length == str2.length <= 10^4`
- `str1` and `str2` contain only lowercase English letters.

## Examples

**Example 1:**
```
Input: str1 = "aabcc", str2 = "ccdee"
Output: true
Explanation: Convert 'c' to 'e' then 'b' to 'd' then 'a' to 'c'. Note that the order of conversions matter.
```

**Example 2:**
```
Input: str1 = "leetcode", str2 = "codeleet"
Output: false
Explanation: There is no way to transform str1 to str2.
```

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
