# 645. Set Mismatch

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/set-mismatch](https://leetcode.com/problems/set-mismatch)
**Companies:** Amazon, Bloomberg, Criteo, Github, Google, Meta, Microsoft

---

## Problem Description

Array `nums` contains numbers 1 to n with one number duplicated and one missing. Return `[duplicate, missing]`.

---

## Approach

```
FUNCTION findErrorNums(nums):
    count = Counter(nums)
    dup = miss = 0
    FOR i ← 1 TO len(nums):
        IF count[i] == 2: dup = i
        IF count[i] == 0: miss = i
    RETURN [dup, miss]
```

| Time | Space |
|------|-------|
| O(n) | O(n) |
