# 1264. Page Recommendations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/page-recommendations](https://leetcode.com/problems/page-recommendations)
**Companies:** Meta

---

## Problem Description
Given a directed graph where nodes represent web pages and edges represent hyperlinks, and a list of query pages, return for each query the top‑k pages that are most frequently visited after exactly one click (i.e., direct neighbors). If multiple pages have the same visit count, order them by page ID.

## Examples
**Example 1:**
```
Input: edges = [[1,2],[1,3],[2,3]], queries = [1], k = 2
Output: [[2,3]]
Explanation: From page 1, direct neighbors are pages 2 and 3, each visited once. Ordered by ID.
```
**Example 2:**
```
Input: edges = [[1,2],[2,1],[2,3]], queries = [2], k = 1
Output: [[1]]
```

## Approach
For each query page, look up its adjacency list to obtain direct neighbors. Count the frequency of each neighbor (typically 1 unless multiple edges exist). Sort the neighbors by (frequency descending, page ID ascending) and return the first `k`.

## Walkthrough
| Step | Query | Neighbors | Frequency map |
|------|-------|-----------|---------------|
| 1    | 1     | {2,3}     | {2:1, 3:1} |
| 2    | Sort by freq then ID → [2,3] |

## Complexity Analysis
- **Time:** O(q * d log d) where `q` is number of queries and `d` is average out‑degree (sorting neighbors).
- **Space:** O(d) for the frequency map per query.

## Follow-Up Questions
1. How would the solution change if edges could have weights representing click probabilities?
2. Can you extend the approach to recommend pages after two clicks (similar to Page Recommendations II)?
3. What if the graph is massive and cannot fit in memory—how would you stream the adjacency lists?

## Key Takeaway
Directly accessing a node's adjacency list and sorting its neighbors by visit frequency yields the required top‑k page recommendations efficiently.
