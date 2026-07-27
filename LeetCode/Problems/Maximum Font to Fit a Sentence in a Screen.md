# 1618. Maximum Font to Fit a Sentence in a Screen

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-font-to-fit-a-sentence-in-a-screen](https://leetcode.com/problems/maximum-font-to-fit-a-sentence-in-a-screen)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Binary Search — O(n · log F)](#approach-binary-search--on--log-f-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a sentence, screen dimensions (w × h), and a sorted list of font sizes, find the largest font size such that the sentence fits on the screen. Use the FontInfo API to query character width/height at a given font.

---

## Key Insight

> Fonts are sorted. Binary search on the font list. For each candidate font, check if the total text width ≤ screen width and font height ≤ screen height.

---

## Approach: Binary Search — O(n · log F) ✅

```
FUNCTION maxFont(text, w, h, fonts, fontInfo):
    lo, hi = 0, len(fonts) - 1
    result = -1
    WHILE lo <= hi:
        mid = (lo + hi) / 2
        fontSize = fonts[mid]
        IF fontInfo.getHeight(fontSize) <= h AND
           SUM(fontInfo.getWidth(fontSize, c) for c in text) <= w:
            result = fontSize
            lo = mid + 1
        ELSE:
            hi = mid - 1
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Search | **O(n · log F)** | O(1) |

---

## Key Takeaway

> **Binary search on a sorted font list with a feasibility check per candidate.** The check sums character widths and compares height.
