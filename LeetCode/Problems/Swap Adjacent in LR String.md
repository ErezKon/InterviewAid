# 777. Swap Adjacent in LR String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/swap-adjacent-in-lr-string](https://leetcode.com/problems/swap-adjacent-in-lr-string)
**Companies:** Bloomberg, Google, Lg Electronics

---

```
FUNCTION canTransform(start, end):
    // Remove X's, remaining L/R must be same sequence
    IF start.replace('X','') != end.replace('X',''): RETURN false
    // L can only move left, R can only move right
    i = j = 0
    WHILE i < len(start) AND j < len(end):
        WHILE i < len(start) AND start[i] == 'X': i += 1
        WHILE j < len(end) AND end[j] == 'X': j += 1
        IF i == len(start) OR j == len(end): BREAK
        IF start[i] == 'L' AND i < j: RETURN false
        IF start[i] == 'R' AND i > j: RETURN false
        i += 1; j += 1
    RETURN true
```
