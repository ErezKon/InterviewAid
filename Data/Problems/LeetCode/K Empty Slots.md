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

There are `n` bulbs in a row. On day `bulbs[i]`, bulb `bulbs[i]` is turned on. Find the earliest day where exactly `k` bulbs between two turned-on bulbs are all off.

**Constraints:**
- `1 <= n <= 2 × 10⁴`
- `1 <= k < n`

---

## 2. Examples

```
Input: bulbs = [1,3,2], k = 1
Output: 2 (on day 2, bulbs 1 and 3 are on with 1 empty slot between)
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
