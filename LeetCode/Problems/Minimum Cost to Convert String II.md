# 2977. Minimum Cost to Convert String II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-convert-string-ii](https://leetcode.com/problems/minimum-cost-to-convert-string-ii)
**Companies:** Amazon, Atlassian, Google, Microsoft

---

## Problem Description

You are given two strings `source` and `target` of equal length consisting of lowercase English letters. You may apply a set of conversion operations; each operation `i` replaces a **substring** `original[i]` with another substring `changed[i]` at a cost `cost[i]`. Operations can be used any number of times and may overlap. Determine the minimum total cost to transform `source` into `target`, or return `-1` if impossible.

Constraints:
- `1 ≤ source.length = target.length ≤ 10^5`
- `1 ≤ original.length = changed.length = cost.length ≤ 100`
- All strings contain only lowercase letters.

## Examples

**Example 1**
```
Input: source = "abcde", target = "abfde", original = ["c"], changed = ["f"], cost = [3]
Output: 3
Explanation: Replace substring "c" with "f" at cost 3.
```

**Example 2**
```
Input: source = "aaaa", target = "bbbb", original = ["aa"], changed = ["bb"], cost = [2]
Output: 4
Explanation: Apply the operation twice on positions (0‑1) and (2‑3).
```

## Approach

**Algorithm:** Build a graph of substring conversions, compute all‑pairs shortest paths, then run DP over the string positions using a trie (or Aho‑Corasick) to find applicable conversions.

1. **Assign IDs** to every distinct substring appearing in `original` or `changed`. Add a special node for each single character to allow identity edges of cost 0.
2. **Shortest‑path**: Run Floyd‑Warshall (or repeated Dijkstra) on the small graph (≤ 200 nodes) to obtain `minCost[u][v]` – the cheapest way to turn substring `u` into `v`.
3. **Trie construction**: Insert all `original` substrings into a trie that stores the ID of the substring at the terminal node.
4. **DP**: `dp[i]` = minimum cost to convert the prefix `source[0..i-1]` into the corresponding prefix of `target`. Initialise `dp[0]=0` and others = ∞.
   - At position `i`, walk the trie following `source[i..]` to enumerate every substring `orig` that starts at `i`. For each match of length `len` with ID `u`, check the corresponding segment of `target` (`target[i..i+len-1]`) and obtain its ID `v`. Update `dp[i+len] = min(dp[i+len], dp[i] + minCost[u][v])`.
   - Also allow the trivial conversion of a single character to itself with cost 0.
5. Result is `dp[n]` or `-1` if it remains ∞.

```text
FUNCTION minCostConvert(source, target, original, changed, cost):
    // 1. Build substring graph
    substrings ← SET()
    FOR s IN original + changed DO substrings.ADD(s)
    FOR ch IN 'a'..'z' DO substrings.ADD(ch)
    ids ← MAP(substring → index)
    m ← SIZE(substrings)
    dist ← ARRAY(m, ARRAY(m, INFINITY))
    FOR i ← 0 TO m-1 DO dist[i][i] ← 0
    FOR i ← 0 TO LEN(original)-1 DO
        u ← ids[original[i]]
        v ← ids[changed[i]]
        dist[u][v] ← MIN(dist[u][v], cost[i])
    END FOR
    // Floyd‑Warshall on small graph
    FOR k ← 0 TO m-1 DO
        FOR i ← 0 TO m-1 DO
            FOR j ← 0 TO m-1 DO
                IF dist[i][k] + dist[k][j] < dist[i][j] THEN
                    dist[i][j] ← dist[i][k] + dist[k][j]
                END IF
            END FOR
        END FOR
    END FOR
    // 2. Build trie for original substrings
    trie ← NEW_TRIE()
    FOR i ← 0 TO LEN(original)-1 DO
        trie.INSERT(original[i], ids[original[i]])
    END FOR
    // 3. DP over positions
    n ← LEN(source)
    dp ← ARRAY(n+1, INFINITY)
    dp[0] ← 0
    FOR i ← 0 TO n-1 DO
        IF dp[i] = INFINITY THEN CONTINUE
        // identity conversion of single character
        IF source[i] = target[i] THEN
            dp[i+1] ← MIN(dp[i+1], dp[i])
        END IF
        // walk trie to find all matching original substrings starting at i
        node ← trie.ROOT()
        j ← i
        WHILE j < n AND node.HAS_CHILD(source[j]) DO
            node ← node.CHILD(source[j])
            IF node.TERMINAL THEN
                u ← node.ID
                len ← j - i + 1
                v ← ids[target[i..i+len-1]]   // substring of target
                IF dist[u][v] < INFINITY THEN
                    dp[i+len] ← MIN(dp[i+len], dp[i] + dist[u][v])
                END IF
            END IF
            j ← j + 1
        END WHILE
    END FOR
    RETURN dp[n] IF dp[n] ≠ INFINITY ELSE -1
```

## Walkthrough (Example 1)

| Position `i` | Matching original | Target slice | `dist` cost | Updated `dp` |
|--------------|-------------------|--------------|------------|--------------|
| 0 | none (characters equal) | – | 0 | `dp[1]=0` |
| 2 | "c" (ID u) | "f" (ID v) | `dist[u][v]=3` | `dp[3]=dp[2]+3=3` |
| … | … | … | … | … |

The final `dp[5]=3`.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(m³ + n·L)** – Floyd‑Warshall on ≤ 200 nodes (`m³`) plus DP scanning each character while traversing the trie (total `n·L`, `L` = max substring length) |
| Space  | **O(m² + n)** – distance matrix, trie, and DP array |

## Follow‑Up Questions

1. How would the solution change if conversion costs were asymmetric (different for forward vs. reverse)?
2. Can we replace Floyd‑Warshall with repeated Dijkstra to handle a larger set of substrings?
3. What if overlapping conversions are prohibited; how would the DP state need to be adjusted?

## Key Takeaway

By treating each allowed substring as a node in a tiny graph, computing all‑pairs cheapest conversions, and then using a trie‑driven DP over the source string, we obtain the minimum cost to transform one string into another even when conversions act on substrings.
