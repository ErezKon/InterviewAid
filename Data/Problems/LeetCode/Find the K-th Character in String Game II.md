# 3307. Find the K-th Character in String Game II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-k-th-character-in-string-game-ii](https://leetcode.com/problems/find-the-k-th-character-in-string-game-ii)

**Companies:** Amazon, Bloomberg, Google
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Recursive Binary Lifting — O(log k) ✅](#3-approach-recursive-binary-lifting--olog-k-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Alice and Bob are playing a game. Initially, Alice has a string `word = "a"`.

You are given a **positive** integer `k`. You are also given an integer array `operations`, where `operations[i]` represents the **type** of the `i`-th operation.

Now Bob will ask Alice to perform **all** operations in sequence:

- If `operations[i] == 0`, **append** a copy of `word` to itself.
- If `operations[i] == 1`, generate a new string by **changing** each character in `word` to its **next** character in the English alphabet, and **append** it to the *original* `word`. For example, performing the operation on `"c"` generates `"cd"` and performing the operation on `"zb"` generates `"zbac"`.

Return the value of the `k`-th character in `word` after performing all the operations.

**Note** that the character `'z'` can be changed to `'a'` in the second type of operation.

**Constraints:**
- `1 <= k <= 10¹⁴`
- `1 <= operations.length <= 100`
- `operations[i]` is either 0 or 1.
- The input is generated such that `word` has **at least** `k` characters after all operations.

---

## 2. Key Insight

> Work backwards from position `k`. At each step, the string doubles. If `k` is in the second half, determine which position in the first half it maps to, and whether it's shifted. Recurse until `k = 1` (which is always 'a'). The total shift mod 26 gives the answer.

---

## 3. Approach: Recursive Binary Lifting — O(log k) ✅

```text
FUNCTION kthCharacter(k, operations):
    // Find how many doubling steps are needed
    n ← LENGTH(operations)
    shift ← 0

    FOR step ← n - 1 DOWNTO 0 DO
        halfLen ← 2^step
        IF k > halfLen THEN
            // k is in the second half → map to first half
            k ← k - halfLen
            IF operations[step] == 1 THEN
                shift ← (shift + 1) MOD 26

    RETURN chr(ord('a') + shift)
```

---

## 4. Walkthrough

```text
k = 5, operations = [1, 1, 1]

step=2: halfLen=4, k=5>4 → k=1, shift=1 (op=1)
step=1: halfLen=2, k=1≤2 → stay
step=0: halfLen=1, k=1≤1 → stay

Answer: chr('a' + 1) = 'b' ✅
```

---

## 5. Examples

```
Example 1:
  Input: k = 5, operations = [0,0,0]
  Output: "a"
  Explanation: Initially, word == "a". Alice performs the three operations as follows:
    - Appends "a" to "a", word becomes "aa".
    - Appends "aa" to "aa", word becomes "aaaa".
    - Appends "aaaa" to "aaaa", word becomes "aaaaaaaa".

Example 2:
  Input: k = 10, operations = [0,1,0,1]
  Output: "b"
  Explanation: Initially, word == "a". Alice performs the four operations as follows:
    - Appends "a" to "a", word becomes "aa".
    - Appends "bb" to "aa", word becomes "aabb".
    - Appends "aabb" to "aabb", word becomes "aabbaabb".
    - Appends "bbccbbcc" to "aabbaabb", word becomes "aabbaabbbbccbbcc".
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) where n = number of operations |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would you modify the solution if the shift operation could increase characters by more than one?
- Can the approach be extended to support deletions or insertions in the string?
- What if `k` could be as large as 10¹⁸?

---

## 8. Key Takeaway

> **Binary lifting** traces position `k` back through doubling steps without building the string. Each step either maps `k` to the first half (with an optional +1 shift) or stays. This handles k up to 10¹⁴ efficiently.
