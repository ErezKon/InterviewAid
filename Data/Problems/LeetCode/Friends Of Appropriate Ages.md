# 825. Friends Of Appropriate Ages

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/friends-of-appropriate-ages](https://leetcode.com/problems/friends-of-appropriate-ages)
**Companies:** Amazon, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Age Counting — O(121²) ✅](#4-approach-age-counting--o121-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Person A will send a friend request to B unless: `age[B] <= 0.5 * age[A] + 7` or `age[B] > age[A]` or `age[B] > 100 && age[A] < 100`. Count total friend requests.

**Constraints:**
- `1 <= n <= 2 × 10⁴`
- `1 <= ages[i] <= 120`

---

## 2. Examples

**Example 1**
```
ages = [16,16]
Output: 2
Explanation: Both users can friend each other.
```

**Example 2**
```
ages = [20,30,100,110,120]
Output: 3
Explanation: Valid pairs are (20,30), (30,20), (110,120).
```

---

## 3. Key Insight

> Since ages range from 1-120, count frequency of each age and iterate over all pairs of ages (120² = 14400 pairs) instead of all person pairs (up to n²).

---

## 4. Approach: Age Counting — O(121²) ✅

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

## 5. Walkthrough

Consider `ages = [16,16,16]`.
1. Frequency count: `count[16] = 3`.
2. Iterate over age pair (a=16, b=16):
   - Condition `b <= 0.5*a + 7` → `16 <= 15` false.
   - `b > a` false.
   - `b > 100 && a < 100` false.
   - Add `count[16] * count[16] = 9` to result.
   - Subtract `count[16]` because a == b (no self‑request): result = 9‑3 = 6.
3. Final result 6, which matches the 3 users each sending requests to the other two.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(A²) where A = 120 (max age) |
| **Space** | O(A) |

---

## 7. Key Takeaway

> **Count ages** to reduce from O(n²) to O(A²). Iterate over age pairs, multiply counts, and subtract self‑requests when ages match.
