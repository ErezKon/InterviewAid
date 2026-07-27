# 2023. Number of Pairs of Strings With Concatenation Equal to Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-pairs-of-strings-with-concatenation-equal-to-target](https://leetcode.com/problems/number-of-pairs-of-strings-with-concatenation-equal-to-target)
**Companies:** Apple, Capital One

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Hash Map of Prefixes — O(n · L)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Count pairs `(i, j)` where `i ≠ j` and `nums[i] + nums[j] == target` (string concatenation).

---

## 2. Approach: Hash Map of Prefixes — O(n · L) ✅

```
FUNCTION numOfPairs(nums, target):
    count = Counter(nums)
    result = 0
    FOR num IN nums:
        IF target.startswith(num):
            suffix = target[len(num):]
            result += count[suffix]
            IF num == suffix: result -= 1    // can't pair with itself
    RETURN result
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · L) where L = target length |
| **Space** | O(n) |

---

## 4. Key Takeaway

> **Check if string is a prefix of target, then look up the remaining suffix in the counter.** Handle self-pairing edge case.
