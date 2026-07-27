# 565. Array Nesting

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Apple
---

```
FUNCTION arrayNesting(nums):
    maxLen = 0; visited = [false] * len(nums)
    FOR i ← 0 TO len(nums) - 1:
        IF visited[i]: CONTINUE
        count = 0; j = i
        WHILE NOT visited[j]:
            visited[j] = true; j = nums[j]; count += 1
        maxLen = MAX(maxLen, count)
    RETURN maxLen
```
