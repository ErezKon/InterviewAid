# 2598. Smallest Missing Non-negative Integer After Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-missing-non-negative-integer-after-operations](https://leetcode.com/problems/smallest-missing-non-negative-integer-after-operations)
**Companies:** Amazon, Atlassian, Citadel, Ibm, Mercari, Microsoft

---

```
FUNCTION findSmallestInteger(nums, value):
    count = Counter(num % value for num in nums)
    FOR i ← 0 TO len(nums):
        IF count[i % value] == 0: RETURN i
        count[i % value] -= 1
    RETURN len(nums)
```

After operations, each number maps to its remainder mod value. Greedily assign 0, 1, 2, ...
