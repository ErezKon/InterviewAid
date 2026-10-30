# 2404. Most Frequent Even Element

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/most-frequent-even-element](https://leetcode.com/problems/most-frequent-even-element)
**Companies:** Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Counter — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums`, return *the most frequent even element*.

If there is a tie, return the **smallest** one. If there is no such element, return `-1`.

**Constraints:**
- `1 <= nums.length <= 2000`
- `0 <= nums[i] <= 10⁵`

---

## 2. Key Insight

> Filter even numbers, count frequencies, return the one with highest count (smallest value to break ties).

---

## 3. Approach: Counter — O(n) ✅

```text
FUNCTION mostFrequentEven(nums):
    // Build frequency map for even numbers
    SET count ← EMPTY MAP
    FOR num IN nums:
        IF num MOD 2 = 0:
            IF num IN count:
                SET count[num] ← count[num] + 1
            ELSE:
                SET count[num] ← 1
    // No even numbers found
    IF count IS EMPTY:
        RETURN -1
    // Find element with highest frequency, break ties by smaller value
    SET result ← -1
    SET bestFreq ← 0
    FOR (value, freq) IN count:
        IF freq > bestFreq OR (freq = bestFreq AND value < result):
            SET bestFreq ← freq
            SET result ← value
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Examples

```
Example 1:
  Input: nums = [0,1,2,2,4,4,1]
  Output: 2
  Explanation:
  The even elements are 0, 2, and 4. Of these, 2 and 4 appear the most.
  We return the smallest one, which is 2.
```

```
Example 2:
  Input: nums = [4,4,4,9,2,4]
  Output: 4
  Explanation: 4 is the even element appears the most.
```

```
Example 3:
  Input: nums = [29,47,21,41,13,37,25,7]
  Output: -1
  Explanation: There is no even element.
```

---

## Walkthrough

Consider the first example `nums = [0,1,2,2,4,4,1]`.
| Step | num | count map after step |
|------|-----|----------------------|
| 1 | 0 | {0:1} |
| 2 | 1 | {0:1} (odd, ignored) |
| 3 | 2 | {0:1, 2:1} |
| 4 | 2 | {0:1, 2:2} |
| 5 | 4 | {0:1, 2:2, 4:1} |
| 6 | 4 | {0:1, 2:2, 4:2} |
| 7 | 1 | unchanged |
After building the map, iterate to find the max frequency (2) and the smallest value among {2,4}, which is 2. Return 2.

---

## Key Takeaway

> **Filter + Counter + min with composite key** — sort by `(-frequency, value)` to get highest frequency, smallest value.
