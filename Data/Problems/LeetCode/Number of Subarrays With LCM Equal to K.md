# 2470. Number of Subarrays With LCM Equal to K

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google, Unity

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate with Early Break — O(n²)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Count subarrays whose LCM equals exactly `k`.

---

## 2. Key Insight

> LCM is monotonically non-decreasing. Once LCM exceeds `k`, extending further won't help → break early.

---

## 3. Approach: Enumerate with Early Break — O(n²) ✅

```text
FUNCTION subarrayLCM(nums, k):
    // total count of qualifying subarrays
    SET total ← 0
    FOR i ← 0 TO LENGTH(nums) - 1:
        SET lcm ← 1
        FOR j ← i TO LENGTH(nums) - 1:
            SET lcm ← LCM(lcm, nums[j])
            IF lcm = k:
                SET total ← total + 1
            IF lcm > k:
                BREAK // further extension only increases LCM
    RETURN total
```

---

## 4. Examples

| nums | k | Output |
|------|---|--------|
| [2,3,4] | 12 | 2 |
| [1,2,3] | 6 | 1 |
| [5,10,20] | 20 | 3 |

*Explanation:* In the first example, subarrays `[2,3,4]` and `[3,4]` have LCM `12`.

---

## 5. Walkthrough

Consider `nums = [2,3,4]`, `k = 12`.

1. **i = 0** (start at 2):
   - j=0: lcm = LCM(1,2) = 2 → not k.
   - j=1: lcm = LCM(2,3) = 6 → not k.
   - j=2: lcm = LCM(6,4) = 12 → count++ (subarray `[2,3,4]`).
2. **i = 1** (start at 3):
   - j=1: lcm = 3 → not k.
   - j=2: lcm = LCM(3,4) = 12 → count++ (subarray `[3,4]`).
3. **i = 2** (start at 4):
   - j=2: lcm = 4 → not k.
Total count = 2.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n² · log k) worst case, early break reduces average work |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would you modify the algorithm to handle large `k` values where LCM may overflow?
- Can you design a faster solution using prime factorization and sliding windows?
- What changes are needed if we need subarrays with LCM **≤** `k` instead of exactly `k`?

---

## 8. Key Takeaway

> **LCM only grows → early termination.** Once LCM exceeds k, no further extension helps. Break immediately for efficiency.
