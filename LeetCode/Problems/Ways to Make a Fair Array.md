# 1664. Ways to Make a Fair Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ways-to-make-a-fair-array](https://leetcode.com/problems/ways-to-make-a-fair-array)
**Companies:** Doordash, Dunzo, Flatiron Health, Meta, Microsoft, Phonepe, Twilio

---

## Approach: Prefix Sums — O(n) ✅

```
FUNCTION waysToMakeFair(nums):
    // After removing index i, odd/even indices swap for elements after i
    rightOdd = SUM(nums[i] for i odd)
    rightEven = SUM(nums[i] for i even)
    leftOdd = leftEven = 0
    count = 0

    FOR i ← 0 TO n - 1:
        IF i % 2 == 0: rightEven -= nums[i]
        ELSE: rightOdd -= nums[i]

        // After removal: leftEven + rightOdd == leftOdd + rightEven
        IF leftEven + rightOdd == leftOdd + rightEven:
            count += 1

        IF i % 2 == 0: leftEven += nums[i]
        ELSE: leftOdd += nums[i]

    RETURN count
```
