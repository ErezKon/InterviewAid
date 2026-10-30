# 3863. Minimum Operations to Sort a String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-sort-a-string](https://leetcode.com/problems/minimum-operations-to-sort-a-string)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Count Inversions by Character — O(n)](#4-approach-count-inversions-by-character--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: the Approach below counts characters outside a sorted subsequence (invented). The answer is 0 if `s` is sorted, and -1 if it is unsorted with `n ≤ 2`. It is 1 if `s[0]` is the minimum char or `s[n−1]` is the maximum char. It is 3 if `s[0]` is the unique maximum and `s[n−1]` is the unique minimum, and 2 otherwise. Checked against brute-force BFS on random strings.*

You are given a string `s` consisting of lowercase English letters.

In one operation, you can select any **substring** of `s` that is **not** the entire string and **sort** it in **non-descending alphabetical** order.

Return the **minimum** number of operations required to make `s` sorted in **non-descending** order. If it is not possible, return -1.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of only lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: s = "dog"
Output: 1
Explanation: - Sort substring "og" to "go".
- Now, s = "dgo", which is sorted in ascending order. Thus, the answer is 1.
```

**Example 2:**
```
Input: s = "card"
Output: 2
Explanation: - Sort substring "car" to "acr", so s = "acrd".
- Sort substring "rd" to "dr", making s = "acdr", which is sorted in ascending order. Thus, the answer is 2.
```

**Example 3:**
```
Input: s = "gf"
Output: -1
Explanation: - It is impossible to sort s under the given constraints. Thus, the answer is -1.
```

---

## 3. Key Insight

> The minimum number of moves = `n - LIS length` where LIS is the **Longest Non-Decreasing Subsequence** that is already in sorted order. Characters in this subsequence stay in place; all others must be moved.

Since we only have 26 letters, we can find the longest subsequence that matches a prefix of the sorted string using a greedy scan.

---

## 4. Approach: Count Inversions by Character — O(n) ✅

```
FUNCTION minOperations(s):
    sorted_s = SORT(s)
    // Find longest common subsequence between s and sorted_s
    // Since sorted_s is just s sorted, this equals the longest 
    // already-in-order subsequence
    
    j = 0
    FOR i ← 0 TO len(s) - 1:
        IF s[i] == sorted_s[j]:
            j += 1
    
    RETURN len(s) - j
```

---

## 5. Walkthrough

```
s = "cba", sorted_s = "abc"

i=0: s[0]='c', sorted_s[0]='a' → no match
i=1: s[1]='b', sorted_s[0]='a' → no match  
i=2: s[2]='a', sorted_s[0]='a' → match, j=1

j = 1, answer = 3 - 1 = 2 ✅
(Only 'a' can stay; 'b' and 'c' must be moved)
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) for sorting, O(n) for the scan |
| **Space** | O(n) for sorted copy |

---

## 7. Key Takeaway

> **Minimum moves to sort = n - (longest already-sorted subsequence)**. This is the same pattern as minimum swaps/moves problems: find what's already in the right relative order and move everything else.
