# 683. K Empty Slots

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/k-empty-slots](https://leetcode.com/problems/k-empty-slots)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sliding Window on Days Array — O(n) ✅](#4-approach-sliding-window-on-days-array--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You have `n` bulbs in a row numbered from `1` to `n`. Initially, all the bulbs are turned off. We turn on **exactly one** bulb every day until all bulbs are on after `n` days.

You are given an array `bulbs` of length `n` where `bulbs[i] = x` means that on the `(i+1)^th` day, we will turn on the bulb at position `x` where `i` is **0-indexed** and `x` is **1-indexed.**

Given an integer `k`, return *the **minimum day number** such that there exists two **turned on** bulbs that have **exactly** `k` bulbs between them that are **all turned off**. If there isn't such day, return `-1`.*

**Constraints:**
- `n == bulbs.length`
- `1 <= n <= 2 * 10^4`
- `1 <= bulbs[i] <= n`
- `bulbs` is a permutation of numbers from `1` to `n`.
- `0 <= k <= 2 * 10^4`

---

## 2. Examples

**Example 1:**
```
Input: bulbs = [1,3,2], k = 1
Output: 2
Explanation: On the first day: bulbs[0] = 1, first bulb is turned on: [1,0,0]
On the second day: bulbs[1] = 3, third bulb is turned on: [1,0,1]
On the third day: bulbs[2] = 2, second bulb is turned on: [1,1,1]
We return 2 because on the second day, there were two on bulbs with one off bulb between them.
```

**Example 2:**
```
Input: bulbs = [1,2,3], k = 1
Output: -1
```

---

## 3. Key Insight

Build `days[pos]` = the day bulb at position `pos` is turned on. Then find a window `[left, right]` of size `k+2` where `days[left]` and `days[right]` are both less than all `days[i]` for `left < i < right`.

---

## 4. Approach: Sliding Window on Days Array — O(n) ✅

```
FUNCTION kEmptySlots(bulbs, k):
    days = [0] * n
    FOR i, b IN enumerate(bulbs):
        days[b - 1] = i + 1    // day position b was turned on

    left = 0; right = k + 1
    ans = INF

    WHILE right < n:
        valid = true
        FOR i ← left + 1 TO right - 1:
            IF days[i] < days[left] OR days[i] < days[right]:
                left = i; right = i + k + 1
                valid = false; BREAK
        IF valid:
            ans = MIN(ans, MAX(days[left], days[right]))
            left = right; right = left + k + 1

    RETURN ans IF ans != INF ELSE -1
```

---

## 5. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Each element is checked at most twice |
| Space | O(n) | Days array |

---

## 6. Key Takeaway

> Transform to `days[position]` array, then use a sliding window to find boundaries where all interior elements have larger day values. This is a classic "minimum of sliding window" variant.
