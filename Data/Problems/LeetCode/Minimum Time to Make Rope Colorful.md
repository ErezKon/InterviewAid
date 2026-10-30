# 1578. Minimum Time to Make Rope Colorful

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-make-rope-colorful](https://leetcode.com/problems/minimum-time-to-make-rope-colorful)
**Companies:** Amazon, Bloomberg, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy — O(n)](#4-approach-greedy--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Alice has `n` balloons arranged on a rope. You are given a **0-indexed** string `colors` where `colors[i]` is the color of the `i^th` balloon.

Alice wants the rope to be **colorful**. She does not want **two consecutive balloons** to be of the same color, so she asks Bob for help. Bob can remove some balloons from the rope to make it **colorful**. You are given a **0-indexed** integer array `neededTime` where `neededTime[i]` is the time (in seconds) that Bob needs to remove the `i^th` balloon from the rope.

Return *the **minimum time** Bob needs to make the rope **colorful***.

**Constraints:**
- `n == colors.length == neededTime.length`
- `1 <= n <= 10^5`
- `1 <= neededTime[i] <= 10^4`
- `colors` contains only lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: colors = "abaac", neededTime = [1,2,3,4,5]
Output: 3
Explanation: In the above image, 'a' is blue, 'b' is red, and 'c' is green.
Bob can remove the blue balloon at index 2. This takes 3 seconds.
There are no longer two consecutive balloons of the same color. Total time = 3.
```

**Example 2:**
```
Input: colors = "abc", neededTime = [1,2,3]
Output: 0
Explanation: The rope is already colorful. Bob does not need to remove any balloons from the rope.
```

**Example 3:**
```
Input: colors = "aabaa", neededTime = [1,2,3,4,1]
Output: 2
Explanation: Bob will remove the balloons at indices 0 and 4. Each balloons takes 1 second to remove.
There are no longer two consecutive balloons of the same color. Total time = 1 + 1 = 2.
```

---

## 3. Key Insight

> In each group of consecutive same-color balloons, keep the one with the **maximum** removal time (removing it is costliest, so keep it). Remove all others. Cost = group sum - group max.

---

## 4. Approach: Greedy — O(n) ✅

```
FUNCTION minCost(colors, neededTime):
    total = 0
    FOR i ← 1 TO len(colors) - 1:
        IF colors[i] == colors[i-1]:
            total += MIN(neededTime[i], neededTime[i-1])
            neededTime[i] = MAX(neededTime[i], neededTime[i-1])
    RETURN total
```

---

## 5. Walkthrough

```
colors = "aabaa", neededTime = [1,2,3,4,1]

i=1: 'a'=='a' → total += min(2,1)=1. neededTime[1]=max(2,1)=2
i=2: 'b'!='a' → skip
i=3: 'a'!='b' → skip
i=4: 'a'=='a' → total += min(1,4)=1. neededTime[4]=max(1,4)=4

Total = 1+1 = 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass |
| **Space** | O(1) — in-place modification |

---

## 7. Key Takeaway

> **Greedy: keep the most expensive, remove the rest.** For consecutive duplicates, always remove the cheaper one and carry forward the max cost. Simple pairwise comparison handles groups of any length.
