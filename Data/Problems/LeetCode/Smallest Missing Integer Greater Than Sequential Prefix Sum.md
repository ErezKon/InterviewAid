# 2996. Smallest Missing Integer Greater Than Sequential Prefix Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-missing-integer-greater-than-sequential-prefix-sum](https://leetcode.com/problems/smallest-missing-integer-greater-than-sequential-prefix-sum)
**Companies:** Google, Microsoft

---

## Problem Description
Given an array `nums` of positive integers, consider the running prefix sum while iterating through the array. Find the smallest positive integer `x` such that `x` is **strictly greater** than every prefix sum encountered. Return `x`.

## Examples
- **Input:** `nums = [1,2,3]`  
  **Output:** `7`  
  **Explanation:** Prefix sums are `1, 3, 6`. The smallest integer greater than all of them is `7`.
- **Input:** `nums = [2,2,2]`  
  **Output:** `7`  
  **Explanation:** Prefix sums `2, 4, 6`; next integer is `7`.

## Approach
Maintain a running sum while scanning the array. After processing each element, the candidate answer is `sum + 1`. The final answer is simply `totalSum + 1` because the sum only increases.

```text
FUNCTION smallestMissingGreaterThanPrefix(nums):
    total ← 0
    FOR num IN nums:
        total ← total + num
    RETURN total + 1
```

## Walkthrough
| Step | num | total (prefix sum) | candidate |
|------|-----|-------------------|-----------|
| 1    | 1   | 1                 | 2 |
| 2    | 2   | 3                 | 4 |
| 3    | 3   | 6                 | 7 |
The largest prefix sum is `6`; answer `6 + 1 = 7`.

## Complexity Analysis
- **Time:** `O(n)` – one pass through the array.
- **Space:** `O(1)` – only a few scalar variables.

## Follow-Up Questions
1. How would the solution change if negative numbers were allowed?
2. Can you compute the answer without storing the entire array (streaming input)?
3. What if we needed the smallest missing *non‑negative* integer instead?

## Key Takeaway
The smallest integer greater than all sequential prefix sums is simply one more than the total sum of the array.
