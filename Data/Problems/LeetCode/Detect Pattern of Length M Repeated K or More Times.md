# 1566. Detect Pattern of Length M Repeated K or More Times

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/detect-pattern-of-length-m-repeated-k-or-more-times](https://leetcode.com/problems/detect-pattern-of-length-m-repeated-k-or-more-times)
**Companies:** Hrt

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sliding Comparison](#approach-sliding-comparison)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `arr` of positive integers and two integers `m` and `k`, return `true` if there exists a pattern of length `m` that is repeated `k` or more **consecutive** times in the array.

A pattern is a subarray (contiguous) of length `m` that appears `k` times back-to-back. So the total length of the repeated segment is `m * k`.

**Constraints:**
- `2 <= arr.length <= 100`
- `1 <= arr[i] <= 100`
- `1 <= m <= 100`
- `2 <= k <= 100`

---

## Examples

**Example 1:**
```
Input: arr = [1,2,4,4,4,4], m = 1, k = 3
Output: true
Explanation: Pattern [4] of length 1 repeats 4 consecutive times.
```

**Example 2:**
```
Input: arr = [1,2,1,2,1,1,1,3], m = 2, k = 2
Output: true
Explanation: Pattern [1,2] repeats 2 consecutive times at index 0.
```

**Example 3:**
```
Input: arr = [1,2,1,2,1,3], m = 2, k = 3
Output: false
Explanation: [1,2] repeats only 2 times, not 3.
```

---

## Key Insight

> If a pattern of length `m` repeats `k` consecutive times, then for every index `i` in that block, `arr[i] == arr[i + m]` holds for `(k-1) * m` consecutive positions. Count consecutive matches of `arr[i] == arr[i+m]` and check if the streak reaches `(k-1) * m`.

---

## Approach: Sliding Comparison ✅

Compare each element with the element `m` positions ahead. Count consecutive matches. If the count reaches `(k-1) * m`, the pattern repeats `k` times.

```
FUNCTION containsPattern(arr, m, k):
    count ← 0
    
    FOR i ← 0 TO length(arr) - m - 1 DO
        IF arr[i] = arr[i + m] THEN
            count ← count + 1
            IF count = (k - 1) * m THEN
                RETURN true
        ELSE
            count ← 0
    END FOR
    
    RETURN false
END FUNCTION
```

---

## Walkthrough

```
arr = [1, 2, 1, 2, 1, 1, 1, 3],  m = 2, k = 2
Need (k-1)*m = 2 consecutive matches.
```

| i | arr[i] | arr[i+2] | Match? | count |
|---|--------|----------|--------|-------|
| 0 | 1      | 1        | ✅      | 1     |
| 1 | 2      | 2        | ✅      | **2 = target → return true** |

Pattern `[1,2]` repeats twice starting at index 0.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | Single pass through the array |
| **Space** | O(1) | Only a counter variable |

---

## Follow-Up Questions

**Q1: Why compare `arr[i]` with `arr[i+m]` instead of extracting subarrays?**
> Extracting and comparing subarrays would be O(n*m). The element-wise comparison with offset `m` achieves O(n) by leveraging the fact that if all corresponding elements match across `k` repetitions, every element equals the one `m` positions ahead.

**Q2: What if the pattern can appear non-consecutively?**
> That becomes a much harder problem — essentially substring matching with gaps. You'd need a different approach (possibly hashing or dynamic programming).

**Q3: Could you use string matching (KMP, Rabin-Karp)?**
> Yes — convert the array to a string, build the repeated pattern, and search. But the simple O(n) approach above is cleaner for this problem.

---

## Key Takeaway

> **Detecting k consecutive repetitions of a length-m pattern reduces to counting consecutive positions where `arr[i] == arr[i+m]` — when the streak hits `(k-1)*m`, you've found the repetition.**
