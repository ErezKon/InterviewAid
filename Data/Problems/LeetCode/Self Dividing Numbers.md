# 728. Self Dividing Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/self-dividing-numbers](https://leetcode.com/problems/self-dividing-numbers)
**Companies:** Amazon, Epic Systems, Google, Meta, Microsoft

---

## Problem Description

A **self-dividing number** is divisible by every digit it contains (no zeros allowed). Return all self-dividing numbers in `[left, right]`.

---

## Approach

```text
FUNCTION selfDividingNumbers(left, right):
    FUNCTION isSelfDividing(n):
        // check each digit of n
        FOR d IN str(n):
            IF d == '0' OR n % int(d) != 0:
                RETURN false
        RETURN true

    // collect numbers that satisfy the property
    RETURN [i for i in range(left, right + 1) if isSelfDividing(i)]
```

---

## Examples

| left | right | Output |
|------|-------|--------|
| 1    | 22    | [1,2,3,4,5,6,7,8,9,11,12,15,22] |
| 47   | 85    | [48,55,66,77] |

*Explanation:* For the first example, numbers like 10 are excluded because they contain a zero digit.

---

## Walkthrough

Consider `left = 1, right = 22`:
1. Iterate `i` from 1 to 22.
2. For each `i`, call `isSelfDividing(i)`.
3. `i = 10` → digit `0` found → not self‑dividing.
4. `i = 12` → digits `1` and `2`; 12 % 1 == 0 and 12 % 2 == 0 → include.
5. Continue until 22, collecting all qualifying numbers.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n·d) where d = number of digits of each integer | O(1) extra |

The algorithm checks each digit of every number in the range.

---

## Follow-Up Questions

1. How would you modify the solution to handle very large ranges efficiently?
2. Can you generate self‑dividing numbers without converting numbers to strings?

---

## Key Takeaway

A self‑dividing number must be divisible by each of its non‑zero digits; iterating through the range and checking digits yields a simple O(n·d) solution.
