# 3044. Most Frequent Prime

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-frequent-prime](https://leetcode.com/problems/most-frequent-prime)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Brute Force + Primality — O(m·n·8·d)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

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

```text
FUNCTION mostFrequentPrime(grid):
    // count occurrences of each prime number
    SET count ← empty map
    SET rows ← NUMBER OF ROWS in grid
    SET cols ← NUMBER OF COLUMNS in grid
    SET directions ← [(−1,−1),(−1,0),(−1,1),(0,−1),(0,1),(1,−1),(1,0),(1,1)]
    FOR r ← 0 TO rows−1:
        FOR c ← 0 TO cols−1:
            FOR each (dr, dc) IN directions:
                SET nr ← r
                SET nc ← c
                SET num ← 0
                WHILE 0 ≤ nr < rows AND 0 ≤ nc < cols:
                    SET num ← num * 10 + grid[nr][nc]
                    IF num > 10 AND isPrime(num):
                        INCREMENT count[num] BY 1
                    SET nr ← nr + dr
                    SET nc ← nc + dc
    IF count IS EMPTY:
        RETURN −1
    // find prime with highest frequency (break ties by larger value)
    SET result ← NONE
    SET maxFreq ← 0
    FOR each (prime, freq) IN count:
        IF freq > maxFreq OR (freq == maxFreq AND prime > result):
            SET maxFreq ← freq
            SET result ← prime
    RETURN result

FUNCTION isPrime(x):
    IF x < 2: RETURN FALSE
    FOR i ← 2 TO FLOOR(SQRT(x)):
        IF x MOD i == 0:
            RETURN FALSE
    RETURN TRUE
```

---

## 4. Examples

**Example 1:**
```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 23
Explanation: The prime 23 appears 3 times (e.g., 2→3, 4→9→5→... etc.), more than any other prime.
```

**Example 2:**
```
Input: grid = [[4,6],[8,9]]
Output: -1
Explanation: No prime > 10 can be formed.
```

---

## 5. Walkthrough

Consider the first example grid.

| Start (r,c) | Direction (dr,dc) | Numbers generated | Prime? | Count update |
|-------------|-------------------|-------------------|--------|--------------|
| (0,0)       | (0,1) (right)     | 1 → 12 → 123       | 12 not prime, 123 not prime | — |
| (0,1)       | (1,1) (down‑right)| 2 → 25 → 258       | 25 not prime, 258 not prime | — |
| (0,1)       | (1,0) (down)      | 2 → 25 → 258       | same as above | — |
| (0,1)       | (1,−1) (down‑left)| 2 → 21 → 214 → ... | 21 not prime, 214 not prime | — |
| (0,1)       | (0,1) (right)     | 2 → 23 → 235 ...   | 23 is prime → count[23] = 1 |
| ... continue for all cells/directions ... |

After enumerating all 8 directions from every cell, the frequency map might be `{23:3, 31:2, 37:1}`. The maximum frequency is 3 for prime 23, so the answer is 23.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n·8·max(m,n)·√P) where P is the largest number formed (primality check) |
| **Space** | O(K) where K is the number of distinct primes found |

---

## 7. Key Takeaway

> **Brute‑force enumeration works on tiny grids.** Generate every directional number, test primality, and count frequencies to obtain the most common prime.
