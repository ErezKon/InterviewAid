# 2382. Maximum Segment Sum After Removals

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-segment-sum-after-removals](https://leetcode.com/problems/maximum-segment-sum-after-removals)
**Companies:** Infosys, Medianet
---

## Problem Description

You are given two **0-indexed** integer arrays `nums` and `removeQueries`, both of length `n`. For the `i^th` query, the element in `nums` at the index `removeQueries[i]` is removed, splitting `nums` into different segments.

A **segment** is a contiguous sequence of **positive** integers in `nums`. A **segment sum** is the sum of every element in a segment.

Return* an integer array *`answer`*, of length *`n`*, where *`answer[i]`* is the **maximum** segment sum after applying the *`i^th` *removal.*

**Note:** The same index will **not** be removed more than once.

**Constraints:**
- `n == nums.length == removeQueries.length`
- `1 <= n <= 10^5`
- `1 <= nums[i] <= 10^9`
- `0 <= removeQueries[i] < n`
- All the values of `removeQueries` are **unique**.

## Examples

**Example 1:**
```
Input: nums = [1,2,5,6,1], removeQueries = [0,3,2,4,1]
Output: [14,7,2,2,0]
Explanation: Using 0 to indicate a removed element, the answer is as follows:
Query 1: Remove the 0th element, nums becomes [0,2,5,6,1] and the maximum segment sum is 14 for segment [2,5,6,1].
Query 2: Remove the 3rd element, nums becomes [0,2,5,0,1] and the maximum segment sum is 7 for segment [2,5].
Query 3: Remove the 2nd element, nums becomes [0,2,0,0,1] and the maximum segment sum is 2 for segment [2].
Query 4: Remove the 4th element, nums becomes [0,2,0,0,0] and the maximum segment sum is 2 for segment [2].
Query 5: Remove the 1st element, nums becomes [0,0,0,0,0] and the maximum segment sum is 0, since there are no segments.
Finally, we return [14,7,2,2,0].
```

**Example 2:**
```
Input: nums = [3,2,11,1], removeQueries = [3,2,1,0]
Output: [16,5,3,0]
Explanation: Using 0 to indicate a removed element, the answer is as follows:
Query 1: Remove the 3rd element, nums becomes [3,2,11,0] and the maximum segment sum is 16 for segment [3,2,11].
Query 2: Remove the 2nd element, nums becomes [3,2,0,0] and the maximum segment sum is 5 for segment [3,2].
Query 3: Remove the 1st element, nums becomes [3,0,0,0] and the maximum segment sum is 3 for segment [3].
Query 4: Remove the 0th element, nums becomes [0,0,0,0] and the maximum segment sum is 0, since there are no segments.
Finally, we return [16,5,3,0].
```

## Approach
Process insertions in reverse using a Disjoint Set Union (DSU) to maintain contiguous segments. When a new element is added, create a new set for its index, then union with neighboring sets if they are already present. Keep a map from set root to the sum of its segment. After each union, update the global maximum segment sum.

```text
FUNCTION MaxSegmentSums(nums, removeOrder):
    n ← LENGTH(nums)
    rev ← REVERSE(removeOrder)
    dsu ← DSU of size n
    present ← ARRAY[n] filled with FALSE
    segSum ← MAP root → 0
    maxSoFar ← 0
    answer ← EMPTY LIST
    FOR idx IN rev:
        SET present[idx] ← TRUE
        SET segSum[idx] ← nums[idx]
        // Union with left neighbor
        IF idx > 0 AND present[idx-1] = TRUE:
            SET root ← dsu.UNION(idx, idx-1)
            SET segSum[root] ← segSum[dsu.FIND(idx)] + segSum[dsu.FIND(idx-1)]
        // Union with right neighbor
        IF idx < n-1 AND present[idx+1] = TRUE:
            SET root ← dsu.UNION(idx, idx+1)
            SET segSum[root] ← segSum[dsu.FIND(idx)] + segSum[dsu.FIND(idx+1)]
        SET curRoot ← dsu.FIND(idx)
        SET maxSoFar ← MAX(maxSoFar, segSum[curRoot])
        APPEND maxSoFar TO answer
    REVERSE answer
    RETURN answer
```

## Walkthrough
| Insertion | Present indices | Segments (sum) | Max |
|-----------|----------------|----------------|-----|
| 5 (idx2) | {2} | [5] | 5 |
| 2 (idx1) | {1,2} | [2,5] (sum 7) | 7 |
| 1 (idx0) | {0,1,2} | [1,2,5] (sum 8) | 8 |
| 6 (idx3) | {0,1,2,3} | [1,2,5,6] (sum 14) | 14 |

## Complexity Analysis
- Time: `O(n α(n))` where `α` is the inverse Ackermann function (near‑constant) for DSU operations.
- Space: `O(n)` for DSU structures, presence array, and segment sums.

## Follow-Up Questions
1. How would the solution change if removals were performed online (no reverse processing)?
2. Can you extend the approach to support segment maximum queries after each removal without reversal?
3. What if each element also had a weight that contributed multiplicatively to the segment score?

## Key Takeaway
Reversing the removal process and using DSU to merge newly inserted neighbours lets you maintain segment sums efficiently, yielding linear‑time computation of maximum segment sums.
