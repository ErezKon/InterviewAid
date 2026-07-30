# 2180. Count Integers With Even Digit Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-integers-with-even-digit-sum](https://leetcode.com/problems/count-integers-with-even-digit-sum)
**Companies:** Mindtree

---

## 1. Problem Description

Given a positive integer `num`, count how many integers in `[1, num]` have an even digit sum.

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

| Input | Output | Explanation |
|-------|--------|-------------|
| `7`   | `3`    | Numbers with even digit sum: 2, 4, 6 |
| `10`  | `5`    | Even‑sum numbers: 2,4,6,8,10 |

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
