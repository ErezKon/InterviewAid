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

A rope has colored balloons. No two **adjacent** balloons can have the same color. Remove balloons (costs `neededTime[i]`) to make the rope colorful. Return **minimum** total cost.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input: colors = "aabaa", neededTime = [1,2,3,4,1]
  Output: 2
  Explanation: Remove balloon 0 (cost 1) and balloon 4 (cost 1) = 2.
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
