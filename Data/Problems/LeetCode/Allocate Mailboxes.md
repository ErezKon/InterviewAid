# 1478. Allocate Mailboxes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/allocate-mailboxes](https://leetcode.com/problems/allocate-mailboxes)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google

---

## Problem Description
Given an array `houses` where `houses[i]` is the position of the i‑th house on a street (sorted or unsorted), and an integer `k` representing the number of mailboxes to install, place exactly `k` mailboxes at integer positions such that the sum of distances from each house to its nearest mailbox is minimized. Return the minimum possible total distance.

## Examples
**Example 1:**
```
Input: houses = [1,4,8,10,20], k = 3
Output: 5
Explanation: Place mailboxes at positions 3, 9, and 20.
Total distance = |1-3|+|4-3| + |8-9|+|10-9| + |20-20| = 5.
```
**Example 2:**
```
Input: houses = [2,3,5,12,18], k = 2
Output: 9
Explanation: Optimal mailboxes at 3 and 15.
```

## Approach
Use dynamic programming with pre‑computed median costs. The optimal mailbox for a contiguous segment of houses is at the median house, giving minimal sum of absolute distances.

```text
FUNCTION minDistance(houses, k):
    SORT houses
    n ← LEN(houses)
    // Pre‑compute cost[i][j] = distance sum for houses[i..j] with one mailbox at median
    FOR i ← 0 TO n-1:
        FOR j ← i TO n-1:
            median ← (i + j) // 2
            cost[i][j] ← SUM_{p=i}^{j} ABS(houses[p] - houses[median])
    // DP: dp[i][j] = min distance for first i+1 houses using j mailboxes
    CREATE dp[n][k+1] FILLED WITH INF
    FOR i ← 0 TO n-1:
        dp[i][1] ← cost[0][i]
    FOR mailboxes ← 2 TO k:
        FOR i ← mailboxes-1 TO n-1:
            FOR m ← mailboxes-2 TO i-1:
                dp[i][mailboxes] ← MIN(dp[i][mailboxes], dp[m][mailboxes-1] + cost[m+1][i])
    RETURN dp[n-1][k]
```

## Walkthrough
Consider `houses = [1,4,8,10,20]`, `k = 3`.
1. After sorting, compute `cost` matrix; e.g., `cost[0][1] = |1-1|+|4-1| = 3` (median at index 0).
2. DP initialization: `dp[0][1]=0`, `dp[1][1]=3`, `dp[2][1]=...`.
3. For `mailboxes=2`, evaluate splits: `dp[2][2] = min(dp[0][1]+cost[1][2], dp[1][1]+cost[2][2])` etc.
4. Continue until `dp[4][3]` yields 5.

## Complexity Analysis
- **Time:** O(n²·k) for DP (pre‑computing costs O(n²) and DP triple loop).
- **Space:** O(n²) for cost matrix and O(n·k) for DP table.

## Follow‑Up Questions
1. How can the solution be optimized to O(n·k) using prefix sums?
2. What changes if mailboxes can be placed at non‑integer positions?
3. How to handle very large `n` (e.g., 10⁵) with limited memory?

## Key Takeaway
Transform the problem into DP over sorted houses, using median‑based segment costs to achieve the minimal total distance.
