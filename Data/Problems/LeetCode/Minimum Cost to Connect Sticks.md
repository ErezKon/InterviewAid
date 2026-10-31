# 1167. Minimum Cost to Connect Sticks

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-cost-to-connect-sticks
**Companies:** Amazon, Google, Ibm, Jpmorgan, Twitter

---
## Problem Description
You have some number of sticks with positive integer lengths. These lengths are given as an array `sticks`, where `sticks[i]` is the length of the `i-th` stick.

You can connect any two sticks of lengths `x` and `y` into one stick by paying a cost of `x + y`. You must connect all the sticks until there is only one stick remaining.

Return *the minimum cost of connecting all the given sticks into one stick in this way*.

**Constraints:**
- `1 <= sticks.length <= 10^4`
- `1 <= sticks[i] <= 10^4`

## Examples

```
Example 1:
  Input: sticks = [2,4,3]
  Output: 14
  Explanation: You start with sticks = [2,4,3].
  1. Combine sticks 2 and 3 for a cost of 2 + 3 = 5. Now you have sticks = [5,4].
  2. Combine sticks 5 and 4 for a cost of 5 + 4 = 9. Now you have sticks = [9].
  There is only one stick left, so you are done. The total cost is 5 + 9 = 14.
```

```
Example 2:
  Input: sticks = [1,8,3,5]
  Output: 30
  Explanation: You start with sticks = [1,8,3,5].
  1. Combine sticks 1 and 3 for a cost of 1 + 3 = 4. Now you have sticks = [4,8,5].
  2. Combine sticks 4 and 5 for a cost of 4 + 5 = 9. Now you have sticks = [9,8].
  3. Combine sticks 9 and 8 for a cost of 9 + 8 = 17. Now you have sticks = [17].
  There is only one stick left, so you are done. The total cost is 4 + 9 + 17 = 30.
```

```
Example 3:
  Input: sticks = [5]
  Output: 0
  Explanation: There is only one stick, so you don't need to do anything. The total cost is 0.
```

## Approach
**Algorithm:** Greedy using a Min-Heap (Huffman-like)
Repeatedly extract the two smallest sticks, merge them, add the merge cost to the total, and push the combined stick back into the heap. This yields the optimal minimal total cost.

```text
FUNCTION connectSticks(sticks):
    heap ← MIN_HEAP containing all stick lengths
    totalCost ← 0
    WHILE heap.SIZE() > 1 DO
        a ← heap.POP()  // smallest
        b ← heap.POP()  // second smallest
        merged ← a + b
        totalCost ← totalCost + merged
        heap.PUSH(merged)
    RETURN totalCost
```

## Walkthrough
For `sticks = [2,4,3]`:
1. Heap = {2,3,4}. Pop 2 and 3 → merged = 5, total = 5, push 5 → heap {4,5}.
2. Pop 4 and 5 → merged = 9, total = 5+9 = 14, push 9 → heap size 1, stop. Result = 14.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n log n) – each heap operation costs log n |
| Space  | O(n) for the heap |

## Follow-Up Questions
1. How would the algorithm change if you could only connect sticks that are adjacent in the original array?
2. Can you prove that this greedy strategy is optimal using an exchange argument?
3. What is the total cost if all sticks have the same length `L` and there are `k` sticks?

## Key Takeaway
Merging the two smallest sticks first (using a min-heap) minimizes the incremental cost at each step, leading to the overall minimal total cost, analogous to Huffman coding.
