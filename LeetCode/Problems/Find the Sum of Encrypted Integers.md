# 3079. Find the Sum of Encrypted Integers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-sum-of-encrypted-integers](https://leetcode.com/problems/find-the-sum-of-encrypted-integers)
**Companies:** Larsen Toubro

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Digit Replacement — O(n · d) ✅](#2-approach-digit-replacement--on--d-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

"Encrypt" each number by replacing every digit with the maximum digit in that number. Return the sum of all encrypted numbers.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 1000`

---

## 2. Approach: Digit Replacement — O(n · d) ✅

```
FUNCTION sumOfEncryptedInt(nums):
    total ← 0
    FOR num IN nums DO
        s ← str(num)
        maxDigit ← MAX(s)
        encrypted ← int(maxDigit * len(s))  // e.g., "123" → "333"
        total += encrypted
    RETURN total
```

---

## 3. Key Takeaway

> Replace all digits with the max digit. Encrypted value = `maxDigit × repunit(len)` where repunit = 111...1 of that length.
