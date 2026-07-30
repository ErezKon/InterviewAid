# 1618. Maximum Font to Fit a Sentence in a Screen

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-font-to-fit-a-sentence-in-a-screen](https://leetcode.com/problems/maximum-font-to-fit-a-sentence-in-a-screen)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Binary Search — O(n · log F)](#approach-binary-search--on--log-f-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a sentence, screen dimensions (width `w` and height `h`), and a sorted list of font sizes, find the largest font size such that the sentence fits on the screen. You can query a `FontInfo` API for the width and height of any character at a specific font size.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `text = "Hello World"`, `w = 100`, `h = 20`, `fonts = [10,12,14,16,18]` | `14` | Font size `14` fits: total width ≤ 100 and height ≤ 20. Size `16` exceeds width.
| `text = "ABC"`, `w = 30`, `h = 10`, `fonts = [5,8,10]` | `8` | Font size `8` fits, but `10` exceeds height.

---

## Key Insight

> Fonts are sorted. Binary search on the font list. For each candidate font, check if the total text width ≤ screen width and font height ≤ screen height.

---

## Approach: Binary Search — O(n · log F) ✅

```text
FUNCTION maxFont(text, w, h, fonts, fontInfo):
    lo ← 0
    hi ← len(fonts) - 1
    result ← -1
    WHILE lo ≤ hi:
        mid ← (lo + hi) / 2
        size ← fonts[mid]
        // feasibility check
        IF fontInfo.getHeight(size) ≤ h AND
           SUM(fontInfo.getWidth(size, c) FOR c IN text) ≤ w:
            result ← size
            lo ← mid + 1          // try larger fonts
        ELSE:
            hi ← mid - 1          // too big, shrink
    RETURN result
```

---

## Walkthrough

Consider `text = "Hello"`, `w = 50`, `h = 12`, `fonts = [8,10,12,14]`.

| step | lo | hi | mid | size | height ≤ h? | width ≤ w? | result |
|------|----|----|-----|------|------------|------------|--------|
|1|0|3|1|10|yes|yes|10| → lo=2
|2|2|3|2|12|yes|no|10| → hi=1 (stop)

The algorithm returns `10` as the largest fitting font.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search | **O(n · log F)** | O(1) |

---

## Follow-Up Questions

1. How would you adapt the solution if the font list is not sorted?
2. Can you extend the feasibility check to handle multi‑line text wrapping?
3. What if the `FontInfo` queries are expensive – how would you minimize calls?

---

## Key Takeaway

> **Binary search on a sorted font list with a feasibility check per candidate.** The check sums character widths and compares height.
