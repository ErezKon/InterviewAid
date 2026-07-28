# 3366. Minimum Array Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-array-sum](https://leetcode.com/problems/minimum-array-sum)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Oracle, Salesforce

---

## Problem Description

You are given an integer array `nums` and three integers `k`, `op1`, and `op2`. You may apply two types of operations on each element at most `op1` times for halving (rounding up) and `op2` times for subtracting `k` (if the element is at least `k`). Each operation can be used on any element, and the order of applying both operations on the same element matters. Return the minimum possible sum of the array after using at most the given number of each operation.

Constraints:
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `0 <= op1, op2 <= 10`
- `1 <= k <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [10,20,7], k = 5, op1 = 1, op2 = 1
Output: 22
Explanation: Apply op1 (halve) on 20 → 10, then op2 (subtract 5) on 10 → 5. Final array [10,5,7] sums to 22.
```

**Example 2:**
```
Input: nums = [3,8,6], k = 2, op1 = 2, op2 = 0
Output: 9
Explanation: Halve 8 → 4, then halve 4 → 2. Array becomes [3,2,6] sum = 11, but a better choice is halving 6 twice → 2, sum = 7. Minimum achievable sum is 9.
```

---

## Approach

**Algorithm:** Dynamic programming over the remaining counts of the two operations. For each element we consider four possibilities:
1. No operation.
2. Apply only op1.
3. Apply only op2 (if applicable).
4. Apply both operations in either order (op1→op2 or op2→op1) and keep the smaller resulting value.
We update a DP table `dp[i][j]` representing the minimum sum achievable with `i` remaining op1 and `j` remaining op2 after processing some prefix of the array.

Pseudocode:
```text
FUNCTION minArraySum(nums, k, op1, op2):
    n ← LEN(nums)
    // dp[i][j] = minimal sum with i op1 left and j op2 left
    CREATE dp[0..op1][0..op2] ← INFINITY
    dp[op1][op2] ← 0
    
    FOR val IN nums DO
        CREATE newDp[0..op1][0..op2] ← INFINITY
        FOR i ← 0 TO op1 DO
            FOR j ← 0 TO op2 DO
                IF dp[i][j] = INFINITY THEN CONTINUE
                // 1. No operation
                newDp[i][j] ← MIN(newDp[i][j], dp[i][j] + val)
                // 2. Only op1
                IF i > 0 THEN
                    v1 ← CEIL(val / 2)
                    newDp[i-1][j] ← MIN(newDp[i-1][j], dp[i][j] + v1)
                // 3. Only op2
                IF j > 0 AND val >= k THEN
                    v2 ← val - k
                    newDp[i][j-1] ← MIN(newDp[i][j-1], dp[i][j] + v2)
                // 4. Both operations (try both orders)
                IF i > 0 AND j > 0 THEN
                    // op1 then op2
                    temp ← CEIL(val / 2)
                    IF temp >= k THEN temp ← temp - k
                    // op2 then op1
                    temp2 ← val - k
                    IF temp2 >= 0 THEN temp2 ← CEIL(temp2 / 2)
                    best ← MIN(temp, temp2)
                    newDp[i-1][j-1] ← MIN(newDp[i-1][j-1], dp[i][j] + best)
        dp ← newDp
    
    RETURN MIN over all dp[i][j]
```
---

## Walkthrough

For `nums = [10,20,7]`, `k = 5`, `op1 = 1`, `op2 = 1`:
1. Start with `dp[1][1] = 0`.
2. Process `10`: options give new states `dp[1][1]=10`, `dp[0][1]=5` (halved), `dp[1][0]=5` (subtract), `dp[0][0]=5` (both → min(5,5)).
3. Process `20` similarly, updating each reachable state.
4. After the last element, the smallest entry in the DP table is `22`.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP over operation budgets | O(n · op1 · op2) | O(op1 · op2) |
---

## Follow‑Up Questions

1. How would the solution change if `op1` could be applied multiple times on the same element?
2. Can you design a greedy approximation when `op1` and `op2` are large (e.g., >10)?
3. What if the subtraction operation could be applied only when the element is even?
---

## Key Takeaway

> By treating the limited operations as resources and using DP to allocate them across elements, we obtain the optimal minimal sum.
