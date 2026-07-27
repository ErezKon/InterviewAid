# 1814. Count Nice Pairs in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-nice-pairs-in-an-array](https://leetcode.com/problems/count-nice-pairs-in-an-array)
**Companies:** Capital One, Google, Meta, Roblox, Square, Uber

---

```
FUNCTION countNicePairs(nums):
    MOD = 10^9 + 7
    // nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])
    // ⟹ nums[i] - rev(nums[i]) == nums[j] - rev(nums[j])
    diff = [num - int(str(num)[::-1]) for num in nums]
    count = Counter(diff)
    result = 0
    FOR c IN count.values():
        result = (result + c * (c - 1) / 2) % MOD
    RETURN result
```

Rearrange the equation. Group by (num - rev(num)). Count pairs within each group.
