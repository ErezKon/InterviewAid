# 1394. Find Lucky Integer in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-lucky-integer-in-an-array](https://leetcode.com/problems/find-lucky-integer-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

```
FUNCTION findLucky(arr):
    count = Counter(arr)
    result = -1
    FOR num, c IN count.items():
        IF num == c: result = MAX(result, num)
    RETURN result
```
