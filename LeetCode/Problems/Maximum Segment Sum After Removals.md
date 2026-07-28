# 2382. Maximum Segment Sum After Removals

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-segment-sum-after-removals](https://leetcode.com/problems/maximum-segment-sum-after-removals)
**Companies:** Infosys, Medianet
---

## Problem Description
You are given an integer array `nums` of length `n` and an array `removeOrder` of length `n` containing a permutation of indices `0..n-1`. Starting with an empty array, you insert the elements of `nums` back in reverse order of `removeOrder`. After each insertion you consider the contiguous segments formed by inserted elements and compute the sum of each segment. Return an array `answer` where `answer[i]` is the maximum segment sum after the `i`‑th insertion (i.e., after `n‑i` removals).

## Examples
**Example 1:**
```
nums = [1,2,5,6]
removeOrder = [3,0,1,2]
Insert order (reverse) = [2,1,0,3]
Step 1: insert 5 → segments [5] → max = 5
Step 2: insert 2 → segments [2,5] → max = 7
Step 3: insert 1 → segments [1,2,5] → max = 8
Step 4: insert 6 → segments [1,2,5,6] → max = 14
answer = [5,7,8,14]
```

**Example 2:**
```
nums = [3,1,2]
removeOrder = [0,1,2]
Insert order = [2,1,0]
Step results → answer = [2,3,6]
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
