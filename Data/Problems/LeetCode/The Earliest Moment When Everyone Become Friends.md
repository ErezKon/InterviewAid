# 1101. The Earliest Moment When Everyone Become Friends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends](https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends)
**Companies:** Expedia, Google, Uber
---

## Problem Description
There are n people in a social group labeled from `0` to `n - 1`. You are given an array `logs` where `logs[i] = [timestamp_i, x_i, y_i]` indicates that `x_i` and `y_i` will be friends at the time `timestamp_i`.

Friendship is **symmetric**. That means if `a` is friends with `b`, then `b` is friends with `a`. Also, person `a` is acquainted with a person `b` if `a` is friends with `b`, or `a` is a friend of someone acquainted with `b`.

Return *the earliest time for which every person became acquainted with every other person*. If there is no such earliest time, return `-1`.

**Constraints:**
- `2 <= n <= 100`
- `1 <= logs.length <= 10^4`
- `logs[i].length == 3`
- `0 <= timestamp_i <= 10^9`
- `0 <= x_i, y_i <= n - 1`
- `x_i != y_i`
- All the values `timestamp_i` are **unique**.
- All the pairs `(x_i, y_i)` occur at most one time in the input.

## Examples
```
Example 1:
  Input: logs = [[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190211,1,5],[20190224,2,4],
                 [20190301,0,3],[20190312,1,2],[20190322,4,5]], n = 6
  Output: 20190301
  Explanation:
  The first event occurs at timestamp = 20190101, and after 0 and 1 become friends, we have the following friendship groups [0,1], [2], [3], [4], [5].
  The second event occurs at timestamp = 20190104, and after 3 and 4 become friends, we have the following friendship groups [0,1], [2], [3,4], [5].
  The third event occurs at timestamp = 20190107, and after 2 and 3 become friends, we have the following friendship groups [0,1], [2,3,4], [5].
  The fourth event occurs at timestamp = 20190211, and after 1 and 5 become friends, we have the following friendship groups [0,1,5], [2,3,4].
  The fifth event occurs at timestamp = 20190224, and as 2 and 4 are already friends, nothing happens.
  The sixth event occurs at timestamp = 20190301, and after 0 and 3 become friends, we all become friends.
```
```
Example 2:
  Input: logs = [[0,2,0],[1,0,1],[3,0,3],[4,1,2],[7,3,1]], n = 4
  Output: 3
  Explanation: At timestamp = 3, all the persons (i.e., 0, 1, 2, and 3) become friends.
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
