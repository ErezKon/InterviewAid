# 926. Flip String to Monotone Increasing

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flip-string-to-monotone-increasing](https://leetcode.com/problems/flip-string-to-monotone-increasing)
**Companies:** Amazon, Expedia, Google, Ibm, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP / Greedy — O(n) ✅](#3-approach-dp--greedy--on-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a binary string `s`, return the minimum number of flips to make it **monotone increasing** (all 0s before all 1s).

**Constraints:**
- `1 <= s.length <= 10⁵`

---

## 2. Key Insight

> At each '0', we either flip it to '1' (cost +1) or flip all preceding '1's to '0' (cost = count of '1's so far). Take the minimum.

---

## 3. Approach: DP / Greedy — O(n) ✅

```text
FUNCTION minFlipsMonoIncr(s):
    ones ← 0
    flips ← 0
    FOR c IN s:
        IF c == '1':
            ones ← ones + 1
        ELSE:
            // c is '0'
            flips ← MIN(flips + 1, ones)
    RETURN flips
```

---

## 4. Examples

**Example 1:**
```
Input: s = "00110"
Output: 1
Explanation: Flip the last '0' to '1' → "00111".
```

**Example 2:**
```
Input: s = "010110"
Output: 2
Explanation: Flip the second '1' to '0' and the last '0' to '1' → "000111".
```

---

## 5. Walkthrough

| Index | Char | ones so far | flips so far | Decision |
|-------|------|------------|-------------|----------|
| 0 | 0 | 0 | MIN(0+1,0)=0 | keep 0 |
| 1 | 0 | 0 | MIN(0+1,0)=0 | keep 0 |
| 2 | 1 | 1 | 0 | keep 1 |
| 3 | 1 | 2 | 0 | keep 1 |
| 4 | 0 | 2 | MIN(0+1,2)=1 | flip this 0 to 1 |
| 5 | 0 | 2 | MIN(1+1,2)=2 | flip this 0 to 1 (optional) |

Resulting flips = 1 (optimal).

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Track accumulated '1's** and running flip cost. At each '0', choose between flipping it or flipping all prior '1's. Elegant O(n)/O(1) DP.
