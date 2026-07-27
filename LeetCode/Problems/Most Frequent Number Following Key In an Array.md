# 2190. Most Frequent Number Following Key In an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/most-frequent-number-following-key-in-an-array](https://leetcode.com/problems/most-frequent-number-following-key-in-an-array)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Counter — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given array `nums` and integer `key`, find the number that most frequently appears immediately **after** `key` in the array.

**Constraints:**
- `2 <= nums.length <= 1000`

---

## 2. Key Insight

> Scan consecutive pairs. When `nums[i] == key`, count `nums[i+1]`. Return the most frequent.

---

## 3. Approach: Counter — O(n) ✅

```
FUNCTION mostFrequent(nums, key):
    count = Counter()
    FOR i ← 0 TO n - 2:
        IF nums[i] == key:
            count[nums[i + 1]] += 1
    RETURN count.most_common(1)[0][0]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Scan pairs, count followers.** Simple frequency counting of the element after each occurrence of key.
