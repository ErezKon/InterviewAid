# 2462. Total Cost to Hire K Workers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-cost-to-hire-k-workers](https://leetcode.com/problems/total-cost-to-hire-k-workers)
**Companies:** Bloomberg, Gsa Capital, Mathworks, Microsoft

---

## Problem Description
Given an array `costs` where `costs[i]` is the hiring cost of the i‑th worker, you must hire exactly `k` workers. At each hiring step you may choose a worker from the first `candidates` unchosen workers or the last `candidates` unchosen workers (if fewer remain, consider all). After hiring a worker, they are removed and the next worker from that side becomes available. Return the minimum total cost to hire `k` workers.

## Examples
**Example 1:**
```
Input: costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4
Output: 11
Explanation: Hire workers with costs 2 (from right), 2 (from right), and 7 (from left) → total 11.
```

**Example 2:**
```
Input: costs = [1,2,4,1], k = 3, candidates = 3
Output: 4
Explanation: Hire costs 1 (left), 1 (right), and 2 (left) → total 4.
```

## Approach
Use two min‑heaps to store the current candidate workers from the left and right sides. At each step, pop the smaller top element, add its cost to the total, and replace it with the next worker from the same side if any remain.

**Pseudocode**
```text
FUNCTION totalCost(costs, k, candidates):
    SET leftHeap ← MIN-HEAP of first MIN(candidates, len(costs)) costs
    SET rightHeap ← MIN-HEAP of last MIN(candidates, len(costs) - candidates) costs
    SET leftIdx ← candidates
    SET rightIdx ← len(costs) - candidates - 1
    SET total ← 0

    FOR step ← 1 TO k:
        IF rightHeap IS EMPTY OR (leftHeap NOT EMPTY AND leftHeap[0] ≤ rightHeap[0]):
            SET total ← total + POP(leftHeap)
            IF leftIdx ≤ rightIdx:
                PUSH(leftHeap, costs[leftIdx])
                SET leftIdx ← leftIdx + 1
        ELSE:
            SET total ← total + POP(rightHeap)
            IF leftIdx ≤ rightIdx:
                PUSH(rightHeap, costs[rightIdx])
                SET rightIdx ← rightIdx - 1
    RETURN total
```

## Walkthrough
| Step | Chosen Side | Cost Added | Total | leftIdx | rightIdx |
|------|-------------|------------|-------|---------|----------|
| 1 | Right | 2 | 2 | 4 | 6 |
| 2 | Right | 2 | 4 | 4 | 5 |
| 3 | Left  | 7 | 11 | 5 | 5 |

## Complexity Analysis
- Time: O(k log c) where c = candidates (heap operations).
- Space: O(c) for the two heaps.

## Follow-Up Questions
1. How would you modify the algorithm if workers could be hired from any position, not just the ends?
2. Can the solution be adapted for a streaming input of costs?
3. What if each hire incurs an additional fixed overhead cost?

## Key Takeaway
Maintaining two min‑heaps for the selectable front and back candidates enables greedy selection of the cheapest available worker at each step, achieving optimal total cost.
