# 1013. Partition Array Into Three Parts With Equal Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum](https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Turing

---

```
FUNCTION canThreePartsEqualSum(arr):
    total = SUM(arr)
    IF total % 3 != 0: RETURN false
    target = total / 3
    parts = 0; currSum = 0
    FOR num IN arr:
        currSum += num
        IF currSum == target * (parts + 1):
            parts += 1
        IF parts == 2: RETURN true    // third part is remainder
    RETURN false
```
