# 2327. Number of People Aware of a Secret

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-people-aware-of-a-secret](https://leetcode.com/problems/number-of-people-aware-of-a-secret)
**Companies:** Amazon, Arcesium, Bloomberg, Google, Microsoft, Ncr

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP — O(n²)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

On day `1`, one person discovers a secret.

You are given an integer `delay`, which means that each person will **share** the secret with a new person **every day**, starting from `delay` days after discovering the secret. You are also given an integer `forget`, which means that each person will **forget** the secret `forget` days after discovering it. A person **cannot** share the secret on the same day they forgot it, or on any day afterwards.

Given an integer `n`, return* the number of people who know the secret at the end of day *`n`. Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `2 <= n <= 1000`
- `1 <= delay < forget <= n`

---

## 2. Key Insight

> `dp[i]` = number of new people who learn the secret on day `i`. A person who learned on day `j` can share it on days `[j+delay, j+forget-1]`. Summing `dp[j]` over all valid `j` gives `dp[i]`.

---

## 3. Approach: DP — O(n²) ✅

```text
FUNCTION peopleAwareOfSecret(n, delay, forget):
    SET MOD ← 10^9 + 7
    CREATE dp[0…n] INITIALIZED TO 0
    SET dp[1] ← 1
    FOR i ← 2 TO n:
        FOR j ← MAX(1, i - forget + 1) TO i - delay:
            SET dp[i] ← (dp[i] + dp[j]) MOD MOD
    // Sum of people who have not forgotten by day n
    SET result ← 0
    FOR j ← MAX(1, n - forget + 1) TO n:
        SET result ← (result + dp[j]) MOD MOD
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
Input: n = 6, delay = 2, forget = 4
Output: 5
Explanation: Day 1: Suppose the first person is named A. (1 person)
Day 2: A is the only person who knows the secret. (1 person)
Day 3: A shares the secret with a new person, B. (2 people)
Day 4: A shares the secret with a new person, C. (3 people)
Day 5: A forgets the secret, and B shares the secret with a new person, D. (3 people)
Day 6: B shares the secret with E, and C shares the secret with F. (5 people)
```

**Example 2:**
```
Input: n = 4, delay = 1, forget = 3
Output: 6
Explanation: Day 1: The first person is named A. (1 person)
Day 2: A shares the secret with B. (2 people)
Day 3: A and B share the secret with 2 new people, C and D. (4 people)
Day 4: A forgets the secret. B, C, and D share the secret with 3 new people. (6 people)
```

---

## 5. Walkthrough

Consider Example 1 (`n=6, delay=2, forget=4`).
| Day | dp[day] (new learners) | Cumulative aware (last 4 days) |
|-----|------------------------|--------------------------------|
| 1   | 1                      | 1 |
| 2   | 0 (cannot share yet)  | 1 |
| 3   | 1 (share from day 1)   | 2 |
| 4   | 1 (share from day 2)   | 2 (day 1 forgets) |
| 5   | 1 (share from day 3)   | 3 |
| 6   | 1 (share from day 4)   | 5 |
The final sum of dp[3]…dp[6] = 5, matching the output.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) (optimizable to O(n) with prefix sums) |
| **Space** | O(n) |

---

## 7. Key Takeaway

> **Model the spread as daily new learners and use a sliding-window DP** to aggregate contributions from previous days within the `[delay, forget)` window.
