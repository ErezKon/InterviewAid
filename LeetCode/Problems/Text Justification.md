# 68. Text Justification

**Difficulty:** 🔴 Hard
**Acceptance:** 47.5%
**LeetCode:** [https://leetcode.com/problems/text-justification](https://leetcode.com/problems/text-justification)
**Companies:** Airbnb, Amazon, Anyscale, Apple, Atlassian, Autodesk, Bcg, Bloomberg, Bytedance, Capital One, Coinbase, Coursera, Cyntexa, Databricks, De Shaw, Goldman Sachs, Google, Hive, Karat, Kotak Mahindra Bank, Lime, Linkedin, Meta, Microsoft, Mongodb, Moveworks, Notion, Oracle, Paypal, Pinterest, Quora, Robinhood, Roblox, Samsara, Sentry, Sig, Sofi, Tiktok, Tinder, Uber, Visa, Waymo, Weride, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Greedy Line Packing — O(n) ✅](#3-approach-greedy-line-packing--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given an array of strings `words` and a width `maxWidth`, format the text such that each line has exactly `maxWidth` characters and is **fully (left and right) justified**.

Pack as many words as you can in each line. Pad extra spaces `' '` when necessary so that each line has exactly `maxWidth` characters.

Extra spaces between words should be distributed as **evenly as possible**. If the number of spaces does not divide evenly, the **left slots** get more spaces than the right slots.

The **last line** should be **left-justified** with no extra space between words.

**Constraints:**
- `1 <= words.length <= 300`
- `1 <= words[i].length <= 20`
- `1 <= maxWidth <= 100`
- `words[i]` consists of only English letters and symbols.

---

## 2. Examples

```
Example 1:
  Input:  words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
  Output: ["This    is    an",
           "example  of text",
           "justification.  "]

Example 2:
  Input:  words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
  Output: ["What   must   be",
           "acknowledgment  ",
           "shall be        "]
```

---

## 3. Approach: Greedy Line Packing — O(n) ✅

### Algorithm

1. **Greedily pack** words into lines: keep adding words while `totalChars + numWords - 1 <= maxWidth` (words + minimum 1 space between each).
2. **Distribute spaces** for each line:
   - **Last line or single word:** left-justify (single space between words, pad right with spaces).
   - **Otherwise:** Distribute `totalSpaces` evenly across `gaps = numWords - 1`. Each gap gets `totalSpaces / gaps` spaces, and the first `totalSpaces % gaps` gaps get one extra.

### Pseudocode

```
FUNCTION fullJustify(words, maxWidth):

    result = []
    i = 0

    WHILE i < len(words):
        // Step 1: Determine how many words fit on this line
        j = i
        lineLen = len(words[i])

        WHILE j + 1 < len(words) AND lineLen + 1 + len(words[j+1]) <= maxWidth:
            j += 1
            lineLen += 1 + len(words[j])

        // Step 2: Build the line
        numWords = j - i + 1
        totalSpaces = maxWidth - (sum of word lengths in words[i..j])

        IF j == len(words) - 1 OR numWords == 1:
            // Last line or single word: left-justify
            line = JOIN words[i..j] with single spaces
            line += spaces to fill maxWidth

        ELSE:
            // Distribute spaces evenly
            gaps = numWords - 1
            spacePerGap = totalSpaces / gaps
            extraSpaces = totalSpaces % gaps

            line = ""
            FOR w ← i TO j:
                line += words[w]
                IF w < j:
                    spaces = spacePerGap + (1 IF w - i < extraSpaces ELSE 0)
                    line += spaces × ' '

        result.ADD(line)
        i = j + 1

    RETURN result
```

---

## 4. Walkthrough

```
words = ["This", "is", "an", "example", "of", "text", "justification."]
maxWidth = 16

Line 1: Pack "This"(4), "is"(2), "an"(2) → 4+1+2+1+2 = 10 ≤ 16
  Next word "example"(7): 10+1+7 = 18 > 16 → stop
  Words: ["This", "is", "an"], chars = 8, totalSpaces = 16-8 = 8
  gaps = 2, spacePerGap = 4, extraSpaces = 0
  → "This    is    an"

Line 2: Pack "example"(7), "of"(2), "text"(4) → 7+1+2+1+4 = 15 ≤ 16
  Next word "justification."(14): 15+1+14 = 30 > 16 → stop
  Words: ["example", "of", "text"], chars = 13, totalSpaces = 3
  gaps = 2, spacePerGap = 1, extraSpaces = 1
  → "example  of text"   (first gap gets extra space)

Line 3: "justification." — last line, left-justify
  → "justification.  "

Result ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) where n = total characters across all words |
| **Space** | O(maxWidth) per line construction |

---

## 6. Follow-Up Questions

### 6.1 What if we want center-justified text?

Distribute spaces equally on both sides. If odd spaces remain, put the extra space on the right (or left, depending on convention).

### 6.2 How would you handle hyphenation?

If a word doesn't fit, split it with a hyphen at a valid break point. This requires a dictionary or syllable rules and significantly complicates the greedy packing.

### 6.3 What about proportional fonts (not monospaced)?

maxWidth would be measured in pixels, not characters. Each character has a different width. The greedy packing logic stays the same but uses pixel widths instead of character counts.

### 6.4 Can this be solved with DP (like TeX)?

Yes — TeX uses **Knuth-Plass** line-breaking which minimizes the sum of squared "badness" across all lines. It produces globally optimal output but is O(n²). The greedy approach is locally optimal per line.

---

## Key Takeaway

> Text Justification is primarily a **careful implementation** problem. The algorithm is simple (greedy pack + distribute spaces), but edge cases (last line, single word, uneven space distribution) require attention to detail. Focus on getting the space distribution formula right: `spaces = base + (1 if slot < remainder else 0)`.
