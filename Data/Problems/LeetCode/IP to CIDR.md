# 751. IP to CIDR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ip-to-cidr](https://leetcode.com/problems/ip-to-cidr)
**Companies:** Airbnb, Databricks, Google, Openai

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Largest Block — O(log n) ✅](#4-approach-greedy-largest-block--olog-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a start IP address `ip` and an integer `n`, return the **minimum** list of CIDR blocks that cover exactly `n` IPs starting from `ip`.

**Constraints:**
- `ip` is a valid IPv4 address.
- `1 <= n <= 1000`

---

## 2. Examples

```
Input: ip = "255.0.0.7", n = 10
Output: ["255.0.0.7/32","255.0.0.8/29","255.0.0.16/32"]
(covers IPs 7, 8-15, 16 → total 1+8+1 = 10)
```

---

## 3. Key Insight

At each step, find the **largest CIDR block** starting at the current IP that doesn't exceed the remaining count. The block size is constrained by:
1. The **alignment** of the start IP (trailing zeros in binary)
2. The **remaining count** `n`

Take the minimum of these two constraints.

---

## 4. Approach: Greedy Largest Block — O(log n) ✅

```
FUNCTION ipToCIDR(ip, n):
    start = ipToInt(ip)
    result = []
    WHILE n > 0:
        // Find largest block starting at 'start' that fits in n
        trailingZeros = countTrailingZeros(start) IF start > 0 ELSE 32
        bits = MIN(trailingZeros, floor(log2(n)))
        result.ADD(intToIP(start) + "/" + str(32 - bits))
        start += 1 << bits
        n -= 1 << bits
    RETURN result
```

---

## 5. Walkthrough

```
ip = "255.0.0.7" → start = ...00000111 (binary), n = 10
```

| Step | start (last octet) | Trailing 0s | log2(n) | bits | Block size | CIDR | Remaining |
|------|-------------------|------------|---------|------|-----------|------|-----------|
| 1 | 7 (0111) | 0 | 3 | 0 | 1 | /32 | 9 |
| 2 | 8 (1000) | 3 | 3 | 3 | 8 | /29 | 1 |
| 3 | 16 (10000) | 4 | 0 | 0 | 1 | /32 | 0 |

**Result:** `["255.0.0.7/32", "255.0.0.8/29", "255.0.0.16/32"]` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(log n) | Each step covers at least 1 IP, block sizes grow exponentially |
| Space | O(log n) | Result list |

---

## 7. Key Takeaway

> Greedily pick the largest aligned CIDR block at each step. Block size is `min(alignment, remaining)` — this is fundamentally a **bit manipulation + greedy** problem about power-of-2 aligned ranges.
