# 806. Number of Lines To Write String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-lines-to-write-string](https://leetcode.com/problems/number-of-lines-to-write-string)
**Companies:** Google, Nvidia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Simulation — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a string `s` of lowercase English letters and an array `widths` denoting **how many pixels wide** each lowercase English letter is. Specifically, `widths[0]` is the width of `'a'`, `widths[1]` is the width of `'b'`, and so on.

You are trying to write `s` across several lines, where **each line is no longer than **`100`** pixels**. Starting at the beginning of `s`, write as many letters on the first line such that the total width does not exceed `100` pixels. Then, from where you stopped in `s`, continue writing as many letters as you can on the second line. Continue this process until you have written all of `s`.

Return *an array *`result`* of length 2 where:*

- `result[0]`* is the total number of lines.*
- `result[1]`* is the width of the last line in pixels.*

**Constraints:**
- `widths.length == 26`
- `2 <= widths[i] <= 10`
- `1 <= s.length <= 1000`
- `s` contains only lowercase English letters.

---

## 2. Examples

**Example 1:**
```
Input: widths = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], s = "abcdefghijklmnopqrstuvwxyz"
Output: [3,60]
Explanation: You can write s as follows:
abcdefghij  // 100 pixels wide
klmnopqrst  // 100 pixels wide
uvwxyz      // 60 pixels wide
There are a total of 3 lines, and the last line is 60 pixels wide.
```

**Example 2:**
```
Input: widths = [4,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], s = "bbbcccdddaaa"
Output: [2,4]
Explanation: You can write s as follows:
bbbcccdddaa  // 98 pixels wide
a            // 4 pixels wide
There are a total of 2 lines, and the last line is 4 pixels wide.
```

---

## 3. Approach: Simulation — O(n) ✅

```
FUNCTION numberOfLines(widths, s):
    lines ← 1
    curWidth ← 0
    FOR ch IN s:
        w ← widths[ORD(ch) - ORD('a')]
        IF curWidth + w > 100:
            lines ← lines + 1
            curWidth ← w
        ELSE:
            curWidth ← curWidth + w
    RETURN [lines, curWidth]
```

---

## 4. Walkthrough

Take the first example where each character width is 10.
| Step | Character | curWidth before | w | Action | lines | curWidth after |
|------|-----------|----------------|---|--------|-------|----------------|
| 1 | a | 0 | 10 | add | 1 | 10 |
| … | … | … | … | … | … | … |
| 10 | j | 90 | 10 | add → 100 | 1 | 100 |
| 11 | k | 100 | 10 | overflow → new line | 2 | 10 |
| … | … | … | … | … | … | … |
After processing all 26 letters, we end with 3 lines and the last line width 60.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

- How would the solution change if the maximum line width were not fixed but given as an input?
- Can you extend the algorithm to also return the actual text layout per line?

---

## 7. Key Takeaway

> **Greedy line packing.** Add characters to the current line until overflow, then start a new line.
