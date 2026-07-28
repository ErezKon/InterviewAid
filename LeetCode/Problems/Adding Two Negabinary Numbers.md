# 1073. Adding Two Negabinary Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/adding-two-negabinary-numbers](https://leetcode.com/problems/adding-two-negabinary-numbers)
**Companies:** Grab

---

## 1. Problem Description

Given two arrays `arr1` and `arr2` representing two non‑negative integers in **negabinary** (base ‑2), return their sum in negabinary.

Negabinary: digit at position `i` represents `val × (-2)^i`.

**Constraints:**
- `1 ≤ arr1.length, arr2.length ≤ 1000`
- Each array is non‑empty and has no leading zeros

---

## 2. Examples

| arr1 | arr2 | Output |
|------|------|--------|
| `[1,1,1,1,1]` | `[1,0,1]` | `[1,0,0,0,0]` |
| `[1]` | `[1]` | `[1,1]` |
| `[0]` | `[0]` | `[0]` |

*Explanation:* The first example adds `11111` (base ‑2) and `101` (base ‑2) to get `10000` (base ‑2).

---

## 3. Approach

**Simulation — O(max(n,m))**

```text
FUNCTION addNegabinary(arr1, arr2):
    i ← len(arr1) - 1
    j ← len(arr2) - 1
    carry ← 0
    result ← []
    WHILE i ≥ 0 OR j ≥ 0 OR carry ≠ 0:
        sum ← carry
        IF i ≥ 0:
            sum ← sum + arr1[i]
            i ← i - 1
        IF j ≥ 0:
            sum ← sum + arr2[j]
            j ← j - 1
        IF sum = 2:
            result.ADD(0)
            carry ← -1
        ELSE IF sum = -2:
            result.ADD(0)
            carry ← 1
        ELSE IF sum = -1:
            result.ADD(1)
            carry ← 1
        ELSE:
            result.ADD(sum)
            carry ← 0
    // Remove leading zeros
    WHILE len(result) > 1 AND result[-1] = 0:
        result.POP()
    RETURN reversed(result)
```

---

## 4. Walkthrough

Consider `arr1 = [1,1,1,1,1]` and `arr2 = [1,0,1]`.

| Step | i | j | carry | sum | result (reversed) |
|------|---|---|-------|-----|-------------------|
| 1 | 4 | 2 | 0 | 1+1 = 2 | add 0, carry -1 |
| 2 | 3 | 1 | -1 | 1+0-1 = 0 | add 0, carry 0 |
| 3 | 2 | 0 | 0 | 1+1 = 2 | add 0, carry -1 |
| 4 | 1 | - | -1 | 1-1 = 0 | add 0, carry 0 |
| 5 | 0 | - | 0 | 1 | add 1, carry 0 |

Result reversed = `[1,0,0,0,0]` which is the correct negabinary sum.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(max(n,m)) | O(max(n,m)) |

---

## 6. Follow‑Up Questions

1. How would you modify the algorithm to handle subtraction of two negabinary numbers?
2. Can you extend the solution to support arbitrary negative bases?
3. What changes are needed if the input arrays may contain leading zeros?

---

## Key Takeaway

> Negabinary addition follows the same digit‑by‑digit pattern, but carry propagation is non‑standard. The key is handling the carry cases (2, -1, -2) correctly. This tests your ability to work with unusual bases.
