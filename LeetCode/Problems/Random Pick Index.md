# 398. Random Pick Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/random-pick-index](https://leetcode.com/problems/random-pick-index)
**Companies:** Amazon, Google, Meta

---

```
CLASS Solution:
    CONSTRUCTOR(nums): self.nums = nums

    FUNCTION pick(target):
        // Reservoir sampling
        count = 0; result = -1
        FOR i, num IN enumerate(nums):
            IF num == target:
                count += 1
                IF random(1, count) == 1: result = i
        RETURN result
```
