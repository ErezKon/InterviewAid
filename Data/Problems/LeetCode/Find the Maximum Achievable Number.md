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

Given two integers, `num` and `t`. A **number** `x` is **achievable** if it can become equal to `num` after applying the following operation **at most** `t` times:

- Increase or decrease `x` by `1`, and *simultaneously* increase or decrease `num` by `1`.

Return the **maximum** possible value of `x`.

**Constraints:**
- `1 <= num, t <= 50`

---

## 2. Examples

```
Example 1:
  Input: num = 4, t = 1
  Output: 6
  Explanation: Apply the following operation once to make the maximum achievable number equal to num:
    - Decrease the maximum achievable number by 1, and increase num by 1.

Example 2:
  Input: num = 3, t = 2
  Output: 7
  Explanation: Apply the following operation twice to make the maximum achievable number equal to num:
    - Decrease the maximum achievable number by 1, and increase num by 1.
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
