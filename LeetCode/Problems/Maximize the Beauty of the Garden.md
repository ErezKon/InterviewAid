# 1788. Maximize the Beauty of the Garden

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-the-beauty-of-the-garden](https://leetcode.com/problems/maximize-the-beauty-of-the-garden)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Prefix Sum + Hash Map — O(n)](#approach-prefix-sum--hash-map--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `flowers` where `flowers[i]` represents the beauty of the i-th flower (can be negative), find a contiguous subarray `[i..j]` such that `flowers[i] == flowers[j]` and the sum of all **positive** flowers between `i` and `j` (inclusive) is maximized. Return the maximum beauty.

**Constraints:**
- `2 ≤ flowers.length ≤ 10⁵`
- `-10⁴ ≤ flowers[i] ≤ 10⁴`

---

## Key Insight

> Build a prefix sum of positive values. For each flower value `v`, find the first and last occurrence. The beauty = `prefix[last] - prefix[first] + (v if v > 0 else 2*v)` (we must include the endpoints). Track the earliest prefix sum for each flower value.

---

## Approach: Prefix Sum + Hash Map — O(n) ✅

```
FUNCTION maximumBeauty(flowers):
    n = len(flowers)
    prefix = [0] * (n + 1)    // prefix sum of max(0, flowers[i])
    FOR i ← 0 TO n - 1:
        prefix[i + 1] = prefix[i] + MAX(0, flowers[i])

    firstSeen = {}    // value → first index
    result = -infinity

    FOR i ← 0 TO n - 1:
        IF flowers[i] IN firstSeen:
            j = firstSeen[flowers[i]]
            // Sum of positives in [j+1..i-1] + both endpoints
            beauty = prefix[i] - prefix[j + 1] + flowers[i] + flowers[i]
            // If flowers[i] > 0, they're already in prefix
            // Adjust: we want flowers[j] + positives_between + flowers[i]
            beauty = prefix[i] - prefix[j + 1] + 2 * flowers[i]
            result = MAX(result, beauty)
        ELSE:
            firstSeen[flowers[i]] = i

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix sum + hash map | **O(n)** | O(n) |

---

## Key Takeaway

> **For "maximize sum between matching endpoints," use prefix sums of positive elements and a hash map to track the first occurrence of each value.** The matching constraint turns a subarray problem into a hash map lookup.
