# 2678. Number of Senior Citizens

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-senior-citizens](https://leetcode.com/problems/number-of-senior-citizens)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: String Parsing — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Each string encodes passenger info. Characters at indices 11-12 represent age. Count passengers older than 60.

---

## 2. Approach: String Parsing — O(n) ✅

```
FUNCTION countSeniors(details):
    RETURN SUM(1 for d in details if int(d[11:13]) > 60)
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Extract age from fixed positions.** Parse substring at indices 11-12, compare to threshold.
