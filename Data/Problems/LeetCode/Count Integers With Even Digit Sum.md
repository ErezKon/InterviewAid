# 2180. Count Integers With Even Digit Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-integers-with-even-digit-sum](https://leetcode.com/problems/count-integers-with-even-digit-sum)
**Companies:** Mindtree

---

## 1. Problem Description

Given a positive integer `num`, return *the number of positive integers **less than or equal to*** `num` *whose digit sums are **even***.

The **digit sum** of a positive integer is the sum of all its digits.

**Constraints:**
- `1 <= num <= 1000`

---

## 2. Approach: Iterate and Check — O(n × d) ✅

```text
FUNCTION countEven(num):
    // Count numbers with even digit sum up to num
    count ← 0
    FOR i ← 1 TO num:
        digitSum ← 0
        temp ← i
        WHILE temp > 0:
            digitSum ← digitSum + (temp MOD 10)
            temp ← temp DIV 10
        IF digitSum MOD 2 = 0:
            count ← count + 1
    RETURN count
```

Alternatively, O(1) math: roughly half of numbers up to `num` have even digit sum. Check `num`'s own digit sum parity to determine exact count.

```text
FUNCTION countEvenMath(num):
    // Compute parity of digit sum of num
    digitSum ← 0
    temp ← num
    WHILE temp > 0:
        digitSum ← digitSum + (temp MOD 10)
        temp ← temp DIV 10
    IF digitSum MOD 2 = 0:
        RETURN num DIV 2
    ELSE:
        RETURN (num - 1) DIV 2
```

---

## 3. Examples

```
Example 1:
  Input: num = 4
  Output: 2
  Explanation:
  The only integers less than or equal to 4 whose digit sums are even are 2 and 4.
```

```
Example 2:
  Input: num = 30
  Output: 14
  Explanation:
  The 14 integers less than or equal to 30 whose digit sums are even are
  2, 4, 6, 8, 11, 13, 15, 17, 19, 20, 22, 24, 26, and 28.
```

(Note: 10 is not an even‑sum number since 1 + 0 = 1, so num = 10 gives 4: 2, 4, 6, 8.)

---

## 4. Walkthrough

Consider `num = 7` using the O(1) formula:
1. Compute digit sum of 7 → 7 (odd).
2. Since odd, result = `(7 - 1) // 2 = 3`.
3. The three numbers are 2, 4, 6.

---

## 5. Complexity Analysis

- Iterative method: Time `O(num × d)` where `d` is number of digits, Space `O(1)`.
- Mathematical method: Time `O(d)` for digit sum, Space `O(1)`.

---

## 6. Follow-Up Questions

- How would you extend this to count numbers with **odd** digit sum?
- Can you compute the count for a range `[L, R]` efficiently?
- What if the digit sum must be divisible by a given `k`?

---

## Key Takeaway

> Among `[1, num]`, about half have even digit sums. The exact formula depends on the parity of `num`'s own digit sum.
