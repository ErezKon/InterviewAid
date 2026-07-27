# 2200. Find All K-Distant Indices in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-all-k-distant-indices-in-an-array](https://leetcode.com/problems/find-all-k-distant-indices-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta

---

```
FUNCTION findKDistantIndices(nums, key, k):
    result = set()
    FOR j, num IN enumerate(nums):
        IF num == key:
            FOR i ← MAX(0, j-k) TO MIN(len(nums)-1, j+k):
                result.ADD(i)
    RETURN sorted(result)
```
