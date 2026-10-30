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

You are given a `m x n` **0-indexed** 2D matrix `mat`. From every cell, you can create numbers in the following way:

- There could be at most `8` paths from the cells namely: east, south-east, south, south-west, west, north-west, north, and north-east.
- Select a path from them and append digits in this path to the number being formed by traveling in this direction.
- Note that numbers are generated at every step, for example, if the digits along the path are `1, 9, 1`, then there will be three numbers generated along the way: `1, 19, 191`.

Return *the most frequent prime number **greater** than* `10` *out of all the numbers created by traversing the matrix or* `-1` *if no such prime number exists. If there are multiple prime numbers with the highest frequency, then return the **largest** among them.*

**Note:** It is invalid to change the direction during the move.

**Constraints:**
- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 6`
- `1 <= mat[i][j] <= 9`

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

```
Example 1:
  Input: mat = [[1,1],[9,9],[1,1]]
  Output: 19
  Explanation:
  From cell (0,0) there are 3 possible directions and the numbers greater than 10 which can be created in those directions are:
  East: [11], South-East: [19], South: [19,191].
  Numbers greater than 10 created from the cell (0,1) in all possible directions are: [19,191,19,11].
  Numbers greater than 10 created from the cell (1,0) in all possible directions are: [99,91,91,91,91].
  Numbers greater than 10 created from the cell (1,1) in all possible directions are: [91,91,99,91,91].
  Numbers greater than 10 created from the cell (2,0) in all possible directions are: [11,19,191,19].
  Numbers greater than 10 created from the cell (2,1) in all possible directions are: [11,19,19,191].
  The most frequent prime number among all the created numbers is 19.
```

```
Example 2:
  Input: mat = [[7]]
  Output: -1
  Explanation: The only number which can be formed is 7. It is a prime number however it is not greater than 10, so return -1.
```

```
Example 3:
  Input: mat = [[9,7,8],[4,6,5],[2,8,6]]
  Output: 97
  Explanation:
  Numbers greater than 10 created from the cell (0,0) in all possible directions are: [97,978,96,966,94,942].
  Numbers greater than 10 created from the cell (0,1) in all possible directions are: [78,75,76,768,74,79].
  Numbers greater than 10 created from the cell (0,2) in all possible directions are: [85,856,86,862,87,879].
  Numbers greater than 10 created from the cell (1,0) in all possible directions are: [46,465,48,42,49,47].
  Numbers greater than 10 created from the cell (1,1) in all possible directions are: [65,66,68,62,64,69,67,68].
  Numbers greater than 10 created from the cell (1,2) in all possible directions are: [56,58,56,564,57,58].
  Numbers greater than 10 created from the cell (2,0) in all possible directions are: [28,286,24,249,26,268].
  Numbers greater than 10 created from the cell (2,1) in all possible directions are: [86,82,84,86,867,85].
  Numbers greater than 10 created from the cell (2,2) in all possible directions are: [68,682,66,669,65,658].
  The most frequent prime number among all the created numbers is 97.
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
