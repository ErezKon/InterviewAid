# 3044. Most Frequent Prime

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-frequent-prime](https://leetcode.com/problems/most-frequent-prime)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Brute Force + Primality — O(m·n·8·d)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a grid of digits, from each cell walk in all 8 directions forming numbers. Count how many times each prime > 10 appears. Return the **most frequent** such prime, or `-1`.

**Constraints:**
- `1 <= m, n <= 6`

---

## 2. Key Insight

> Grid is small (max 6×6). For each cell, walk in 8 directions building numbers. Check primality of each number > 10. Count frequencies and return the most frequent prime.

---

## 3. Approach: Brute Force + Primality — O(m·n·8·d) ✅

```
FUNCTION mostFrequentPrime(mat):
    count = Counter()
    FOR each cell (r, c):
        FOR each of 8 directions (dr, dc):
            num = 0
            nr, nc = r, c
            WHILE valid(nr, nc):
                num = num * 10 + mat[nr][nc]
                IF num > 10 AND isPrime(num):
                    count[num] += 1
                nr += dr; nc += dc

    IF NOT count: RETURN -1
    RETURN MAX(count, key=lambda x: (count[x], x))
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n·8·max(m,n)·√N) for primality checks |
| **Space** | O(number of primes found) |

---

## 5. Key Takeaway

> **Enumerate all directional numbers from each cell.** Small grid makes brute force feasible. Check primality with trial division (numbers are at most 6 digits).
