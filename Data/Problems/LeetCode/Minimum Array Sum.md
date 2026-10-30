# 3366. Minimum Array Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-array-sum](https://leetcode.com/problems/minimum-array-sum)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Oracle, Salesforce

---

## Problem Description

You are given an integer array `nums` and three integers `k`, `op1`, and `op2`.

You can perform the following operations on `nums`:
- **Operation 1**: Choose an index `i` and divide `nums[i]` by 2, **rounding up** to the nearest whole number. You can perform this operation at most `op1` times, and not more than **once** per index.
- **Operation 2**: Choose an index `i` and subtract `k` from `nums[i]`, but only if `nums[i]` is greater than or equal to `k`. You can perform this operation at most `op2` times, and not more than **once** per index.

**Note:** Both operations can be applied to the same index, but at most once each.

Return the **minimum** possible **sum** of all elements in `nums` after performing any number of operations.

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 10^5`
- `0 <= k <= 10^5`
- `0 <= op1, op2 <= nums.length`

---

## Examples

```
Example 1:
  Input: nums = [2,8,3,19,3], k = 3, op1 = 1, op2 = 1
  Output: 23
  Explanation:
  - Apply Operation 2 to nums[1] = 8, making nums[1] = 5.
  - Apply Operation 1 to nums[3] = 19, making nums[3] = 10.
  - The resulting array becomes [2, 5, 3, 10, 3], which has the minimum possible sum of 23 after applying the operations.
```

```
Example 2:
  Input: nums = [2,4,3], k = 3, op1 = 2, op2 = 1
  Output: 3
  Explanation:
  - Apply Operation 1 to nums[0] = 2, making nums[0] = 1.
  - Apply Operation 1 to nums[1] = 4, making nums[1] = 2.
  - Apply Operation 2 to nums[2] = 3, making nums[2] = 0.
  - The resulting array becomes [1, 2, 0], which has the minimum possible sum of 3 after applying the operations.
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
