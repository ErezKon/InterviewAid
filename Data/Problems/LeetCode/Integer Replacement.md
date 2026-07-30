# 397. Integer Replacement

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/integer-replacement](https://leetcode.com/problems/integer-replacement)
**Companies:** Amazon, Baidu, Google, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy Bit Manipulation — O(log n) ✅](#4-approach-greedy-bit-manipulation--olog-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a positive integer `n`, you can perform one of three operations:
- If `n` is even → `n = n / 2`
- If `n` is odd → `n = n + 1` or `n = n - 1`

Return the **minimum number of operations** to reduce `n` to 1.

**Constraints:**
- `1 <= n <= 2³¹ - 1`

---

## 2. Examples

```
Input: n = 8 → Output: 3   (8 → 4 → 2 → 1)
Input: n = 7 → Output: 4   (7 → 8 → 4 → 2 → 1)
Input: n = 3 → Output: 2   (3 → 2 → 1)
```

---

## 3. Key Insight

When `n` is odd, choose `n+1` or `n-1` based on **bit patterns**:
- If the last two bits are `11` → prefer `n+1` (creates trailing zeros faster)
- If the last two bits are `01` → prefer `n-1`
- **Exception:** `n == 3` → always use `n-1` (3→2→1 is shorter than 3→4→2→1)

The goal is to eliminate trailing 1-bits as fast as possible, since each `/2` removes one trailing zero.

---

## 4. Approach: Greedy Bit Manipulation — O(log n) ✅

```
FUNCTION integerReplacement(n):
    count = 0
    WHILE n != 1:
        IF n % 2 == 0: n /= 2
        ELSE IF n == 3 OR ((n >> 1) & 1) == 0: n -= 1
        ELSE: n += 1
        count += 1
    RETURN count
```

Greedy: if odd, prefer making trailing bits 00 (n-1) unless n==3 or next bit is 0.

---

## 5. Walkthrough

```
n = 7 (binary: 111)
```

| Step | n | Binary | Action | Reason |
|------|---|--------|--------|--------|
| 1 | 7 | 111 | +1 → 8 | Last 2 bits = 11 → n+1 |
| 2 | 8 | 1000 | /2 → 4 | Even |
| 3 | 4 | 100 | /2 → 2 | Even |
| 4 | 2 | 10 | /2 → 1 | Even |

**Result:** 4 operations ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(log n) | Each step either halves n or sets up a halving |
| Space | O(1) | Only counters |

---

## 7. Follow-Up Questions

### 7.1 Why not always use n-1 for odd numbers?

Consider n=15 (1111): n-1 path takes more steps. n+1→16→8→4→2→1 (5 steps) vs n-1→14→7→... which is longer.

### 7.2 Can this be solved with BFS or DP?

Yes, but BFS is O(n) space and DP is O(n). The greedy approach is O(log n) time and O(1) space.

### 7.3 What about overflow when n = 2³¹ - 1?

Use a long/64-bit integer for n+1 to avoid overflow when n = INT_MAX.

---

## 8. Key Takeaway

> When reducing an odd number, inspect the **second-to-last bit** to decide +1 vs -1. The goal is to create trailing zeros quickly so `/2` can do the heavy lifting. Exception: n=3 always uses -1.
