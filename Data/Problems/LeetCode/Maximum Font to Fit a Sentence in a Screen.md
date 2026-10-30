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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a string `text`. We want to display `text` on a screen of width `w` and height `h`. You can choose any font size from array `fonts`, which contains the available font sizes **in ascending order**.

You can use the `FontInfo` interface to get the width and height of any character at any available font size.

The `FontInfo` interface is defined as such:

```
interface FontInfo {
  // Returns the width of character ch on the screen using font size fontSize.
  // O(1) per call
  public int getWidth(int fontSize, char ch);

  // Returns the height of any character on the screen using font size fontSize.
  // O(1) per call
  public int getHeight(int fontSize);
}
```

The calculated width of `text` for some `fontSize` is the **sum** of every `getWidth(fontSize, text[i])` call for each `0 <= i < text.length` (**0-indexed**). The calculated height of `text` for some `fontSize` is `getHeight(fontSize)`. Note that `text` is displayed on a **single line**.

It is guaranteed that `FontInfo` will return the same value if you call `getHeight` or `getWidth` with the same parameters.

It is also guaranteed that for any font size `fontSize` and any character `ch`:

- `getHeight(fontSize) <= getHeight(fontSize+1)`
- `getWidth(fontSize, ch) <= getWidth(fontSize+1, ch)`

Return *the maximum font size you can use to display *`text`* on the screen*. If `text` cannot fit on the display with any font size, return `-1`.

**Constraints:**
- `1 <= text.length <= 50000`
- `text` contains only lowercase English letters.
- `1 <= w <= 10^7`
- `1 <= h <= 10^4`
- `1 <= fonts.length <= 10^5`
- `1 <= fonts[i] <= 10^5`
- `fonts` is sorted in ascending order and does not contain duplicates.

---

## Examples

**Example 1:**
```
Input: text = "helloworld", w = 80, h = 20, fonts = [6,8,10,12,14,16,18,24,36]
Output: 6
```

**Example 2:**
```
Input: text = "leetcode", w = 1000, h = 50, fonts = [1,2,4]
Output: 4
```

**Example 3:**
```
Input: text = "easyquestion", w = 100, h = 100, fonts = [10,15,20,25]
Output: -1
```

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
