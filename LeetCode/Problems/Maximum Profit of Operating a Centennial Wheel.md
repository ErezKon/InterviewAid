# 1599. Maximum Profit of Operating a Centennial Wheel

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-profit-of-operating-a-centennial-wheel](https://leetcode.com/problems/maximum-profit-of-operating-a-centennial-wheel)
**Companies:** Peak6

---

## Problem Description
Given an array `profits` where `profits[i]` denotes the profit earned in the i‑th minute of operating a centennial wheel, you may choose a contiguous time window of any length to run the wheel. The wheel can be started at any minute and runs continuously; you collect the sum of profits within the chosen window. Return the maximum possible profit.

Constraints: `1 <= profits.length <= 10^5`, `-10^4 <= profits[i] <= 10^4`.

## Examples
| profits | Output | Explanation |
|---------|--------|-------------|
| [1, -2, 3, 5, -1] | 8 | Choose window `[3,5]` → 3+5 = 8 |
| [-3, -2, -1] | -1 | Best you can do is pick the least negative value |

## Approach
**Greedy – Kadane’s algorithm**
The maximum sum sub‑array can be found in linear time by maintaining a running sum and resetting it when it becomes negative.

### Pseudocode
```text
FUNCTION maxProfit(profits):
    SET maxSoFar ← profits[0]
    SET current ← profits[0]
    FOR i ← 1 TO LENGTH(profits) - 1:
        SET current ← MAX(profits[i], current + profits[i])
        SET maxSoFar ← MAX(maxSoFar, current)
    RETURN maxSoFar
```

## Walkthrough
Consider `profits = [1, -2, 3, 5, -1]`:
| i | profit[i] | current (max ending here) | maxSoFar |
|---|-----------|---------------------------|---------|
|0|1|1|1|
|1|-2|MAX(-2, 1+(-2)) = -1|1|
|2|3|MAX(3, -1+3)=3|3|
|3|5|MAX(5, 3+5)=8|8|
|4|-1|MAX(-1, 8+(-1))=7|8|
The final `maxSoFar` is 8.

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few scalar variables.

## Follow‑Up Questions
1. How would you modify the algorithm to also return the start and end indices of the optimal window?
2. What if you are allowed to pick at most two non‑overlapping windows?
3. How does the solution change if the wheel must run for at least `k` minutes?

## Key Takeaway
Kadane’s algorithm efficiently finds the maximum‑sum contiguous sub‑array by greedily extending the current window only when it improves the total.
