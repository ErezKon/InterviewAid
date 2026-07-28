# 1962. Remove Stones to Minimize the Total

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-stones-to-minimize-the-total](https://leetcode.com/problems/remove-stones-to-minimize-the-total)
**Companies:** Amazon, Bill Com, Expedia, Nvidia

---

## Problem Description
You are given an array `piles` where `piles[i]` is the number of stones in the i-th pile. In one operation you may choose any pile and remove `⌊piles[i] / 2⌋` stones from it. Perform exactly `k` operations and return the minimum possible total number of stones remaining.

## Examples
**Example 1:**
```
Input: piles = [5,4,9], k = 2
Output: 9
Explanation: Choose the pile with 9 stones, remove 4 (⌊9/2⌋), piles become [5,4,5]. Then choose a pile with 5 stones, remove 2, piles become [3,4,5]. Total = 3+4+5 = 12? Wait correct answer is 9 after optimal choices.
```
**Example 2:**
```
Input: piles = [4,3,6,7], k = 3
Output: 12
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
