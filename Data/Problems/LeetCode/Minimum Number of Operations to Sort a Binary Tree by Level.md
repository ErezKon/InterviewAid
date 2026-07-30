# 2471. Minimum Number of Operations to Sort a Binary Tree by Level

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google, Guidewire

---

## Problem Description
You are given the root of a binary tree. For each depth level, you may reorder the node values arbitrarily. An operation consists of swapping the values of any two nodes on the same level. Return the minimum total number of swaps required so that, for every level, the node values are in non‑decreasing order from left to right.

## Examples
**Example 1:**
```
Input: root = [1,3,2,7,6,5,4]
Output: 3
Explanation:
- Level 0: [1] already sorted.
- Level 1: [3,2] → swap 3 and 2 (1 swap).
- Level 2: [7,6,5,4] → sorted order is [4,5,6,7]; this requires 2 swaps (cycle decomposition).
Total swaps = 3.
```
**Example 2:**
```
Input: root = [5,4,3,2,1]
Output: 2
Explanation:
- Level 1: [4,3] → 1 swap.
- Level 2: [2,1] → 1 swap.
``` 

## Approach
The problem separates by level, so handle each level independently.
1. Perform a breadth‑first search (BFS) to collect the values of each level in order.
2. For a level array `arr`, the minimum swaps to sort it equals the sum over cycles of `(cycle_length - 1)`. This is classic cycle decomposition:
   - Pair each value with its original index.
   - Sort the pairs by value.
   - Visit each index; if not visited, follow the cycle and count its length.
3. Accumulate swaps across all levels.

## Walkthrough
| Level | Original values | Sorted values | Cycles (indices) | Swaps |
|-------|----------------|---------------|------------------|-------|
| 1 | [3,2] | [2,3] | (0→1→0) | 1 |
| 2 | [7,6,5,4] | [4,5,6,7] | (0→3→0), (1→2→1) | 2 |
| Total swaps = 3 |

## Complexity Analysis
- **Time:** O(N log N) – BFS visits each node once, and sorting each level of size `m` costs `O(m log m)`. The sum over levels is bounded by `O(N log N)`.
- **Space:** O(N) for storing level arrays and BFS queue.

## Follow‑Up Questions
1. How would the solution change if swaps could be performed between any two nodes in the tree (not limited to the same level)?
2. Can you compute the answer in O(N) time using counting sort when node values are bounded?
3. What if the tree is a complete binary tree and you must output the sequence of swap operations?

## Key Takeaway
Sorting each level independently reduces to counting the minimum swaps via cycle decomposition; summing these per‑level counts yields the overall minimum operations.
