# 1056. Confusing Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/confusing-number](https://leetcode.com/problems/confusing-number)
**Companies:** Google

---

## 1. Problem Description

A **confusing number** is a number that when rotated `180` degrees becomes a different number with **each digit valid**.

We can rotate digits of a number by `180` degrees to form new digits.

- When `0`, `1`, `6`, `8`, and `9` are rotated `180` degrees, they become `0`, `1`, `9`, `8`, and `6` respectively.
- When `2`, `3`, `4`, `5`, and `7` are rotated `180` degrees, they become **invalid**.

Note that after rotating a number, we can ignore leading zeros.

- For example, after rotating `8000`, we have `0008` which is considered as just `8`.

Given an integer `n`, return `true` *if it is a **confusing number**, or* `false` *otherwise*.

**Constraints:**
- `0 <= n <= 10^9`

---

## 2. Approach: Rotate and Compare — O(d) ✅

```text
FUNCTION confusingNumber(n):
    rotateMap ← {0:0, 1:1, 6:9, 8:8, 9:6}
    original ← n
    rotated ← 0
    WHILE n > 0:
        digit ← n % 10
        IF digit NOT IN rotateMap:
            RETURN false
        rotated ← rotated * 10 + rotateMap[digit]
        n ← n // 10
    RETURN rotated ≠ original
```

| Time | Space |
|------|-------|
| O(d) where d = number of digits | O(1) |

---

## Examples

```
Example 1:
  Input: n = 6
  Output: true
  Explanation: We get 9 after rotating 6, 9 is a valid number, and 9 != 6.
```
```
Example 2:
  Input: n = 89
  Output: true
  Explanation: We get 68 after rotating 89, 68 is a valid number and 68 != 89.
```
```
Example 3:
  Input: n = 11
  Output: false
  Explanation: We get 11 after rotating 11, 11 is a valid number but the value remains the same, thus 11 is not a confusing number
```

---

## Walkthrough

Take `n = 69`.

| Step | n (remaining) | digit | rotated (so far) |
|------|---------------|-------|------------------|
| 1    | 69            | 9     | 6                |
| 2    | 6             | 6     | 69               |

After processing all digits, `rotated = 69` which equals original, so not confusing.

---

## Complexity Analysis

- **Time:** O(d) – each digit processed once.
- **Space:** O(1) – only constant extra variables.

---

## Follow-Up Questions

- How would you extend this to count all confusing numbers up to `n`?
- Can you modify the algorithm to handle a custom rotation mapping?
- What is the impact on complexity if the input size is extremely large (e.g., up to 10^18)?

---

## Key Takeaway

> Build the rotated number by reversing digits with the rotation map. It's confusing only if the result differs from the original.
