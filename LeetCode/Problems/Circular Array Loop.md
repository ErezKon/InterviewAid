# 457. Circular Array Loop

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/circular-array-loop](https://leetcode.com/problems/circular-array-loop)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Microsoft

---

```
FUNCTION circularArrayLoop(nums):
    n = len(nums)
    FOR i ← 0 TO n - 1:
        IF nums[i] == 0: CONTINUE
        slow = fast = i
        WHILE true:
            nextSlow = getNext(nums, slow)
            nextFast = getNext(nums, getNext(nums, fast))
            // Check same direction and length > 1
            IF slow == nextSlow: BREAK
            IF nums[slow] * nums[nextSlow] < 0: BREAK
            slow = nextSlow; fast = nextFast
            IF slow == fast: RETURN true
    RETURN false

FUNCTION getNext(nums, i):
    RETURN ((i + nums[i]) % n + n) % n
```
