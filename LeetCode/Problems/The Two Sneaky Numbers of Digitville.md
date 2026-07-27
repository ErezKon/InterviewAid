# 3289. The Two Sneaky Numbers of Digitville

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-two-sneaky-numbers-of-digitville](https://leetcode.com/problems/the-two-sneaky-numbers-of-digitville)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION getSneakyNumbers(nums):
    seen = set(); result = []
    FOR num IN nums:
        IF num IN seen: result.ADD(num)
        seen.ADD(num)
    RETURN result
```
