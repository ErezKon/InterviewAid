# 3304. Find the K-th Character in String Game I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-k-th-character-in-string-game-i](https://leetcode.com/problems/find-the-k-th-character-in-string-game-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Simulation — O(k) ✅](#4-approach-simulation--ok-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Alice and Bob are playing a game. Initially, Alice has a string `word = "a"`.

You are given a **positive** integer `k`.

Now Bob will ask Alice to perform the following operation **forever**:

- Generate a new string by **changing** each character in `word` to its **next** character in the English alphabet, and **append** it to the *original* `word`.

For example, performing the operation on `"c"` generates `"cd"` and performing the operation on `"zb"` generates `"zbac"`.

Return the value of the `k`-th character in `word`, after enough operations have been done for `word` to have **at least** `k` characters.

**Constraints:**
- `1 <= k <= 500`

---

## 2. Examples

```
Example 1:
  Input: k = 5
  Output: "b"
  Explanation: Initially, word = "a". We need to do the operation three times:
    - Generated string is "b", word becomes "ab".
    - Generated string is "bc", word becomes "abbc".
    - Generated string is "bccd", word becomes "abbcbccd".

Example 2:
  Input: k = 10
  Output: "c"
```

---

## 3. Key Insight

> With k ≤ 500, direct simulation is fast enough. Build the string until its length reaches k, then return `s[k-1]`.

---

## 4. Approach: Simulation — O(k) ✅

```
FUNCTION kthCharacter(k):
    s = "a"
    WHILE len(s) < k:
        s = s + JOIN(chr((ord(c) - ord('a') + 1) % 26 + ord('a')) for c in s)
    RETURN s[k - 1]
```

---

## 5. Walkthrough

```
k = 5
Step 0: s = "a"        (len 1)
Step 1: s = "ab"       (len 2)
Step 2: s = "abbc"     (len 4)
Step 3: s = "abbcbccd"  (len 8 ≥ 5)

s[4] = "b" ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(k) — string doubles each step, ≤ log(k) steps |
| **Space** | O(k) — the built string |

---

## 7. Key Takeaway

> For small k, **direct simulation** of the doubling process works fine. For large k (Game II), use recursive binary lifting to avoid building the string.
