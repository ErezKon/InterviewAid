# 611. Valid Triangle Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/valid-triangle-number](https://leetcode.com/problems/valid-triangle-number)
**Companies:** Amazon, Att, Bloomberg, Expedia, Goldman Sachs, Google, Linkedin, Meta, Microsoft

---

## Approach: Sort + Two Pointers — O(n²) ✅

```
FUNCTION triangleNumber(nums):
    SORT nums
    count = 0

    FOR k ← n - 1 DOWN TO 2:
        i, j = 0, k - 1
        WHILE i < j:
            IF nums[i] + nums[j] > nums[k]:
                count += j - i    // all pairs (i..j-1, j) are valid
                j -= 1
            ELSE:
                i += 1

    RETURN count
```

Fix the largest side, then two-pointer for valid pairs. Triangle inequality: a + b > c.
