# 1892. Page Recommendations II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/page-recommendations-ii](https://leetcode.com/problems/page-recommendations-ii)
**Companies:** Meta

---

## Problem Description
Given a directed graph representing web pages and hyperlinks, and a list of query pages, return for each query the top‑k pages that are most frequently visited after exactly two clicks starting from the query page. If multiple pages have the same frequency, order them by page ID.

## Examples
**Example 1:**
```
Input: edges = [[1,2],[2,3],[1,3]], queries = [1], k = 2
Output: [[3,2]]
Explanation: From page 1, two‑click paths lead to page 3 (via 2) and page 2 (via 3). Both appear once, ordered by ID.
```
**Example 2:**
```
Input: edges = [[1,2],[2,1],[2,3]], queries = [2], k = 1
Output: [[1]]
```

## Approach
For each query, perform a BFS limited to depth 2. Count occurrences of destination nodes reached at depth 2. Use a hash map to tally frequencies, then extract the top‑k entries sorted by (frequency desc, page ID asc).

## Walkthrough
| Step | Current frontier | Depth | Counts |
|------|-------------------|-------|--------|
| 0    | {query} = {1}     | 0     | {} |
| 1    | neighbors of 1 → {2,3} | 1 | {} |
| 2    | neighbors of {2,3} → {3,2,1} | 2 | {3:1,2:1,1:1} |
| 3    | Sort by freq then ID, take top‑k |

## Complexity Analysis
- **Time:** O(q * (outDegree^2)) in the worst case, where q is number of queries; BFS to depth 2 touches at most two edges per path.
- **Space:** O(n) for the adjacency list and frequency map per query.

## Follow-Up Questions
1. How would you extend the solution to handle paths of length three?
2. Can the algorithm be optimized using matrix multiplication of the adjacency matrix?
3. What changes are needed if the graph is weighted and you must consider shortest‑path distances?

## Key Takeaway
Limiting BFS to depth two and counting destination frequencies provides an efficient way to generate top‑k page recommendations after exactly two clicks.
