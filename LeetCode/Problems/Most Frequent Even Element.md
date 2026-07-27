# 2404. Most Frequent Even Element

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/most-frequent-even-element](https://leetcode.com/problems/most-frequent-even-element)
**Companies:** Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Counter — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Return the **most frequent even** element. If tie, return the smallest. Return `-1` if no even elements.

**Constraints:**
- `1 <= nums.length <= 2000`

---

## 2. Key Insight

> Filter even numbers, count frequencies, return the one with highest count (smallest value to break ties).

---

## 3. Approach: Counter — O(n) ✅

```
FUNCTION mostFrequentEven(nums):
    count = Counter(n for n in nums if n % 2 == 0)
    IF NOT count: RETURN -1
    RETURN MIN(count.keys(), key=lambda x: (-count[x], x))
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Filter + Counter + min with composite key** — sort by `(-frequency, value)` to get highest frequency, smallest value.
