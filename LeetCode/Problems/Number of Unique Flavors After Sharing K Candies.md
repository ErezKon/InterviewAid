# 2107. Number of Unique Flavors After Sharing K Candies

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-unique-flavors-after-sharing-k-candies](https://leetcode.com/problems/number-of-unique-flavors-after-sharing-k-candies)
**Companies:** Ciena, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sliding Window — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Share exactly `k` consecutive candies. Maximize the number of unique flavors in the remaining `n - k` candies.

---

## 2. Key Insight

> Sliding window of size `k` (shared portion). Track unique flavors outside the window. Slide and update counts.

---

## 3. Approach: Sliding Window — O(n) ✅

```
FUNCTION shareCandies(candies, k):
    IF k == 0: RETURN len(set(candies))
    total = Counter(candies)
    // Remove first k from "kept"
    FOR i ← 0 TO k-1:
        total[candies[i]] -= 1
        IF total[candies[i]] == 0: DEL total[candies[i]]
    best = len(total)

    FOR i ← k TO n-1:
        // Add back candies[i-k], remove candies[i]
        total[candies[i-k]] += 1
        total[candies[i]] -= 1
        IF total[candies[i]] == 0: DEL total[candies[i]]
        best = MAX(best, len(total))
    RETURN best
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Sliding window on the "shared" portion.** Track remaining flavors' count. Maximize unique count outside the window.
