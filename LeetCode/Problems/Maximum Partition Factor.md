# 3710. Maximum Partition Factor

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-partition-factor](https://leetcode.com/problems/maximum-partition-factor)
**Companies:** Gameskraft, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a positive integer `n` represented as a string of digits, partition it into two non-empty substrings `left` and `right` (where `left + right = n` as concatenation). Return the **maximum GCD** of the two resulting numbers over all valid partitions.

**Constraints:**
- `2 <= n.length <= 10^5`

---

## Examples

**Example 1:**
```
Input:  n = "1234"
Output: 2
Explanation: Partition "12" | "34" → GCD(12, 34) = 2. Other partitions give smaller GCDs.
```

---

## Key Insight

> Try all split positions. For each split, compute the two numbers (or use modular arithmetic for large numbers) and find their GCD. The key optimization is efficient GCD computation for very large numbers.

---

## Approach

```
FUNCTION maxPartitionFactor(n)
    best ← 1
    FOR i ← 1 TO len(n) - 1 DO
        left ← parseInt(n[0:i])
        right ← parseInt(n[i:])
        IF right has no leading zeros (or handle accordingly) THEN
            best ← MAX(best, GCD(left, right))
    RETURN best
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n² × log(max_val))** — n splits, big-integer GCD per split |
| Space  | **O(n)** — number strings |

---

## Key Takeaway

> **Enumerate partitions + GCD** — try each split point, compute GCD of the two halves. For very large numbers, use big integer or modular techniques.
