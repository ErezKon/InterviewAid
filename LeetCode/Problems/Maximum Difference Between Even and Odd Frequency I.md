# 3442. Maximum Difference Between Even and Odd Frequency I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-i](https://leetcode.com/problems/maximum-difference-between-even-and-odd-frequency-i)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Frequency Count — O(n)](#approach-frequency-count--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s`, find the maximum difference between a character with **odd** frequency and a character with **even** frequency. Return `max(odd freq) - min(even freq)`.

---

## Key Insight

> Count character frequencies. Separate into odd and even groups. Answer = max of odd group - min of even group.

---

## Approach: Frequency Count — O(n) ✅

```
FUNCTION maxDifference(s):
    count = Counter(s)
    odds = [v for v in count.values() if v % 2 == 1]
    evens = [v for v in count.values() if v % 2 == 0]
    RETURN MAX(odds) - MIN(evens)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Frequency count | **O(n)** | O(26) = O(1) |

---

## Key Takeaway

> **Partition frequencies by parity, then take max odd - min even.** Simple counting problem.
