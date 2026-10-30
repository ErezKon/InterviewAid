# 2264. Largest 3-Same-Digit Number in String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-3-same-digit-number-in-string](https://leetcode.com/problems/largest-3-same-digit-number-in-string)
**Companies:** Bloomberg, Google, Meta, Opentext, Paypay

---

## 1. Problem Description

You are given a string `num` representing a large integer. An integer is **good** if it meets the following conditions:

- It is a **substring** of `num` with length `3`.
- It consists of only one unique digit.

Return *the **maximum good** integer as a **string** or an empty string* `""` *if no such integer exists*.

Note:
- A **substring** is a contiguous sequence of characters within a string.
- There may be **leading zeroes** in `num` or a good integer.

**Constraints:**
- `3 <= num.length <= 1000`
- `num` only consists of digits.

---

## 2. Examples

```
Example 1:
  Input: num = "6777133339"
  Output: "777"
  Explanation: There are two distinct good integers: "777" and "333".
  "777" is the largest, so we return "777".
```

```
Example 2:
  Input: num = "2300019"
  Output: "000"
  Explanation: "000" is the only good integer.
```

```
Example 3:
  Input: num = "42352338"
  Output: ""
  Explanation: No substring of length 3 consists of only one unique digit. Therefore, there are no good integers.
```

---

## 3. Approach — O(n) ✅

```text
FUNCTION largestGoodInteger(num):
    // iterate from highest digit to lowest
    FOR d IN '9876543210':
        SET candidate ← d + d + d
        IF candidate IS SUBSTRING OF num:
            RETURN candidate
    RETURN ""
```

---

## 4. Walkthrough

**Example:** `"6777133339"`

1. Start with digit `'9'`. `"999"` not in string.
2. Check `'8'`. `"888"` not in string.
3. Continue until `'7'`. `"777"` **is** a substring → return `"777"`.
4. No further checks needed because we iterate from highest to lowest.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(10·n) = O(n) | O(1) |

---

## 6. Follow-Up Questions

- How would you modify the algorithm to find the largest good integer of length *k*?
- Can you solve the problem in a single pass without checking each digit separately?
- What if the input string is extremely large and cannot fit into memory?

---

## 7. Key Takeaway

> Checking digits from `'9'` down to `'0'` guarantees the first match is the largest possible good integer, and only ten checks are needed regardless of string length.