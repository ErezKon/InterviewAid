# 330. Patching Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/patching-array](https://leetcode.com/problems/patching-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Approach: Greedy — O(n + log n) ✅

```
FUNCTION minPatches(nums, n):
    patches = 0
    reach = 0    // can represent [1, reach]
    i = 0

    WHILE reach < n:
        IF i < len(nums) AND nums[i] <= reach + 1:
            reach += nums[i]
            i += 1
        ELSE:
            // Patch with reach + 1
            reach += reach + 1
            patches += 1

    RETURN patches
```

If we can cover [1, reach], adding `reach+1` extends to [1, 2*reach+1]. Doubles the range each patch.
