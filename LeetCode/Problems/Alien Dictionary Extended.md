# Topological Sort Pattern

Related: #207 Course Schedule, #210 Course Schedule II, #269 Alien Dictionary, #310 Min Height Trees

---

## Problem Description
Given a list of words sorted lexicographically according to an alien language, derive a possible order of characters in that language. The order must be consistent with the given word sequence.

## Examples
**Example 1**
Input: `words = ["wrt","wrf","er","ett","rftt"]`
Output: `"wertf"`
Explanation: The derived order satisfies all precedence constraints.

**Example 2**
Input: `words = ["z","x"]`
Output: `"zx"`

## Approach
**Algorithm:** Build a directed graph of character precedence and perform topological sort (Kahn's algorithm).
1. Initialize adjacency list and indegree map for all unique characters.
2. Compare each adjacent pair of words; the first differing character defines an edge `c1 → c2`.
3. Apply Kahn's algorithm: enqueue all nodes with indegree 0, repeatedly dequeue, append to result, and decrease indegrees of neighbors.
4. If the result length differs from the number of unique characters, a cycle exists → return empty string.

## Walkthrough
| Step | Edge added | Queue after processing | Result so far |
|------|------------|------------------------|---------------|
| 1 | w→e (from "wrt" vs "er") | [x, r, t, ...] | "w" |
| 2 | e→r (from "er" vs "ett") | ... | "we" |
| … | … | … | … |

## Complexity Analysis
- **Time:** O(C + E) where C is number of unique characters and E is number of precedence edges.
- **Space:** O(C + E) for the graph and indegree map.

## Follow‑Up Questions
1. How would you modify the algorithm to return all possible valid orders?
2. Can you detect and report the exact cycle causing an invalid ordering?
3. How would you handle duplicate words or words that are prefixes of each other?

## Key Takeaway
Topological sorting of a character precedence graph extracts a valid alien alphabet order from the given sorted word list.

---

```text
FUNCTION alienOrder(words):
    graph ← MAP of char → SET of neighbors
    indegree ← MAP of char → 0
    // Initialize nodes
    FOR word IN words:
        FOR ch IN word:
            IF ch NOT IN graph:
                graph[ch] ← SET()
                indegree[ch] ← 0
    // Build edges
    FOR i FROM 0 TO len(words)-2:
        w1 ← words[i]
        w2 ← words[i+1]
        minLen ← MIN(len(w1), len(w2))
        FOR j FROM 0 TO minLen-1:
            IF w1[j] != w2[j]:
                IF w2[j] NOT IN graph[w1[j]]:
                    ADD w2[j] TO graph[w1[j]]
                    indegree[w2[j]] ← indegree[w2[j]] + 1
                BREAK
        // Check prefix case
        IF j == minLen AND len(w1) > len(w2):
            RETURN ""  // invalid ordering
    // Kahn's algorithm
    queue ← [ch FOR ch IN indegree IF indegree[ch] = 0]
    order ← []
    WHILE queue NOT EMPTY:
        ch ← DEQUEUE(queue)
        APPEND ch TO order
        FOR nb IN graph[ch]:
            indegree[nb] ← indegree[nb] - 1
            IF indegree[nb] = 0:
                ENQUEUE(nb, queue)
    IF len(order) != SIZE(graph):
        RETURN ""
    RETURN JOIN(order) AS STRING
```