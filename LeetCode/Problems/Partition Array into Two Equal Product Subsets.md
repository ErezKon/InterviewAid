# 3566. Partition Array into Two Equal Product Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-array-into-two-equal-product-subsets](https://leetcode.com/problems/partition-array-into-two-equal-product-subsets)
**Companies:** Meta

---

## Problem Description
Given an integer array `nums`, determine whether it can be partitioned into two subsets whose product of elements is equal. Return `true` if such a partition exists, otherwise `false`.

## Examples
**Example 1:**
```
Input: nums = [2,3,4,6]
Output: true
Explanation: Subsets {2,6} and {3,4} both have product 12.
```
**Example 2:**
```
Input: nums = [2,5,7]
Output: false
```

## Approach
The product equality condition can be transformed using logarithms: take `log` of each number, turning the product equality into a sum equality. The problem becomes a classic subset‑sum: can we select a subset whose sum of logs equals half of the total sum of logs? Because of floating‑point precision, we instead work with prime factorization. Compute the total exponent vector of prime factors for all numbers. The goal is to split the exponent vector equally between two subsets. This reduces to a multi‑dimensional knapsack which is NP‑hard, but given the constraints (small numbers, limited distinct primes), we can use backtracking with memoization on the exponent state.

```text
FUNCTION canPartitionEqualProduct(nums):
    // factor each number into prime exponent map
    totalExp ← MAP prime → total exponent
    FOR num IN nums:
        factors ← PRIME_FACTORIZE(num)
        FOR (p, e) IN factors:
            totalExp[p] ← totalExp.get(p, 0) + e
    // each total exponent must be even to allow equal split
    FOR e IN totalExp.VALUES():
        IF e MOD 2 = 1:
            RETURN FALSE
    // target exponent for each subset is half of total
    targetExp ← MAP p → totalExp[p] / 2
    memo ← SET()
    RETURN backtrack(0, EMPTY_MAP)

FUNCTION backtrack(idx, curExp):
    IF idx = LEN(nums):
        RETURN curExp = targetExp
    state ← (idx, TUPLE(sorted(curExp.items())))
    IF state IN memo:
        RETURN FALSE
    // try putting nums[idx] in subset A
    newExp ← ADD_EXP(curExp, FACTORS_OF(nums[idx]))
    IF all newExp[p] ≤ targetExp[p] FOR p IN newExp:
        IF backtrack(idx+1, newExp):
            RETURN TRUE
    // try putting nums[idx] in subset B (i.e., ignore for A)
    IF backtrack(idx+1, curExp):
        RETURN TRUE
    memo.ADD(state)
    RETURN FALSE
```

## Walkthrough
For `[2,3,4,6]`:
- Prime factors: 2→(1,0,2,1), 3→(0,1,0,1).
- Total exponents: 2→4, 3→2, both even.
- Target exponents: 2→2, 3→1.
- Backtrack picks 2 (adds 2^1), then 6 (adds 2^1,3^1) reaching target.
- Remaining numbers automatically form the other subset.

## Complexity Analysis
- **Time:** Exponential in the number of elements due to backtracking, but practical for ≤20 elements and limited distinct primes.
- **Space:** O(n) recursion depth plus memoization of visited states.

## Follow‑Up Questions
1. How would you handle larger arrays where backtracking is infeasible?
2. Can you design a DP using bitmask when the number of distinct primes is small?
3. What changes are needed if numbers can be zero or negative?

## Key Takeaway
Transforming product equality into equal prime‑exponent distribution enables a backtracking search that checks feasibility of splitting the array into two equal‑product subsets.
