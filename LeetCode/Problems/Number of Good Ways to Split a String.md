# 1525. Number of Good Ways to Split a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-good-ways-to-split-a-string](https://leetcode.com/problems/number-of-good-ways-to-split-a-string)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two Counter Pass — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Split string `s` into left and right non-empty parts. A split is "good" if both parts have the same number of **distinct** characters. Count good splits.

---

## 2. Key Insight

> Maintain left and right distinct counts as you move the split point. Start with everything on the right. Slide characters from right to left, updating both counters.

---

## 3. Approach: Two Counter Pass — O(n) ✅

```
FUNCTION numSplits(s):
    rightCount = Counter(s)
    leftCount = Counter()
    leftDistinct = 0; rightDistinct = len(rightCount)
    result = 0

    FOR ch IN s:
        leftCount[ch] += 1
        IF leftCount[ch] == 1: leftDistinct += 1
        rightCount[ch] -= 1
        IF rightCount[ch] == 0: rightDistinct -= 1
        IF leftDistinct == rightDistinct: result += 1

    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(26) = O(1) |

---

## 5. Key Takeaway

> **Sliding split with two frequency maps.** Transfer characters from right to left counter. Distinct counts update in O(1) per step.
