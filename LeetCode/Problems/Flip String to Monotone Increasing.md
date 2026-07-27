# 926. Flip String to Monotone Increasing

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flip-string-to-monotone-increasing](https://leetcode.com/problems/flip-string-to-monotone-increasing)
**Companies:** Amazon, Expedia, Google, Ibm, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP / Greedy — O(n) ✅](#3-approach-dp--greedy--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

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

```
FUNCTION minFlipsMonoIncr(s):
    ones = 0; flips = 0
    FOR c IN s:
        IF c == '1':
            ones += 1
        ELSE:
            flips = MIN(flips + 1, ones)
    RETURN flips
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **Track accumulated '1's** and running flip cost. At each '0', choose between flipping it or flipping all prior '1's. Elegant O(n)/O(1) DP.
