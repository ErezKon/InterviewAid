# 414. Third Maximum Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/third-maximum-number](https://leetcode.com/problems/third-maximum-number)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Nvidia, Tcs

---

```
FUNCTION thirdMax(nums):
    first = second = third = -infinity

    FOR num IN nums:
        IF num == first OR num == second OR num == third: CONTINUE
        IF num > first:
            third = second; second = first; first = num
        ELSE IF num > second:
            third = second; second = num
        ELSE IF num > third:
            third = num

    RETURN third IF third != -infinity ELSE first
```
