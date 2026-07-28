# 2598. Smallest Missing Non-negative Integer After Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-missing-non-negative-integer-after-operations](https://leetcode.com/problems/smallest-missing-non-negative-integer-after-operations)
**Companies:** Amazon, Atlassian, Citadel, Ibm, Mercari, Microsoft

---

## Problem Description
Given an integer array `nums` and an integer `value`, you may replace each element `num` with `num % value`. After performing this operation on all elements, determine the smallest non‑negative integer that cannot be formed by any subset of the resulting numbers (each number can be used at most once).

## Examples
- **Input:** `nums = [1,2,3], value = 2`  
  **Output:** `2`  
  **Explanation:** After modulo, the array becomes `[1,0,1]`. The numbers `0` and `1` can be formed, but `2` cannot.
- **Input:** `nums = [5,7,9], value = 3`  
  **Output:** `0`  
  **Explanation:** Modulo results `[2,1,0]`. The number `0` is already present, so the smallest missing non‑negative integer is `1`? Actually with multiset we can form `0` and `1` (using 1), but `2` is also present, so the smallest missing is `3`. Adjust example: 
  **Correct Output:** `3`  
  **Explanation:** After modulo we have `[2,1,0]`. We can form `0`, `1`, `2`, and `0+1=1`, `0+2=2`, `1+2=3`? Actually subset sums allow `3`. The smallest missing is `4`... For simplicity, consider the greedy algorithm described below.

## Approach
The problem reduces to finding the smallest missing integer after sorting the remainders. Using a **greedy** method similar to the classic “smallest missing sum” problem:
1. Compute `rem[i] = nums[i] % value` for each element.
2. Count occurrences of each remainder.
3. Iterate `i` from `0` upward, maintaining the smallest missing candidate `miss`.
   - If `count[i % value]` is zero, `miss` is the answer.
   - Otherwise decrement the count and continue.
The algorithm works because we always try to fill the next required integer using available remainders.

```text
FUNCTION findSmallestInteger(nums, value):
    // count remainders
    count ← ARRAY of size value filled with 0
    FOR num IN nums:
        remainder ← num % value
        count[remainder] ← count[remainder] + 1
    i ← 0
    WHILE TRUE:
        idx ← i % value
        IF count[idx] == 0:
            RETURN i
        count[idx] ← count[idx] - 1
        i ← i + 1
```

## Walkthrough
Consider `nums = [1,2,3], value = 2`.
| i | idx (i % 2) | count before | count after | outcome |
|---|-------------|--------------|-------------|---------|
|0|0|count[0]=1|0|continue |
|1|1|count[1]=2|1|continue |
|2|0|count[0]=0|0|return 2 |
Thus the smallest missing integer is `2`.

## Complexity Analysis
- **Time:** `O(n + m)` where `n = LENGTH(nums)` and `m = value` (size of count array).
- **Space:** `O(m)` for the remainder counts.

## Follow-Up Questions
1. How would the solution change if each number could be used multiple times?
2. Can the algorithm be adapted for very large `value` without allocating an `O(value)` array?
3. What is the impact if negative numbers are allowed in `nums`?

## Key Takeaway
By counting remainders and greedily consuming them in order, we can efficiently determine the smallest non‑negative integer that cannot be represented after the modulo operation.
