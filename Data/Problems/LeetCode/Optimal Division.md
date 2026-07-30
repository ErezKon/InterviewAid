# 553. Optimal Division

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/optimal-division](https://leetcode.com/problems/optimal-division)
**Companies:** Amazon

---

## Problem Description
Given an array of positive integers `nums`, insert parentheses and division operators between them to maximize the result of the expression. The expression must use all numbers in the original order, and you may only insert parentheses to change the order of evaluation. Return the string representation of the optimal expression.

## Examples
**Example 1**
```
nums = [1000,100,10,2]
Output: "1000/(100/10/2)"
Explanation: The optimal value is 1000 ÷ (100 ÷ 10 ÷ 2) = 200.
```
**Example 2**
```
nums = [2,3,4]
Output: "2/(3/4)"
Explanation: 2 ÷ (3 ÷ 4) = 2.666… is larger than (2 ÷ 3) ÷ 4 = 0.166….
```

## Approach
The maximum value is achieved by dividing the first number by the result of dividing all remaining numbers together. Therefore, for `n > 2` the optimal expression is:
```
nums[0] / (nums[1] / nums[2] / ... / nums[n-1])
```
For `n == 2` the expression is simply `nums[0]/nums[1]`. This follows from the property that dividing by a fraction multiplies the numerator.

```text
FUNCTION optimalDivision(nums):
    IF LENGTH(nums) == 2:
        RETURN STRING(nums[0]) + "/" + STRING(nums[1])
    SET inner ← STRING(nums[1])
    FOR i FROM 2 TO LENGTH(nums)-1:
        inner ← inner + "/" + STRING(nums[i])
    RETURN STRING(nums[0]) + "/(" + inner + ")"
```

## Walkthrough
For `nums = [1000,100,10,2]`:
1. Build inner string: start with "100".
2. Append "/10" → "100/10".
3. Append "/2" → "100/10/2".
4. Combine: "1000/(100/10/2)".
The expression evaluates to 200, which is maximal.

## Complexity Analysis
- **Time:** O(n) – one pass to build the string.
- **Space:** O(n) – the output string size.

## Follow‑Up Questions
1. How would the solution change if numbers could be negative?
2. Can you extend the approach to maximize/minimize the result when both addition and division are allowed?
3. What if the numbers must remain in the original order but you can also insert multiplication operators?

## Key Takeaway
To maximize a chain of divisions, keep the first number as the numerator and group all subsequent numbers inside a single denominator.
