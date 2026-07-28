# 1524. Number of Sub-arrays With Odd Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum](https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum)
**Companies:** Amazon, Bloomberg, Directi, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Prefix Parity — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Count subarrays with an odd sum. Return mod 10⁹+7.

---

## 2. Key Insight

> Subarray sum parity = difference of prefix sum parities. Odd sum ↔ prefix sums with different parities. Track counts of even and odd prefix sums.

---

## 3. Approach: Prefix Parity — O(n) ✅

```text
FUNCTION numOfSubarrays(arr):
    SET MOD ← 1_000_000_007
    SET oddCount ← 0
    SET evenCount ← 1   // empty prefix counts as even
    SET prefixSum ← 0
    SET result ← 0
    FOR num IN arr:
        SET prefixSum ← prefixSum + num
        IF prefixSum % 2 == 0:
            // current prefix even, pair with previous odd prefixes
            SET result ← (result + oddCount) % MOD
            SET evenCount ← evenCount + 1
        ELSE:
            // current prefix odd, pair with previous even prefixes
            SET result ← (result + evenCount) % MOD
            SET oddCount ← oddCount + 1
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Examples

**Example 1:**
```
arr = [1,2,3,4]
Output: 4
Explanation: The odd‑sum subarrays are [1], [2,3], [1,2,3], [3,4].
```

**Example 2:**
```
arr = [2,4,6]
Output: 0
Explanation: All subarrays have even sum.
```

---

## 6. Walkthrough

Consider Example 1 `[1,2,3,4]`:
| Index | Num | Prefix Sum | Parity | evenCount | oddCount | result |
|-------|-----|------------|--------|-----------|----------|--------|
| -1   | -   | 0          | even   | 1         | 0        | 0 |
| 0    | 1   | 1          | odd    | 1         | 1        | 1 (paired with evenCount) |
| 1    | 2   | 3          | odd    | 1         | 2        | 2 (add evenCount) |
| 2    | 3   | 6          | even   | 2         | 2        | 4 (add oddCount) |
| 3    | 4   | 10         | even   | 3         | 2        | 4 (add oddCount) |

The final result 4 matches the counted odd‑sum subarrays.

---

## 7. Key Takeaway

> **Prefix parity counting.** Even prefix - odd prefix = odd sum. Track even/odd prefix sum counts and pair them.
