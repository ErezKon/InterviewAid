# 755. Pour Water

**Difficulty:** 🟡 Medium
**Companies:** Airbnb, Oracle

---

## Problem Description
Given an integer array `heights` representing the elevation map where `heights[i]` is the height of the i‑th column, and an integer `V` denoting the total volume of water to pour, simulate pouring each unit of water at index `k`. For each unit, water first tries to flow left to the nearest lower height, then right if left is not possible, and finally stays at `k` if neither side can accept water. Return the final state of the `heights` array after all `V` units have been poured.

## Examples
**Example 1:**
```
Input: heights = [2,1,1,2,1,2,2], V = 4, k = 3
Output: [2,2,2,3,2,2,2]
Explanation: Water flows left to index 1, then left to index 0, then right to index 4, then stays at k.
```
**Example 2:**
```
Input: heights = [1,2,3,4], V = 2, k = 2
Output: [1,2,4,4]
Explanation: Both units flow left to index 1 then stay because left side is higher.
```

## Approach
**Algorithm:** Simulate each unit with a two‑pointer scan (left then right) – O(V·n) worst case, but acceptable for typical constraints.
**Key Insight:** For each drop, find the leftmost position with a strictly lower height than the current position; if none, repeat the search to the right. Updating the height at the chosen index simulates water accumulation.

```text
FUNCTION pourWater(heights, V, k):
    n ← LENGTH(heights)
    REPEAT V TIMES:
        // try left side
        left ← k
        WHILE left > 0 AND heights[left] >= heights[left-1]:
            left ← left - 1
        IF heights[left] < heights[k]:
            heights[left] ← heights[left] + 1
            CONTINUE
        // try right side
        right ← k
        WHILE right < n-1 AND heights[right] >= heights[right+1]:
            right ← right + 1
        IF heights[right] < heights[k]:
            heights[right] ← heights[right] + 1
            CONTINUE
        // stay at k
        heights[k] ← heights[k] + 1
    RETURN heights
```

## Walkthrough
For `heights=[2,1,1,2,1,2,2]`, `V=4`, `k=3`:
1. Drop 1: left scan stops at index 1 (height 1 < 2) → heights[1]=2.
2. Drop 2: left scan now stops at index 0 (height 2 == 2, continue left to 0) → heights[0]=3.
3. Drop 3: left cannot go lower, right scan stops at index 4 (height 1 < 2) → heights[4]=2.
4. Drop 4: both sides equal, water stays at `k` → heights[3]=3.
Result `[2,2,2,3,2,2,2]`.

## Complexity Analysis
- **Time:** O(V·n) in the worst case, where `V` is the volume and `n` the number of columns.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you improve the algorithm to O(n + V log n) using a priority queue?
2. Can the solution be adapted for a 2‑D terrain grid?
3. What changes are needed if water can flow over equal heights as well as lower ones?

## Key Takeaway
Simulating each unit of water by scanning left then right finds the nearest lower spot, and updating that spot models the accumulation process.
