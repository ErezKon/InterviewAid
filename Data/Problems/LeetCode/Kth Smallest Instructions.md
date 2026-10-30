# 1643. Kth Smallest Instructions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/kth-smallest-instructions](https://leetcode.com/problems/kth-smallest-instructions)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Combinatorics — O(m+n) ✅](#3-approach-combinatorics--omn-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Bob is standing at cell `(0, 0)`, and he wants to reach `destination`: `(row, column)`. He can only travel **right** and **down**. You are going to help Bob by providing **instructions** for him to reach `destination`.

The **instructions** are represented as a string, where each character is either:

- `'H'`, meaning move horizontally (go **right**), or
- `'V'`, meaning move vertically (go **down**).

Multiple **instructions** will lead Bob to `destination`. For example, if `destination` is `(2, 3)`, both `"HHHVV"` and `"HVHVH"` are valid **instructions**.

However, Bob is very picky. Bob has a lucky number `k`, and he wants the `k^th` **lexicographically smallest instructions** that will lead him to `destination`. `k` is **1-indexed**.

Given an integer array `destination` and an integer `k`, return *the *`k^th`* **lexicographically smallest instructions** that will take Bob to *`destination`.

**Constraints:**
- `destination.length == 2`
- `1 <= row, column <= 15`
- `1 <= k <= nCr(row + column, row)`, where `nCr(a, b)` denotes `a` choose `b`.

---

## 2. Key Insight

The string has `col` H's and `row` V's. At each position, decide: if we place 'H', how many strings start with 'H'? That's `C(remaining_H + remaining_V - 1, remaining_V)`. If `k ≤ count`, place 'H'; otherwise place 'V' and subtract count from k.

---

## 3. Approach: Combinatorics — O(m+n) ✅

```text
FUNCTION kthSmallestPath(destination, k):
    v ← destination[0]
    h ← destination[1]
    result ← []
    WHILE h > 0 OR v > 0:
        IF h > 0:
            count ← COMBINATION(h + v - 1, v)  // strings starting with 'H'
            IF k ≤ count:
                result.ADD('H')
                h ← h - 1
                CONTINUE
            ELSE:
                k ← k - count
        // place a 'V'
        result.ADD('V')
        v ← v - 1
    RETURN JOIN(result)
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(m + n) | One pass through all positions |
| Space | O(m + n) | Result string |

---

## 5. Examples

**Example 1:**
```
Input: destination = [2,3], k = 1
Output: "HHHVV"
Explanation: All the instructions that reach (2, 3) in lexicographic order are as follows:
["HHHVV", "HHVHV", "HHVVH", "HVHHV", "HVHVH", "HVVHH", "VHHHV", "VHHVH", "VHVHH", "VVHHH"].
```

**Example 2:**
```
![img](https://assets.leetcode.com/uploads/2020/10/12/ex2.png)
Input: destination = [2,3], k = 2
Output: "HHVHV"
```

**Example 3:**
```
![img](https://assets.leetcode.com/uploads/2020/10/12/ex3.png)
Input: destination = [2,3], k = 3
Output: "HHVVH"
```

---

## 6. Walkthrough

Consider `destination = [2,3]`, `k = 3`.

1. **Start:** h=3, v=2, k=3.
2. **Count if 'H' first:** `C(4,2)=6`. Since 3 ≤ 6, place 'H'. h=2.
3. **Next position:** h=2, v=2, k=3.
   - Count if 'H': `C(3,2)=3`. 3 ≤ 3 → place 'H'. h=1.
4. **Next:** h=1, v=2, k=3.
   - Count if 'H': `C(2,2)=1`. 3 > 1 → skip 'H', set k=2, place 'V'. v=1.
5. **Next:** h=1, v=1, k=2.
   - Count if 'H': `C(1,1)=1`. 2 > 1 → skip 'H', k=1, place 'V'. v=0.
6. **Remaining:** only H's left → add 'H' twice.
Result string: `HHVHV`.

---

## 7. Key Takeaway

> Use combinatorics to count how many strings start with 'H' at each position. This is the same technique as finding the k-th permutation — count and skip.
