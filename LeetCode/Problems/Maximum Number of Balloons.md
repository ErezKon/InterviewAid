# 1189. Maximum Number of Balloons

**Difficulty:** 🟢 Easy  
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-balloons](https://leetcode.com/problems/maximum-number-of-balloons)
**Companies:** Microsoft, Wayfair

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `text`, return the **maximum number of times** you can form the word `"balloon"` using the characters in `text`. Each character can only be used once.

**Constraints:**
- `1 <= text.length <= 10^4`
- `text` consists of lowercase English letters only.

---

## Examples

**Example 1:**
```
Input:  text = "nlaebolko"
Output: 1
Explanation: "balloon" uses b,a,l,l,o,o,n. We have exactly one of each needed.
```

**Example 2:**
```
Input:  text = "loonbalxballpoon"
Output: 2
```

---

## Key Insight

> Count character frequencies. The word "balloon" requires: **b×1, a×1, l×2, o×2, n×1**. The answer is the **minimum** of `count[c] / needed[c]` across all required characters.

---

## Approach

```
FUNCTION maxNumberOfBalloons(text)
    count ← frequency map of text

    RETURN MIN(
        count['b'],
        count['a'],
        count['l'] / 2,
        count['o'] / 2,
        count['n']
    )
END FUNCTION
```

---

## Walkthrough

```
text = "loonbalxballpoon"
```

| Char | Count | Needed per "balloon" | Available instances |
|------|-------|---------------------|---------------------|
| b    | 2     | 1                   | 2/1 = 2             |
| a    | 2     | 1                   | 2/1 = 2             |
| l    | 4     | 2                   | 4/2 = 2             |
| o    | 3     | 2                   | 3/2 = 1             |
| n    | 2     | 1                   | 2/1 = 2             |

min(2, 2, 2, 1, 2) = **1**... Hmm, let me recount: l-o-o-n-b-a-l-x-b-a-l-l-p-o-o-n → b:2, a:2, l:4, o:4, n:2. → min(2,2,2,2,2) = **2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — one pass for frequency count |
| Space  | **O(1)** — fixed 26-letter array |

---

## Follow-Up Questions

1. **What if the target word were arbitrary (not just "balloon")?**
   Same approach — count required frequency for each character in the target, then take the min ratio.

2. **What if characters could be reused?**
   Then the answer is infinite (or limited by some other constraint).

3. **How would you handle Unicode characters?**
   Use a hash map instead of a fixed-size array.

---

## Key Takeaway

> **Frequency counting + bottleneck analysis** — the answer is always limited by the scarcest required character relative to its demand.
