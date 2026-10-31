# 2558. Take Gifts From the Richest Pile

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/take-gifts-from-the-richest-pile](https://leetcode.com/problems/take-gifts-from-the-richest-pile)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta

---

## Problem Description
You are given an integer array `gifts` denoting the number of gifts in various piles. Every second, you do the following:

- Choose the pile with the maximum number of gifts.
- If there is more than one pile with the maximum number of gifts, choose any.
- Reduce the number of gifts in the pile to the floor of the square root of the original number of gifts in the pile.

Return *the number of gifts remaining after* `k` *seconds.*

**Constraints:**
- `1 <= gifts.length <= 10^3`
- `1 <= gifts[i] <= 10^9`
- `1 <= k <= 10^3`

## Examples
```
Example 1:
  Input: gifts = [25,64,9,4,100], k = 4
  Output: 29
  Explanation: The gifts are taken in the following way:
  - In the first second, the last pile is chosen and 10 gifts are left behind.
  - Then the second pile is chosen and 8 gifts are left behind.
  - After that the first pile is chosen and 5 gifts are left behind.
  - Finally, the last pile is chosen again and 3 gifts are left behind.
  The final remaining gifts are [5,8,9,4,3], so the total number of gifts remaining is 29.
```
```
Example 2:
  Input: gifts = [1,1,1,1], k = 4
  Output: 4
  Explanation: In this case, regardless which pile you choose, you have to leave behind 1 gift in each pile.
  That is, you can't take any pile with you.
  So, the total gifts remaining are 4.
```

## Approach
Maintain a max-heap of the current gift values. In each of the `k` iterations, extract the maximum, compute its integer square root, and push the result back. After the loop, sum the heap contents.

```text
FUNCTION pickGifts(gifts, k):
    // Build a max-heap from the initial values
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
- Time: O((n + k) log n) – building the heap takes O(n), each of the `k` operations costs O(log n).
- Space: O(n) for the heap.

## Follow-Up Questions
1. How would the solution change if the operation could be applied to any element, not just the maximum?
2. Can you compute the final sum without using a heap by observing the monotonic decrease of values?
3. What if the replacement rule were `ceil(sqrt(x))` instead of `floor`?

## Key Takeaway
A max-heap lets you repeatedly access and update the largest element efficiently, enabling greedy reduction of values.
