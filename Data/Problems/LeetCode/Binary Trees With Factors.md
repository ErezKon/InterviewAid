# 823. Binary Trees With Factors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-trees-with-factors](https://leetcode.com/problems/binary-trees-with-factors)
**Companies:** Google

---

## Problem Description
Given an array of unique integers, `arr`, where each integer `arr[i]` is strictly greater than `1`.

We make a binary tree using these integers, and each number may be used for any number of times. Each non-leaf node's value should be equal to the product of the values of its children.

Return *the number of binary trees we can make*. The answer may be too large so return the answer **modulo** `10⁹ + 7`.

**Constraints:**
- `1 ≤ arr.length ≤ 1000`
- `2 ≤ arr[i] ≤ 10⁹`
- All the values of `arr` are **unique**.

## Examples
```
Example 1:
  Input: arr = [2,4]
  Output: 3
  Explanation: We can make these trees: [2], [4], [4, 2, 2]

Example 2:
  Input: arr = [2,4,5,10]
  Output: 7
  Explanation: We can make these trees: [2], [4], [5], [10], [4, 2, 2], [10, 2, 5], [10, 5, 2].
```

## Approach
Sort the array. Use dynamic programming: for each number, consider all smaller numbers that divide it. If `num % left == 0` and `right = num / left` exists in the array, add `dp[left] * dp[right]` to `dp[num]`. The answer is the sum of all `dp` values modulo `10^9+7`.

```text
FUNCTION numFactoredBinaryTrees(arr):
    MOD ← 1_000_000_007
    SORT arr ASCENDING
    dp ← MAP from number TO 1  // each number alone forms a tree
    indexMap ← MAP from number TO its index in arr
    FOR i FROM 0 TO LENGTH(arr) - 1:
        num ← arr[i]
        FOR j FROM 0 TO i - 1:
            left ← arr[j]
            IF num MOD left == 0:
                right ← num / left
                IF right IN indexMap:
                    dp[num] ← (dp[num] + dp[left] * dp[right]) MOD MOD
    total ← 0
    FOR value IN dp VALUES:
        total ← (total + value) MOD MOD
    RETURN total
```

## Walkthrough
For `arr = [2,4,5,10]`:
1. Initialize `dp` = {2:1,4:1,5:1,10:1}.
2. `num=4`: `left=2` divides 4, `right=2` exists → `dp[4] += dp[2]*dp[2] = 1` → `dp[4]=2`.
3. `num=5`: no divisor pairs → `dp[5]=1`.
4. `num=10`: `left=2` → `right=5` exists → `dp[10] += dp[2]*dp[5] = 1`.
   `left=5` → `right=2` exists → `dp[10] += dp[5]*dp[2] = 1`.
   `dp[10]=3`.
5. Sum `dp` values: `1+2+1+3 = 7`.

## Complexity Analysis
- Time: O(n^2) – nested loops over sorted array.
- Space: O(n) – DP map and index map.

## Follow-Up Questions
- How would you adapt the solution if the array could contain duplicate values?
- Can you improve the time complexity using hash‑based lookups for divisor pairs?
- How does the problem change if you allow more than two children per node?

## Key Takeaway
Sorting the array and using DP to count trees for each value, while combining counts of factor pairs, yields an efficient solution for counting factor‑based binary trees.
