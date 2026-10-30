# 2462. Total Cost to Hire K Workers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/total-cost-to-hire-k-workers](https://leetcode.com/problems/total-cost-to-hire-k-workers)
**Companies:** Bloomberg, Gsa Capital, Mathworks, Microsoft

---

## Problem Description

You are given a **0-indexed** integer array `costs` where `costs[i]` is the cost of hiring the `i`th worker.

You are also given two integers `k` and `candidates`. We want to hire exactly `k` workers according to the following rules:

- You will run `k` sessions and hire exactly one worker in each session.
- In each hiring session, choose the worker with the lowest cost from either the first `candidates` workers or the last `candidates` workers. Break the tie by the smallest index.
  - For example, if `costs = [3,2,7,7,1,2]` and `candidates = 2`, then in the first hiring session, we will choose the `4`th worker because they have the lowest cost `[3,2,7,7,1,2]`.
  - In the second hiring session, we will choose `1`st worker because they have the same lowest cost as `4`th worker but they have the smallest index `[3,2,7,7,2]`. Please note that the indexing may be changed in the process.
- If there are fewer than candidates workers remaining, choose the worker with the lowest cost among them. Break the tie by the smallest index.
- A worker can only be chosen once.

Return *the total cost to hire exactly* `k` *workers.*

**Constraints:**
- `1 <= costs.length <= 10^5`
- `1 <= costs[i] <= 10^5`
- `1 <= k, candidates <= costs.length`

## Examples

**Example 1:**
```
Input: costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4
Output: 11
Explanation: We hire 3 workers in total. The total cost is initially 0.
- In the first hiring round we choose the worker from [17,12,10,2,7,2,11,20,8]. The lowest cost is 2, and we break the tie by the smallest index, which is 3. The total cost = 0 + 2 = 2.
- In the second hiring round we choose the worker from [17,12,10,7,2,11,20,8]. The lowest cost is 2 (index 4). The total cost = 2 + 2 = 4.
- In the third hiring round we choose the worker from [17,12,10,7,11,20,8]. The lowest cost is 7 (index 3). The total cost = 4 + 7 = 11. Notice that the worker with index 3 was common in the first and last four workers.
The total hiring cost is 11.
```

**Example 2:**
```
Input: costs = [1,2,4,1], k = 3, candidates = 3
Output: 4
Explanation: We hire 3 workers in total. The total cost is initially 0.
- In the first hiring round we choose the worker from [1,2,4,1]. The lowest cost is 1, and we break the tie by the smallest index, which is 0. The total cost = 0 + 1 = 1. Notice that workers with index 1 and 2 are common in the first and last 3 workers.
- In the second hiring round we choose the worker from [2,4,1]. The lowest cost is 1 (index 2). The total cost = 1 + 1 = 2.
- In the third hiring round there are less than three candidates. We choose the worker from the remaining workers [2,4]. The lowest cost is 2 (index 0). The total cost = 2 + 2 = 4.
The total hiring cost is 4.
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
