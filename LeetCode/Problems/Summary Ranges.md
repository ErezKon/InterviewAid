# 228. Summary Ranges

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/summary-ranges](https://leetcode.com/problems/summary-ranges)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Netflix, Vk, Yandex

---

```
FUNCTION summaryRanges(nums):
    result = []
    i = 0
    WHILE i < n:
        start = nums[i]
        WHILE i + 1 < n AND nums[i+1] == nums[i] + 1:
            i += 1
        IF start == nums[i]:
            result.ADD(str(start))
        ELSE:
            result.ADD(f"{start}->{nums[i]}")
        i += 1
    RETURN result
```
