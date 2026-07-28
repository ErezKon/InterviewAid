# 3756. Concatenate Non-Zero Digits and Multiply by Sum II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii)
**Companies:** Google

---

## 1. Problem Description

Given an integer `num`, repeatedly perform the following steps until the value stabilizes or a termination condition is met:
1. Remove all zero digits from `num` and concatenate the remaining digits to form a new integer `c`.
2. Compute the sum of the digits of the original `num` as `s`.
3. Set `num = c * s`.
Return the final value of `num`.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| 1010 | 22 | Remove zeros → `11`; digit sum = 2; `11 * 2 = 22`. Stabilizes at 22. |
| 1203 | 72 | Remove zeros → `123`; digit sum = 6; `123 * 6 = 738`; next iteration → `738` → `738 * 18 = 13284` ... (continues until stable). |

---

## 3. Approach: Simulation — O(iterations × digits) ✅

```text
FUNCTION process(num):
    WHILE true:
        // 1. Build concatenated number without zeros
        digits = []
        temp = num
        WHILE temp > 0:
            d = temp % 10
            IF d != 0:
                PREPEND d TO digits
            temp = temp / 10
        concatenated = 0
        FOR d IN digits:
            concatenated = concatenated * 10 + d
        
        // 2. Compute digit sum of original number
        sumDigits = 0
        temp = num
        WHILE temp > 0:
            sumDigits += temp % 10
            temp = temp / 10
        
        newNum = concatenated * sumDigits
        IF newNum == num:
            BREAK
        num = newNum
    RETURN num
```

---

## 4. Walkthrough

Take `num = 1010`:
1. Digits without zeros: `[1,1]` → `concatenated = 11`.
2. Digit sum: `1+0+1+0 = 2`.
3. New number: `11 * 2 = 22`.
4. Next iteration: removing zeros from `22` yields `22`; digit sum = `4`; `22 * 4 = 88` → continues until a fixed point is reached (implementation stops when `newNum == num`).

---

## 5. Complexity Analysis

- **Time:** Each iteration scans the digits of `num` twice → `O(d)` where `d` is the number of digits. The number of iterations is typically small because the value grows quickly or reaches a cycle.
- **Space:** Only a few integer variables are used → `O(1)`.

---

## 6. Follow-Up Questions

1. How would you detect if the process enters a cycle without storing all previous values?
2. Can the algorithm be optimized for extremely large numbers using string manipulation instead of integer arithmetic?
3. What is the maximum number of iterations possible for a 32‑bit integer input?

---

## Key Takeaway

> By stripping zeros, concatenating the remaining digits, and multiplying by the digit sum, the value quickly converges or cycles; a simple simulation suffices.
