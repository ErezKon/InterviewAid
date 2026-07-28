# 1664. Ways to Make a Fair Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ways-to-make-a-fair-array](https://leetcode.com/problems/ways-to-make-a-fair-array)
**Companies:** Doordash, Dunzo, Flatiron Health, Meta, Microsoft, Phonepe, Twilio
---

## Problem Description
Given an integer array `nums`, you may remove exactly one element. After removal, the remaining elements shift left, so indices change parity (even/odd). An array is *fair* if the sum of elements at even indices equals the sum at odd indices. Return the number of indices whose removal makes the array fair.

## Examples
- Input: `nums = [2,1,6,4]` → Output: `1` (removing index 2 yields `[2,1,4]` with even sum 2+4=6 and odd sum 1).
- Input: `nums = [1,1,1]` → Output: `3` (removing any element leaves `[1,1]` which is fair).

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
