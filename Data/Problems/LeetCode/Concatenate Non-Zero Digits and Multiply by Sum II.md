# 3756. Concatenate Non-Zero Digits and Multiply by Sum II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-ii)
**Companies:** Google

---

## 1. Problem Description

You are given a string `s` of length `m` consisting of digits. You are also given a 2D integer array `queries`, where `queries[i] = [li, ri]`.

For each `queries[i]`, extract the **substring** `s[li..ri]`. Then, perform the following:

- Form a new integer `x` by concatenating all the **non-zero digits** from the substring in their original order. If there are no non-zero digits, `x = 0`.
- Let `sum` be the **sum of digits** in `x`. The answer is `x * sum`.

Return an array of integers `answer` where `answer[i]` is the answer to the `i`-th query.

Since the answers may be very large, return them **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= m == s.length <= 10^5`
- `s` consists of digits only.
- `1 <= queries.length <= 10^5`
- `queries[i] = [li, ri]`
- `0 <= li <= ri < m`

---

## 2. Examples

```
Example 1:
  Input: s = "10203004", queries = [[0,7],[1,3],[4,6]]
  Output: [12340, 4, 9]
  Explanation:
    s[0..7] = "10203004"
      x = 1234
      sum = 1 + 2 + 3 + 4 = 10
      Therefore, answer is 1234 * 10 = 12340.
    s[1..3] = "020"
      x = 2
      sum = 2
      Therefore, the answer is 2 * 2 = 4.
    s[4..6] = "300"
      x = 3
      sum = 3
      Therefore, the answer is 3 * 3 = 9.
```
```
Example 2:
  Input: s = "1000", queries = [[0,3],[1,1]]
  Output: [1, 0]
  Explanation:
    s[0..3] = "1000"
      x = 1
      sum = 1
      Therefore, the answer is 1 * 1 = 1.
    s[1..1] = "0"
      x = 0
      sum = 0
      Therefore, the answer is 0 * 0 = 0.
```
```
Example 3:
  Input: s = "9876543210", queries = [[0,9]]
  Output: [444444137]
  Explanation:
    s[0..9] = "9876543210"
      x = 987654321
      sum = 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 45
      Therefore, the answer is 987654321 * 45 = 44444444445.
      We return 44444444445 modulo (10^9 + 7) = 444444137.
```

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
