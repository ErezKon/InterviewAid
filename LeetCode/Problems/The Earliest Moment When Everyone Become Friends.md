# 1101. The Earliest Moment When Everyone Become Friends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends](https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends)
**Companies:** Expedia, Google, Uber
---

## Problem Description
You are given an integer `n` representing `n` people (labeled `0` to `n-1`) and an array `logs` where each element is `[timestamp, personA, personB]`. At the given `timestamp`, `personA` and `personB` become friends, merging their friendship groups. Return the earliest timestamp when all people are connected in a single friendship group. If they never become fully connected, return `-1`.

## Examples
**Example 1:**
```
Input: logs = [[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190110,0,2],[20190111,0,4]], n = 5
Output: 20190110
Explanation: After processing logs in chronological order, all 5 people become connected at timestamp 20190110.
```
**Example 2:**
```
Input: logs = [[0,2,0],[1,0,1],[3,0,2]], n = 4
Output: -1
Explanation: Person 3 never becomes connected to the others.
```

## Approach
Sort the logs by timestamp, then use a Union‑Find (Disjoint Set Union) data structure to merge friendship groups. After each union, check if the number of connected components has become `1`; if so, return the current timestamp.

```text
FUNCTION earliestAcq(logs, n):
    // Sort logs by timestamp ascending
    SORT(logs, BY timestamp)
    uf ← UnionFind(n)               // initially n separate components
    FOR each entry IN logs:
        t ← entry[0]; a ← entry[1]; b ← entry[2]
        uf.UNION(a, b)
        IF uf.COMPONENT_COUNT() == 1:
            RETURN t
    RETURN -1
```

## Walkthrough
| Step | Log entry (t,a,b) | Union performed | Components left |
|------|-------------------|----------------|-----------------|
| 1 | (20190101,0,1) | merge 0‑1 | 4 |
| 2 | (20190104,3,4) | merge 3‑4 | 3 |
| 3 | (20190107,2,3) | merge 2‑3‑4 | 2 |
| 4 | (20190110,0,2) | merge {0,1} with {2,3,4} → all connected | 1 → return 20190110 |

## Complexity Analysis
- Time: O(m log m) for sorting `m` logs plus near‑constant Union‑Find operations (≈ O(m α(n))).
- Space: O(n) for the Union‑Find parent and rank arrays.

## Follow‑Up Questions
1. How would you adapt the solution if logs could arrive out of order and you needed an online algorithm?
2. Can you solve the problem using a graph‑based BFS/DFS after building the friendship graph?
3. What changes are required if each friendship has a weight and you need the earliest time when the total weight exceeds a threshold?

## Key Takeaway
Sorting events chronologically and merging groups with Union‑Find efficiently reveals the moment when all nodes become connected.
