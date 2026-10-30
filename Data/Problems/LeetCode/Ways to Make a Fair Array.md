# 1664. Ways to Make a Fair Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ways-to-make-a-fair-array](https://leetcode.com/problems/ways-to-make-a-fair-array)
**Companies:** Doordash, Dunzo, Flatiron Health, Meta, Microsoft, Phonepe, Twilio

---

## Problem Description

You are given an integer array `nums`. You can choose **exactly one** index (**0-indexed**) and remove the element. Notice that the index of the elements may change after the removal.

For example, if `nums = [6,1,7,4,1]`:

- Choosing to remove index `1` results in `nums = [6,7,4,1]`.
- Choosing to remove index `2` results in `nums = [6,1,4,1]`.
- Choosing to remove index `4` results in `nums = [6,1,7,4]`.

An array is **fair** if the sum of the odd-indexed values equals the sum of the even-indexed values.

Return the ***number** of indices that you could choose such that after the removal,* `nums` *is **fair**.*

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^4`

## Examples

**Example 1:**
```
Input: nums = [2,1,6,4]
Output: 1
Explanation:
Remove index 0: [1,6,4] -> Even sum: 1 + 4 = 5. Odd sum: 6. Not fair.
Remove index 1: [2,6,4] -> Even sum: 2 + 4 = 6. Odd sum: 6. Fair.
Remove index 2: [2,1,4] -> Even sum: 2 + 4 = 6. Odd sum: 1. Not fair.
Remove index 3: [2,1,6] -> Even sum: 2 + 6 = 8. Odd sum: 1. Not fair.
There is 1 index that you can remove to make nums fair.
```

**Example 2:**
```
Input: nums = [1,1,1]
Output: 3
Explanation: You can remove any index and the remaining array is fair.
```

**Example 3:**
```
Input: nums = [1,2,3]
Output: 0
Explanation: You cannot make a fair array after removing any index.
```

## Approach
Use prefix sums for even and odd positions. While iterating, maintain left even/odd sums and right even/odd sums (excluding current index). After removing index `i`, the parity of elements to the right swaps, so the condition becomes `leftEven + rightOdd == leftOdd + rightEven`.

```text
FUNCTION waysToMakeFair(nums):
    SET n ← LENGTH(nums)
    SET rightEven ← SUM of nums at even indices
    SET rightOdd ← SUM of nums at odd indices
    SET leftEven ← 0
    SET leftOdd ← 0
    SET count ← 0
    FOR i ← 0 TO n-1:
        IF i MOD 2 = 0:
            SET rightEven ← rightEven - nums[i]
        ELSE:
            SET rightOdd ← rightOdd - nums[i]
        IF leftEven + rightOdd = leftOdd + rightEven:
            SET count ← count + 1
        IF i MOD 2 = 0:
            SET leftEven ← leftEven + nums[i]
        ELSE:
            SET leftOdd ← leftOdd + nums[i]
    RETURN count
```

## Walkthrough
| i | nums[i] | leftEven | leftOdd | rightEven | rightOdd | Fair? |
|---|---------|----------|---------|-----------|----------|-------|
| 0 | 2 | 0 | 0 | 6 | 5 | No |
| 1 | 1 | 2 | 0 | 6 | 4 | No |
| 2 | 6 | 2 | 1 | 0 | 4 | Yes |
| 3 | 4 | 8 | 1 | 0 | 0 | No |
Only index 2 works → count = 1.

## Complexity Analysis
- Time: O(n) – single pass.
- Space: O(1) extra space.

## Follow‑Up Questions
- How would you extend this to allow removal of up to two elements?
- What if the fairness condition required equality of sums modulo a given number?
- Can you compute the number of ways without explicit prefix sums using a single pass?

## Key Takeaway
Maintaining left/right even‑odd prefix sums lets you test each removal in constant time.
