# 989. Add to Array-Form of Integer

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-to-array-form-of-integer](https://leetcode.com/problems/add-to-array-form-of-integer)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION addToArrayForm(num, k):
    FOR i ← len(num) - 1 DOWN TO 0:
        k, num[i] = divmod(num[i] + k, 10)
    WHILE k > 0:
        k, digit = divmod(k, 10)
        num.INSERT(0, digit)
    RETURN num
```
