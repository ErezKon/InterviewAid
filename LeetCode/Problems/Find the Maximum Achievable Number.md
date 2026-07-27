# 2769. Find the Maximum Achievable Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-achievable-number](https://leetcode.com/problems/find-the-maximum-achievable-number)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Math — O(1) ✅](#4-approach-math--o1-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given integers `num` and `t`, find the maximum achievable number `x` such that `x` can become equal to `num` after applying at most `t` operations. In one operation, you can increase or decrease `x` by 1 and simultaneously increase or decrease `num` by 1.

**Constraints:**
- `1 <= num, t <= 50`

---

## 2. Examples

```
Example 1:
  Input:  num = 4, t = 1
  Output: 6
  Reason: x=6, decrease x and increase num → x=5, num=5. Equal in 1 step.
```

---

## 3. Key Insight

> Each operation can close the gap by 2 (decrease x by 1 AND increase num by 1). So the maximum starting gap is `2 * t`, meaning `x = num + 2 * t`.

---

## 4. Approach: Math — O(1) ✅

```
FUNCTION theMaximumAchievableX(num, t):
    RETURN num + 2 * t
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> Each operation reduces the gap by 2 (move x down by 1 and num up by 1). Maximum x = `num + 2t`.
