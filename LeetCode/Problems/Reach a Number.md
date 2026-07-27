# 754. Reach a Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reach-a-number](https://leetcode.com/problems/reach-a-number)
**Companies:** Amazon, Bloomberg, Google, Ibm, Inmobi, Meesho, Meta, Microsoft

---

## Approach: Math — O(√target) ✅

```
FUNCTION reachNumber(target):
    target = ABS(target)
    step = 0
    sum = 0

    WHILE sum < target OR (sum - target) % 2 != 0:
        step += 1
        sum += step

    RETURN step
```

Sum 1+2+...+step ≥ target and (sum - target) is even (can flip one step's sign to reduce by exactly 2k).
