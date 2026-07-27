# 825. Friends Of Appropriate Ages

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/friends-of-appropriate-ages](https://leetcode.com/problems/friends-of-appropriate-ages)
**Companies:** Amazon, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Age Counting — O(121²) ✅](#3-approach-age-counting--o121-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Person A will send a friend request to B unless: `age[B] <= 0.5 * age[A] + 7` or `age[B] > age[A]` or `age[B] > 100 && age[A] < 100`. Count total friend requests.

**Constraints:**
- `1 <= n <= 2 × 10⁴`
- `1 <= ages[i] <= 120`

---

## 2. Key Insight

> Since ages range from 1-120, count frequency of each age and iterate over all pairs of ages (120² = 14400 pairs) instead of all person pairs (up to n²).

---

## 3. Approach: Age Counting — O(121²) ✅

```
FUNCTION numFriendRequests(ages):
    count = Counter(ages)
    result = 0
    FOR a IN count:
        FOR b IN count:
            IF b <= 0.5 * a + 7: CONTINUE
            IF b > a: CONTINUE
            IF b > 100 AND a < 100: CONTINUE
            result += count[a] * count[b]
            IF a == b: result -= count[a]    // can't friend yourself
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(A²) where A = 120 (max age) |
| **Space** | O(A) |

---

## 5. Key Takeaway

> **Count ages** to reduce from O(n²) to O(A²). Iterate over age pairs, multiply counts, and subtract self-requests when ages match.
