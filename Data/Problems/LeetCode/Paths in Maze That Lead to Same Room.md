# 2077. Paths in Maze That Lead to Same Room

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/paths-in-maze-that-lead-to-same-room](https://leetcode.com/problems/paths-in-maze-that-lead-to-same-room)
**Companies:** Google

---

## Problem Description
A maze consists of `n` rooms numbered from `1` to `n`, and some rooms are connected by corridors. You are given a 2D integer array `corridors` where `corridors[i] = [room1_i, room2_i]` indicates that there is a corridor connecting `room1_i` and `room2_i`, allowing a person in the maze to go from `room1_i` to `room2_i` **and vice versa**.

The designer of the maze wants to know how confusing the maze is. The **confusion score** of the maze is the number of different cycles of **length 3**.

- For example, `1 → 2 → 3 → 1` is a cycle of length 3, but `1 → 2 → 3 → 4` and `1 → 2 → 3 → 2 → 1` are not.

Two cycles are considered to be **different** if one or more of the rooms visited in the first cycle is **not** in the second cycle.

Return *the* ***confusion score*** *of the maze.*

**Constraints:**

- `2 <= n <= 1000`
- `1 <= corridors.length <= 5 * 10^4`
- `corridors[i].length == 2`
- `1 <= room1_i, room2_i <= n`
- `room1_i != room2_i`
- There are no duplicate corridors.

## Examples

```
Example 1:
  Input: n = 5, corridors = [[1,2],[5,2],[4,1],[2,4],[3,1],[3,4]]
  Output: 2
  Explanation:
  One cycle of length 3 is 4 -> 1 -> 3 -> 4.
  Note that this is the same cycle as 3 -> 4 -> 1 -> 3 or 1 -> 3 -> 4 -> 1 because the rooms are the same.
  Another cycle of length 3 is 1 -> 2 -> 4 -> 1.
  Thus, there are two different cycles of length 3.
```

```
Example 2:
  Input: n = 4, corridors = [[1,2],[3,4]]
  Output: 0
  Explanation: There are no cycles of length 3.
```

## Approach
The confusion score is the number of **triangles** in an undirected graph.
- Build adjacency sets.
- For every corridor `(u, v)`, every common neighbor `w` of `u` and `v` closes a triangle `{u, v, w}`.
- Each triangle `{a < b < c}` would be found from all three of its edges, so count it only from its edge `(a, b)` by requiring `w > max(u, v)`.

```text
FUNCTION numberOfPaths(n, corridors):
    adj ← ARRAY of n+1 empty sets
    FOR each (u, v) IN corridors:
        ADD v TO adj[u]
        ADD u TO adj[v]
    count ← 0
    FOR each (u, v) IN corridors:
        FOR each w IN (adj[u] INTERSECT adj[v]):
            IF w > MAX(u, v):
                count ← count + 1
    RETURN count
```

## Walkthrough
Example 1: `n = 5`, `corridors = [[1,2],[5,2],[4,1],[2,4],[3,1],[3,4]]`.
Adjacency: `1:{2,3,4}`, `2:{1,4,5}`, `3:{1,4}`, `4:{1,2,3}`, `5:{2}`.

| Corridor | Common neighbors | w > max(u,v) | Count |
|----------|------------------|--------------|-------|
| (1,2) | {4} | 4 | 1 |
| (5,2) | {} | - | 1 |
| (4,1) | {2,3} | none | 1 |
| (2,4) | {1} | none | 1 |
| (3,1) | {4} | 4 | 2 |
| (3,4) | {1} | none | 2 |

Triangles `{1,2,4}` and `{1,3,4}` -> answer `2`.

## Complexity Analysis
- **Time:** O(m * d) where `m` is the number of corridors and `d` the max degree (set intersection per edge); at most O(m * n).
- **Space:** O(n + m) for the adjacency sets.

## Follow-Up Questions
1. How does orienting each edge from lower-degree to higher-degree node give O(m * sqrt(m))?
2. How would you use bitsets (n <= 1000) to speed up the intersections?
3. How would you count cycles of length 4?

## Key Takeaway
Counting length-3 cycles is triangle counting: intersect neighbor sets per edge and impose an ordering so each triangle is counted exactly once.
