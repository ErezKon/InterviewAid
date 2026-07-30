# 2264. Largest 3-Same-Digit Number in String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-3-same-digit-number-in-string](https://leetcode.com/problems/largest-3-same-digit-number-in-string)
**Companies:** Bloomberg, Google, Meta, Opentext, Paypay

---

## 1. Problem Description

Find the largest "good integer" (3 consecutive identical digits) substring. Return `""` if none.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"6777133339"` | `"777"` | The substring `"777"` is the largest good integer. |
| `"2300019"` | `"000"` | `"000"` is the only good integer. |
| `"42352338"` | `""` | No three consecutive identical digits exist.

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