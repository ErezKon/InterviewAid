# 1073. Adding Two Negabinary Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/adding-two-negabinary-numbers](https://leetcode.com/problems/adding-two-negabinary-numbers)
**Companies:** Grab

---

## 1. Problem Description

Given two arrays `arr1` and `arr2` representing two non-negative integers in **negabinary** (base -2), return their sum in negabinary.

Negabinary: digit at position `i` represents `val × (-2)^i`.

**Constraints:**
- `1 ≤ arr1.length, arr2.length ≤ 1000`
- Each array is non-empty and has no leading zeros

---

## 2. Key Insight

> Same addition pattern as regular binary, but the base is -2. Carry rules change: when sum is 2 or -2, we need to adjust. Use `carry` but propagate it with sign awareness.

**Carry rules for base -2:**
- If `sum = 2`: result digit = 0, carry = -1 (since 2 = 0 + (-1)×(-2))
- If `sum = -1`: result digit = 1, carry = 1 (since -1 = 1 + 1×(-2))
- If `sum = -2`: result digit = 0, carry = 1 (since -2 = 0 + 1×(-2))

---

## 3. Approach: Simulation — O(max(n,m)) ✅

```
FUNCTION addNegabinary(arr1, arr2):
    i, j = len(arr1)-1, len(arr2)-1
    carry = 0
    result = []
    
    WHILE i >= 0 OR j >= 0 OR carry:
        sum = carry
        IF i >= 0: sum += arr1[i]; i -= 1
        IF j >= 0: sum += arr2[j]; j -= 1
        
        IF sum == 2 OR sum == -2:
            result.ADD(0)
            carry = 1 IF sum == -2 ELSE -1
        ELSE IF sum == -1:
            result.ADD(1)
            carry = 1
        ELSE:
            result.ADD(sum)
            carry = 0
    
    // Remove leading zeros
    WHILE len(result) > 1 AND result[-1] == 0:
        result.POP()
    
    RETURN reversed(result)
```

| Time | Space |
|------|-------|
| O(max(n,m)) | O(max(n,m)) |

---

## Key Takeaway

> Negabinary addition follows the same digit-by-digit pattern, but carry propagation is non-standard. The key is handling the carry cases (2, -1, -2) correctly. This tests your ability to work with unusual bases.
