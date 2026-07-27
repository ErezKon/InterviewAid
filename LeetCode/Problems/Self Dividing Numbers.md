# 728. Self Dividing Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/self-dividing-numbers](https://leetcode.com/problems/self-dividing-numbers)
**Companies:** Amazon, Epic Systems, Google, Meta, Microsoft

---

## Problem Description

A **self-dividing number** is divisible by every digit it contains (no zeros allowed). Return all self-dividing numbers in `[left, right]`.

---

## Approach

```
FUNCTION selfDividingNumbers(left, right):
    FUNCTION isSelfDividing(n):
        FOR d IN str(n):
            IF d == '0' OR n % int(d) != 0: RETURN false
        RETURN true

    RETURN [i for i in range(left, right + 1) if isSelfDividing(i)]
```

| Time | Space |
|------|-------|
| O(n·d) where d = max digits | O(1) extra |
