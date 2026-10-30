# 1974. Minimum Time to Type Word Using Special Typewriter

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-type-word-using-special-typewriter](https://leetcode.com/problems/minimum-time-to-type-word-using-special-typewriter)
**Companies:** Ibm, Jpmorgan, Thomson Reuters

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Circular Distance — O(n)](#4-approach-circular-distance--on)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

There is a special typewriter with lowercase English letters `'a'` to `'z'` arranged in a **circle** with a **pointer**. A character can **only** be typed if the pointer is pointing to that character. The pointer is **initially** pointing to the character `'a'`.
![img](https://assets.leetcode.com/uploads/2021/07/31/chart.jpg)
Each second, you may perform one of the following operations:

- Move the pointer one character **counterclockwise** or **clockwise**.
- Type the character the pointer is **currently** on.

Given a string `word`, return the** minimum** number of seconds to type out the characters in `word`.

**Constraints:**
- `1 <= word.length <= 100`
- `word` consists of lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: word = "abc"
Output: 5
Explanation: The characters are printed as follows:
- Type the character 'a' in 1 second since the pointer is initially on 'a'.
- Move the pointer clockwise to 'b' in 1 second.
- Type the character 'b' in 1 second.
- Move the pointer clockwise to 'c' in 1 second.
- Type the character 'c' in 1 second.
```

**Example 2:**
```
Input: word = "bza"
Output: 7
Explanation: The characters are printed as follows:
- Move the pointer clockwise to 'b' in 1 second.
- Type the character 'b' in 1 second.
- Move the pointer counterclockwise to 'z' in 2 seconds.
- Type the character 'z' in 1 second.
- Move the pointer clockwise to 'a' in 1 second.
- Type the character 'a' in 1 second.
```

**Example 3:**
```
Input: word = "zjpc"
Output: 34
Explanation: The characters are printed as follows:
- Move the pointer counterclockwise to 'z' in 1 second.
- Type the character 'z' in 1 second.
- Move the pointer clockwise to 'j' in 10 seconds.
- Type the character 'j' in 1 second.
- Move the pointer clockwise to 'p' in 6 seconds.
- Type the character 'p' in 1 second.
- Move the pointer counterclockwise to 'c' in 13 seconds.
- Type the character 'c' in 1 second.
```

---

## 3. Key Insight

> For each letter, the move cost = `min(|diff|, 26 - |diff|)` (shorter arc on the circle), plus 1 for typing.

---

## 4. Approach: Circular Distance — O(n) ✅

```
FUNCTION minTimeToType(word):
    time = 0; curr = 'a'
    FOR c IN word:
        diff = ABS(ord(c) - ord(curr))
        time += MIN(diff, 26 - diff) + 1
        curr = c
    RETURN time
```

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Key Takeaway

> **Circular distance = `min(d, 26-d)`** — always take the shorter arc. Add 1 for each typing action.
