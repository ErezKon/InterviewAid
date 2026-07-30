# 1054. Distant Barcodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/distant-barcodes](https://leetcode.com/problems/distant-barcodes)
**Companies:** Amazon, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sort by Frequency + Interleave](#approach-sort-by-frequency--interleave)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of integers `barcodes`, rearrange them so that no two **adjacent** elements are the same. A valid arrangement is guaranteed to exist.

**Constraints:**
- `1 <= barcodes.length <= 10000`
- `1 <= barcodes[i] <= 10000`

---

## Examples

**Example 1:**
```
Input: [1,1,1,2,2,2]
Output: [2,1,2,1,2,1] (or any valid arrangement)
```

**Example 2:**
```
Input: [1,1,1,1,2,2,3,3]
Output: [1,3,1,2,1,3,1,2] (or any valid arrangement)
```

---

## Key Insight

> Place the **most frequent** element first at even indices (0, 2, 4, ...), then fill remaining elements. This guarantees no two adjacent are the same (since the most frequent element gets maximum spacing).

Alternatively, use a **max-heap** — always pick the most frequent remaining element that isn't the same as the last placed.

---

## Approach: Sort by Frequency + Interleave ✅

```
FUNCTION rearrangeBarcodes(barcodes):
    freq ← Counter(barcodes)
    // Sort by frequency descending
    sorted_items ← sort freq.items() by count DESC

    result ← array of size n
    idx ← 0    // fill position

    FOR (value, count) IN sorted_items DO
        FOR _ ← 1 TO count DO
            result[idx] ← value
            idx ← idx + 2
            IF idx >= n THEN idx ← 1    // switch to odd indices

    RETURN result
END FUNCTION
```

---

## Walkthrough

```
barcodes = [1,1,1,1,2,2,3,3]
freq: {1:4, 2:2, 3:2}
sorted: [(1,4), (2,2), (3,2)]
n = 8
```

Fill even indices first (0,2,4,6), then odd (1,3,5,7):

| idx | value | result |
|-----|-------|--------|
| 0   | 1     | [1,_,_,_,_,_,_,_] |
| 2   | 1     | [1,_,1,_,_,_,_,_] |
| 4   | 1     | [1,_,1,_,1,_,_,_] |
| 6   | 1     | [1,_,1,_,1,_,1,_] |
| 1   | 2     | [1,2,1,_,1,_,1,_] |
| 3   | 2     | [1,2,1,2,1,_,1,_] |
| 5   | 3     | [1,2,1,2,1,3,1,_] |
| 7   | 3     | [1,2,1,2,1,3,1,3] |

No adjacent duplicates ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n log n) | Sorting by frequency (or O(n log k) with heap, k = distinct values) |
| **Space** | O(n) | Result array + frequency map |

---

## Follow-Up Questions

**Q1: Why does placing most frequent first work?**
> The most frequent element is the hardest to separate. By giving it even indices first, it gets maximum spacing. All other elements fill the gaps.

**Q2: How is this related to "Reorganize String" (LC 767)?**
> Identical problem structure — same algorithm works. LC 767 is for characters, this is for integers.

**Q3: When is rearrangement impossible?**
> When the most frequent element appears more than `ceil(n/2)` times. This problem guarantees a solution exists.

---

## Key Takeaway

> **"Rearrange so no adjacent duplicates" — sort by frequency, place the most frequent element at even indices, then fill odd indices. This greedy interleaving always works when a solution exists.**
