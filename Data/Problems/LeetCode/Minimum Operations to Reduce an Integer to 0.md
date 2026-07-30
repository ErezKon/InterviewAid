# 2571. Minimum Operations to Reduce an Integer to 0

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-reduce-an-integer-to-0](https://leetcode.com/problems/minimum-operations-to-reduce-an-integer-to-0)
**Companies:** 6Sense, Amazon, Bloomberg, Google, Microsoft, Nvidia, Salesforce, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy on Consecutive 1-bits — O(log n)](#4-approach-greedy-on-consecutive-1-bits--olog-n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a positive integer `n`, you can add or subtract any **power of 2** from `n` in one operation.

Return the **minimum** number of operations to make `n` equal to `0`.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input: n = 39 (binary: 100111)
  Output: 3
  Explanation:
    39 + 1 = 40 (101000)    — add 2⁰
    40 - 8 = 32 (100000)    — subtract 2³
    32 - 32 = 0             — subtract 2⁵
    Total: 3 operations

Example 2:
  Input: n = 54 (binary: 110110)
  Output: 3
  Explanation:
    54 + 2 = 56 (111000)    — add 2¹
    56 + 8 = 64 (1000000)   — add 2³
    64 - 64 = 0             — subtract 2⁶
```

---

## 3. Key Insight

> Look at groups of consecutive 1-bits in the binary representation. A **single isolated 1** costs one subtraction. A **block of consecutive 1s** costs only 2 operations (add at the low end to carry, then subtract the resulting single 1).

The decision at each bit position:
- **Lone 1-bit** → subtract it (1 op)
- **Consecutive 1-bits** → add 1 to create a carry that clears them all, then subtract the carried bit (2 ops for the whole block vs. one-per-bit)

---

## 4. Approach: Greedy on Consecutive 1-bits — O(log n) ✅

```
FUNCTION minOperations(n):
    ops = 0
    WHILE n > 0:
        IF n & 1 == 0:
            n >>= 1
        ELSE IF (n & 3) == 3:    // two consecutive 1-bits
            n += 1    // add power of 2 to carry
            ops += 1
        ELSE:
            n -= 1    // subtract power of 2
            ops += 1
    RETURN ops
```

If there are consecutive 1-bits, adding is cheaper (carry propagation). Single 1-bit → subtract.

---

## 5. Walkthrough

```
n = 39 → binary: 100111

Step 1: n=100111, bit 0 is 1, (n & 3)=11=3 → consecutive → n += 1, ops=1
        n=101000

Step 2: n=101000, bit 0 is 0 → shift right
        n=10100

Step 3: n=10100, bit 0 is 0 → shift right
        n=1010

Step 4: n=1010, bit 0 is 0 → shift right
        n=101

Step 5: n=101, bit 0 is 1, (n & 3)=01=1 → lone 1 → n -= 1, ops=2
        n=100

Step 6: n=100, bit 0 is 0 → shift right
        n=10

Step 7: n=10, bit 0 is 0 → shift right
        n=1

Step 8: n=1, bit 0 is 1, (n & 3)=1 → lone 1 → n -= 1, ops=3
        n=0

Result: 3 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(log n) — we process each bit at most once |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

**Q1: Why is adding better than subtracting for consecutive 1s?**
A block of `k` consecutive 1-bits (e.g., `0111`) needs `k` subtractions if handled individually. Adding 1 to the lowest bit causes a carry that clears all `k` bits and sets one higher bit: `0111 + 1 = 1000`. Then one more subtraction clears it. Total = 2 ops instead of `k`.

**Q2: What's the alternative formulation?**
Count the number of groups of consecutive 1-bits. Each group costs exactly 2 operations (add + subtract), except a lone 1-bit costs 1. Equivalently: `ops = popcount(n ^ (n >> 1))` — count transitions in the bit pattern.

**Q3: Does this relate to Non-Adjacent Form (NAF)?**
Yes! The optimal representation is the **NAF** (Non-Adjacent Form) of `n`, which uses digits `{-1, 0, 1}` with no two consecutive non-zero digits. The number of non-zero digits in NAF equals the minimum operations.

---

## 8. Key Takeaway

> **Consecutive 1-bits in binary are a signal to add instead of subtract** — carry propagation can clear an entire block at once. This greedy bit-manipulation pattern connects to NAF representation and appears in many power-of-2 operation problems.
