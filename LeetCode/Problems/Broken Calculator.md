# 991. Broken Calculator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/broken-calculator](https://leetcode.com/problems/broken-calculator)
**Companies:** Bloomberg, Google, Microsoft, Nutanix, Zopsmart

---

```
FUNCTION brokenCalc(startValue, target):
    ops = 0
    WHILE target > startValue:
        IF target % 2 == 0:
            target /= 2
        ELSE:
            target += 1
        ops += 1
    RETURN ops + startValue - target
```

Work backwards: divide when even, add 1 when odd. Then subtract remaining difference.
