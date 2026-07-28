# 1167. Minimum Cost to Connect Sticks

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/minimum-cost-to-connect-sticks
**Companies:** Amazon, Google, Ibm, Jpmorgan, Twitter

---
## Problem Description
You are given an array `sticks` where `sticks[i]` is the length of the i‑th stick. You can connect any two sticks, incurring a cost equal to the sum of their lengths, and the resulting stick has a length equal to that sum. Repeat this process until only one stick remains. Return the minimum total cost to connect all sticks.

## Examples
**Example 1**
Input: sticks = [2,4,3]
Output: 14
Explanation: Connect 2 and 3 → cost 5, sticks = [5,4]; then connect 5 and 4 → cost 9; total = 5+9 = 14.

**Example 2**
Input: sticks = [1,8,3,5]
Output: 30
Explanation: Connect 1 and 3 → 4 (cost 4), sticks = [4,8,5]; connect 4 and 5 → 9 (cost 9), sticks = [9,8]; connect 9 and 8 → 17 (cost 17); total = 4+9+17 = 30.

## Approach
**Algorithm:** Greedy using a Min‑Heap (Huffman‑like)
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
| Time   | O(n log n) – each heap operation costs log n |
| Space  | O(n) for the heap |

## Follow‑Up Questions
1. How would the algorithm change if you could only connect sticks that are adjacent in the original array?
2. Can you prove that this greedy strategy is optimal using an exchange argument?
3. What is the total cost if all sticks have the same length `L` and there are `k` sticks?

## Key Takeaway
Merging the two smallest sticks first (using a min‑heap) minimizes the incremental cost at each step, leading to the overall minimal total cost, analogous to Huffman coding.
