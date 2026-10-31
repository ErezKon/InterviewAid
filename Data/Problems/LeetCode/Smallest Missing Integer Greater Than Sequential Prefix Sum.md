# 2996. Smallest Missing Integer Greater Than Sequential Prefix Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/smallest-missing-integer-greater-than-sequential-prefix-sum](https://leetcode.com/problems/smallest-missing-integer-greater-than-sequential-prefix-sum)
**Companies:** Google, Microsoft

---

## Problem Description
**Note:** The updated title is **"Smallest Missing Integer Greater Than or Equal to Sequential Prefix Sum".**

You are given a **0-indexed** array of integers `nums`.

A prefix `nums[0..i]` is **sequential** if, for all `1 <= j <= i`, `nums[j] = nums[j - 1] + 1`. In particular, the prefix consisting only of `nums[0]` is **sequential**.

Return *the **smallest** integer* `x` *missing from* `nums` *such that* `x` *is greater than or equal to the sum of the **longest** sequential prefix.*

**Constraints:**
- `1 <= nums.length <= 50`
- `1 <= nums[i] <= 50`

## Examples
```
Example 1:
  Input: nums = [1,2,3,2,5]
  Output: 6
  Explanation: The longest sequential prefix of nums is [1,2,3] with a sum of 6. 6 is not in the array, therefore 6 is the smallest missing integer greater than or equal to the sum of the longest sequential prefix.
```

```
Example 2:
  Input: nums = [3,4,5,1,12,14,13]
  Output: 15
  Explanation: The longest sequential prefix of nums is [3,4,5] with a sum of 12. 12, 13, and 14 belong to the array while 15 does not. Therefore 15 is the smallest missing integer greater than or equal to the sum of the longest sequential prefix.
```

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
3. What if we needed the smallest missing *non-negative* integer instead?

## Key Takeaway
The smallest integer greater than all sequential prefix sums is simply one more than the total sum of the array.
