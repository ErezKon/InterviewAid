# 2558. Take Gifts From the Richest Pile

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/take-gifts-from-the-richest-pile](https://leetcode.com/problems/take-gifts-from-the-richest-pile)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta

---

## Problem Description
You are given an array `gifts` where each element represents the value of a gift. You can perform the following operation exactly `k` times: pick the largest value, replace it with the floor of its square root, and keep the other values unchanged. Return the sum of the array after all operations.

## Examples
**Example 1:**
```
Input: gifts = [25,64,9,4], k = 2
Output: 29
Explanation: First pick 64 → floor(sqrt(64)) = 8, array becomes [25,8,9,4].
Second pick 25 → floor(sqrt(25)) = 5, final array [5,8,9,4] sums to 26.
```

**Example 2:**
```
Input: gifts = [1,1,1], k = 3
Output: 3
Explanation: All values are 1, sqrt(1) = 1, sum remains 3.
```

## Approach
Maintain a max‑heap of the current gift values. In each of the `k` iterations, extract the maximum, compute its integer square root, and push the result back. After the loop, sum the heap contents.

```text
FUNCTION pickGifts(gifts, k):
    // Build a max‑heap from the initial values
    heap ← MaxHeap(gifts)
    FOR i ← 1 TO k:
        maxVal ← heap.POP()
        newVal ← FLOOR(SQRT(maxVal))
        heap.PUSH(newVal)
    RETURN SUM(heap)
```

## Walkthrough
| Step | Heap before | Extracted | New value | Heap after |
|------|-------------|----------|-----------|------------|
| 0 | [64,25,9,4] | – | – | – |
| 1 | [64,25,9,4] | 64 | 8 | [25,9,4,8] |
| 2 | [25,9,8,4] | 25 | 5 | [9,8,4,5] |
| End | – | – | – | Sum = 26 |

## Complexity Analysis
- Time: O((n + k) log n) – building the heap takes O(n), each of the `k` operations costs O(log n).
- Space: O(n) for the heap.

## Follow‑Up Questions
1. How would the solution change if the operation could be applied to any element, not just the maximum?
2. Can you compute the final sum without using a heap by observing the monotonic decrease of values?
3. What if the replacement rule were `ceil(sqrt(x))` instead of `floor`?

## Key Takeaway
A max‑heap lets you repeatedly access and update the largest element efficiently, enabling greedy reduction of values.
