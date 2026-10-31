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

There are `n` persons on a social media website. You are given an integer array `ages` where `ages[i]` is the age of the `i^th` person.

A Person `x` will not send a friend request to a person `y` (`x != y`) if any of the following conditions is true:

- `age[y] <= 0.5 * age[x] + 7`
- `age[y] > age[x]`
- `age[y] > 100 && age[x] < 100`

Otherwise, `x` will send a friend request to `y`.

Note that if `x` sends a request to `y`, `y` will not necessarily send a request to `x`. Also, a person will not send a friend request to themself.

Return *the total number of friend requests made*.

**Constraints:**
- `n == ages.length`
- `1 <= n <= 2 * 10^4`
- `1 <= ages[i] <= 120`

---

## 2. Examples

**Example 1:**
```
Input: ages = [16,16]
Output: 2
Explanation: 2 people friend request each other.
```

**Example 2:**
```
Input: ages = [16,17,18]
Output: 2
Explanation: Friend requests are made 17 -> 16, 18 -> 17.
```

**Example 3:**
```
Input: ages = [20,30,100,110,120]
Output: 3
Explanation: Friend requests are made 110 -> 100, 120 -> 110, 120 -> 100.
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
   - Subtract `count[16]` because a == b (no self-request): result = 9-3 = 6.
3. Final result 6, which matches the 3 users each sending requests to the other two.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(A²) where A = 120 (max age) |
| **Space** | O(A) |

---

## 7. Key Takeaway

> **Count ages** to reduce from O(n²) to O(A²). Iterate over age pairs, multiply counts, and subtract self-requests when ages match.
