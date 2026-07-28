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

```text
FUNCTION singleNumber(nums):
    // Initialize accumulator
    SET result ← 0
    FOR num IN nums:
        // XOR cancels paired numbers
        SET result ← result XOR num
    RETURN result
```

### Why XOR Works

- `a XOR a = 0` (pairs cancel out)
- `a XOR 0 = a` (identity)
- XOR is commutative and associative

---

## 3. Examples

| Input | Output |
|-------|--------|
| `[2,2,1]` | `1` |
| `[4,1,2,1,2]` | `4` |
| `[1]` | `1` |

---

## 4. Walkthrough

Consider `[4,1,2,1,2]`:

1. `result = 0 XOR 4 = 4`
2. `result = 4 XOR 1 = 5`
3. `result = 5 XOR 2 = 7`
4. `result = 7 XOR 1 = 6`
5. `result = 6 XOR 2 = 4`

All paired numbers cancel, leaving the unique `4`.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a constant‑size accumulator.

---

## 6. Follow-Up Questions

- **Single Number II:** Every element appears three times except one.
- **Single Number III:** Exactly two elements appear once, all others appear twice.

---

## Key Takeaway

> XOR is the go‑to for "find the unique element" problems. `a ^ a = 0` cancels duplicates. O(n) time, O(1) space.
