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

> *Note: premium problem — statement verified via doocs/leetcode.*

An **IP address** is a formatted 32-bit unsigned integer where each group of 8 bits is printed as a decimal number and the dot character `'.'` splits the groups.

- For example, the binary number `00001111 10001000 11111111 01101011` (spaces added for clarity) formatted as an IP address would be `"15.136.255.107"`.

A **CIDR block** is a format used to denote a specific set of IP addresses. It is a string consisting of a base IP address, followed by a slash, followed by a prefix length `k`. The addresses it covers are all the IPs whose **first `k` bits** are the same as the base IP address.

- For example, `"123.45.67.89/20"` is a CIDR block with a prefix length of `20`. Any IP address whose binary representation matches `01111011 00101101 0100xxxx xxxxxxxx`, where `x` can be either `0` or `1`, is in the set covered by the CIDR block.

You are given a start IP address `ip` and the number of IP addresses we need to cover `n`. Your goal is to use **as few CIDR blocks as possible** to cover all the IP addresses in the **inclusive** range `[ip, ip + n - 1]` **exactly**. No other IP addresses outside of the range should be covered.

Return *the **shortest** list of **CIDR blocks** that covers the range of IP addresses. If there are multiple answers, return **any** of them*.

**Constraints:**
- `7 <= ip.length <= 15`
- `ip` is a valid **IPv4** on the form `"a.b.c.d"` where `a`, `b`, `c`, and `d` are integers in the range `[0, 255]`.
- `1 <= n <= 1000`
- Every implied address `ip + x` (for `x < n`) will be a valid IPv4 address.

---

## 2. Examples

**Example 1:**
```
Input: ip = "255.0.0.7", n = 10
Output: ["255.0.0.7/32","255.0.0.8/29","255.0.0.16/32"]
Explanation: The IP addresses that need to be covered are:
- 255.0.0.7  -> 11111111 00000000 00000000 00000111
- 255.0.0.8  -> 11111111 00000000 00000000 00001000
- 255.0.0.9  -> 11111111 00000000 00000000 00001001
- 255.0.0.10 -> 11111111 00000000 00000000 00001010
- 255.0.0.11 -> 11111111 00000000 00000000 00001011
- 255.0.0.12 -> 11111111 00000000 00000000 00001100
- 255.0.0.13 -> 11111111 00000000 00000000 00001101
- 255.0.0.14 -> 11111111 00000000 00000000 00001110
- 255.0.0.15 -> 11111111 00000000 00000000 00001111
- 255.0.0.16 -> 11111111 00000000 00000000 00010000
The CIDR block "255.0.0.7/32" covers the first address.
The CIDR block "255.0.0.8/29" covers the middle 8 addresses (binary format of 11111111 00000000 00000000 00001xxx).
The CIDR block "255.0.0.16/32" covers the last address.
Note that while the CIDR block "255.0.0.0/28" does cover all the addresses, it also includes addresses outside of the range, so we cannot use it.
```

**Example 2:**
```
Input: ip = "117.145.102.62", n = 8
Output: ["117.145.102.62/31","117.145.102.64/30","117.145.102.68/31"]
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
