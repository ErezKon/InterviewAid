# 2470. Number of Subarrays With LCM Equal to K

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google, Unity

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Enumerate with Early Break — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count subarrays whose LCM equals exactly `k`.

---

## 2. Key Insight

> LCM is monotonically non-decreasing. Once LCM exceeds `k`, extending further won't help → break early.

---

## 3. Approach: Enumerate with Early Break — O(n²) ✅

```
FUNCTION subarrayLCM(nums, k):
    count = 0
    FOR i ← 0 TO n - 1:
        lcm = 1
        FOR j ← i TO n - 1:
            lcm = LCM(lcm, nums[j])
            IF lcm == k: count += 1
            IF lcm > k: BREAK
    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n² · log k) worst case, often much better with early break |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **LCM only grows → early termination.** Once LCM exceeds k, no further extension helps. Break immediately for efficiency.
