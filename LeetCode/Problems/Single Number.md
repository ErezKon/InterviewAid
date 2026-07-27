# 136. Single Number

**Difficulty:** 🟢 Easy
**Acceptance:** 74.0%
**LeetCode:** [https://leetcode.com/problems/single-number](https://leetcode.com/problems/single-number)
**Companies:** Accenture, Adobe, Airbnb, Amazon, Amdocs, Bloomberg, Cisco, Cognizant, Google, Meta, Microsoft, Palantir, Qualcomm, Tcs, Yandex

---

## 1. Problem Description

Given a non-empty array where every element appears **twice** except for one, find that single one. Must run in O(n) time and O(1) space.

---

## 2. Approach: XOR — O(n) ✅

```
FUNCTION singleNumber(nums):
    result = 0
    FOR num IN nums:
        result = result XOR num
    RETURN result
```

### Why XOR Works

- `a XOR a = 0` (pairs cancel out)
- `a XOR 0 = a` (identity)
- XOR is commutative and associative

---

## 3. Follow-Up Questions

### Single Number II (LeetCode #137) — every element appears 3 times?

Count bits modulo 3 using two bitmasks. Or sort and check triplets.

### Single Number III (LeetCode #260) — two unique numbers?

XOR all → result has bits set where the two numbers differ. Use any set bit to partition into two groups and XOR each group.

---

## Key Takeaway

> XOR is the go-to for "find the unique element" problems. `a ^ a = 0` cancels duplicates. O(n) time, O(1) space.
