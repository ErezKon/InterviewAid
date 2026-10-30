# 1962. Remove Stones to Minimize the Total

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-stones-to-minimize-the-total](https://leetcode.com/problems/remove-stones-to-minimize-the-total)
**Companies:** Amazon, Bill Com, Expedia, Nvidia

---

## Problem Description

You are given a **0-indexed** integer array `piles`, where `piles[i]` represents the number of stones in the `i`th pile, and an integer `k`. You should apply the following operation **exactly** `k` times:

- Choose any `piles[i]` and **remove** `floor(piles[i] / 2)` stones from it.

**Notice** that you can apply the operation on the **same** pile more than once.

Return *the **minimum** possible total number of stones remaining after applying the* `k` *operations*.

`floor(x)` is the **largest** integer that is **smaller** than or **equal** to `x` (i.e., rounds `x` down).

**Constraints:**
- `1 <= piles.length <= 10^5`
- `1 <= piles[i] <= 10^4`
- `1 <= k <= 10^5`

## Examples

**Example 1:**
```
Input: piles = [5,4,9], k = 2
Output: 12
Explanation: Steps of a possible scenario are:
- Apply the operation on pile 2. The resulting piles are [5,4,5].
- Apply the operation on pile 0. The resulting piles are [3,4,5].
The total number of stones in [3,4,5] is 12.
```

**Example 2:**
```
Input: piles = [4,3,6,7], k = 3
Output: 12
Explanation: Steps of a possible scenario are:
- Apply the operation on pile 2. The resulting piles are [4,3,3,7].
- Apply the operation on pile 3. The resulting piles are [4,3,3,4].
- Apply the operation on pile 0. The resulting piles are [2,3,3,4].
The total number of stones in [2,3,3,4] is 12.
```

## Approach
**Greedy + Max‑Heap** – Always remove stones from the currently largest pile because halving the biggest number yields the greatest reduction. Use a max‑heap to retrieve the largest pile in O(log n) time each operation.

```text
FUNCTION minStoneSum(piles, k):
    // Build a max‑heap from all piles
    heap ← BUILD_MAX_HEAP(piles)
    FOR i ← 1 TO k:
        largest ← POP_MAX(heap)
        reduced ← largest - FLOOR(largest / 2)
        PUSH(heap, reduced)
    RETURN SUM(heap)
```

## Walkthrough
| Step | Heap (largest → smallest) | Operation | New Heap |
|------|---------------------------|-----------|----------|
| 0    | [9,5,4]                  | –         | – |
| 1    | POP 9 → reduced 5        | Replace 9 with 5 | [5,5,4] |
| 2    | POP 5 → reduced 3        | Replace 5 with 3 | [5,4,3] |
| End  | Sum = 12                 | –         | – |

## Complexity Analysis
- **Time:** O(k log n) for k heap operations.
- **Space:** O(n) for the heap storing all piles.

## Follow‑Up Questions
1. How would the solution change if you could remove any number of stones up to `⌊piles[i]/2⌋` each operation?
2. Can you solve the problem in O(n) time without a heap?
3. What if the number of operations `k` is larger than the total number of stones?

## Key Takeaway
Greedy selection of the largest pile combined with a max‑heap yields the optimal minimal total after `k` reductions.
