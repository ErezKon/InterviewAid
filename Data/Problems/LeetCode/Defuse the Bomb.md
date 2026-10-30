# 1652. Defuse the Bomb

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/defuse-the-bomb](https://leetcode.com/problems/defuse-the-bomb)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

You have a bomb to defuse, and your time is running out! Your informer will provide you with a **circular** array `code` of length of `n` and a key `k`.

To decrypt the code, you must replace every number. All the numbers are replaced **simultaneously**.

- If `k > 0`, replace the `i^th` number with the sum of the **next** `k` numbers.
- If `k < 0`, replace the `i^th` number with the sum of the **previous** -`k` numbers.
- If `k == 0`, replace the `i^th` number with `0`.

As `code` is circular, the next element of `code[n-1]` is `code[0]`, and the previous element of `code[0]` is `code[n-1]`.

Given the **circular** array `code` and an integer key `k`, return *the decrypted code to defuse the bomb*!

**Constraints:**
- `n == code.length`
- `1 <= n <= 100`
- `1 <= code[i] <= 100`
- `-(n - 1) <= k <= n - 1`

---

## Approach

```
FUNCTION decrypt(code, k):
    n = len(code)
    result = [0] * n
    IF k == 0: RETURN result

    FOR i ← 0 TO n - 1:
        IF k > 0:
            result[i] = SUM(code[(i+j) % n] for j in range(1, k+1))
        ELSE:
            result[i] = SUM(code[(i+j) % n] for j in range(k, 0))

    RETURN result
```

---

## Examples

**Example 1:**
```
Input: code = [5,7,1,4], k = 3
Output: [12,10,16,13]
Explanation: Each number is replaced by the sum of the next 3 numbers. The decrypted code is [7+1+4, 1+4+5, 4+5+7, 5+7+1]. Notice that the numbers wrap around.
```

**Example 2:**
```
Input: code = [1,2,3,4], k = 0
Output: [0,0,0,0]
Explanation: When k is zero, the numbers are replaced by 0.
```

**Example 3:**
```
Input: code = [2,4,9,3], k = -2
Output: [12,5,6,13]
Explanation: The decrypted code is [3+9, 2+3, 4+2, 9+4]. Notice that the numbers wrap around again. If k is negative, the sum is of the previous numbers.
```

---

## Walkthrough

1. **First example** `code = [5,7,1,4]`, `k = 3`.
2. For index `0`, sum next three elements: `7 + 1 + 4 = 12` → `result[0] = 12`.
3. For index `1`, sum `1 + 4 + 5 = 10` (wrap around) → `result[1] = 10`.
4. Continue similarly for indices `2` and `3` to obtain `[12,10,16,13]`.
5. When `k = 0`, every element becomes `0`.
6. When `k = -2`, sum the two previous elements using modular indexing.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × |k|) naïve, O(n) with sliding window |
| **Space** | O(n) |

---

## Follow-Up Questions

- How would you modify the algorithm to handle very large `k` values efficiently?
- Can you solve the problem in-place without extra output array?

---

## Key Takeaway

> **Circular array sum: use modular indexing `(i+j) % n`. Optimize from O(nk) to O(n) with a sliding window that adds/removes one element per shift.**