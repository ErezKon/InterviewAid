# 1224. Maximum Equal Frequency

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-equal-frequency](https://leetcode.com/problems/maximum-equal-frequency)
**Companies:** American Express

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Frequency of Frequencies — O(n)](#approach-frequency-of-frequencies--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Find the longest prefix of `nums` such that after removing exactly one element, all remaining elements have equal frequency.

---

## Key Insight

> Track `count[val]` (frequency of each value) and `countFreq[f]` (how many values have frequency f). At each prefix, check if removing one element makes all frequencies equal. Valid cases:
> 1. All values have freq 1 (remove any)
> 2. Only one unique value (remove one occurrence)
> 3. All have freq f except one with freq f+1 (remove from the f+1 one)
> 4. All have freq f except one with freq 1 (remove that one entirely)

---

## Approach: Frequency of Frequencies — O(n) ✅

```
FUNCTION maxEqualFreq(nums):
    count = {}; countFreq = {}
    maxFreq = 0; result = 0
    FOR i ← 0 TO n - 1:
        // Update count and countFreq
        f = count.get(nums[i], 0)
        IF f > 0: countFreq[f] -= 1
        count[nums[i]] = f + 1
        countFreq[f+1] = countFreq.get(f+1, 0) + 1
        maxFreq = MAX(maxFreq, f + 1)

        numUnique = len(count with count > 0)
        // Check valid removal conditions
        IF maxFreq == 1: result = i + 1
        ELIF maxFreq * countFreq[maxFreq] == i: result = i + 1
        ELIF (maxFreq - 1) * numUnique + 1 == i + 1: result = i + 1
        ELIF numUnique == 1: result = i + 1

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Freq of freq | **O(n)** | O(n) |

---

## Key Takeaway

> **"Remove one to equalize frequencies" requires tracking frequency-of-frequencies.** Check the 4 valid cases at each prefix length.
