# 1073. Adding Two Negabinary Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/adding-two-negabinary-numbers](https://leetcode.com/problems/adding-two-negabinary-numbers)
**Companies:** Grab

---

## 1. Problem Description

Given two numbers `arr1` and `arr2` in base **-2**, return the result of adding them together.

Each number is given in *array format*: as an array of 0s and 1s, from most significant bit to least significant bit. For example, `arr = [1,1,0,1]` represents the number `(-2)^3 + (-2)^2 + (-2)^0 = -3`. A number `arr` in *array format* is also guaranteed to have no leading zeros: either `arr == [0]` or `arr[0] == 1`.

Return the result of adding `arr1` and `arr2` in the same format: as an array of 0s and 1s with no leading zeros.

**Constraints:**
- `1 ≤ arr1.length, arr2.length ≤ 1000`
- `arr1[i]` and `arr2[i]` are `0` or `1`
- `arr1` and `arr2` have no leading zeros

---

## 2. Examples

```
Example 1:
  Input: arr1 = [1,1,1,1,1], arr2 = [1,0,1]
  Output: [1,0,0,0,0]
  Explanation: arr1 represents 11, arr2 represents 5, the output represents 16.

Example 2:
  Input: arr1 = [0], arr2 = [0]
  Output: [0]

Example 3:
  Input: arr1 = [0], arr2 = [1]
  Output: [1]
```

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

## 6. Follow-Up Questions

1. How would you modify the algorithm to handle subtraction of two negabinary numbers?
2. Can you extend the solution to support arbitrary negative bases?
3. What changes are needed if the input arrays may contain leading zeros?

---

## Key Takeaway

> Negabinary addition follows the same digit-by-digit pattern, but carry propagation is non-standard. The key is handling the carry cases (2, -1, -2) correctly. This tests your ability to work with unusual bases.
