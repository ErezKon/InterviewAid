# 2231. Largest Number After Digit Swaps by Parity

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity](https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity)
**Companies:** Bloomberg, Google, Ibm, Salesforce, Zscaler

---

## 1. Problem Description

Swap any two digits with the same parity (both even or both odd) any number of times. Return the largest possible number.

---

## 2. Approach: Sort by Parity Group — O(n log n) ✅

```text
FUNCTION largestNumberByParity(num):
    // Convert number to list of digit characters
    digits ← LIST_OF_CHARACTERS(num)
    // Separate even and odd digits
    evens ← FILTER digits WHERE (INTEGER(d) MOD 2) = 0
    odds ← FILTER digits WHERE (INTEGER(d) MOD 2) = 1
    // Sort each group descending to maximize value
    SORT evens DESCENDING
    SORT odds DESCENDING
    // Re‑assemble preserving original parity positions
    result ← []
    evenIdx ← 0
    oddIdx ← 0
    FOR d IN digits:
        IF (INTEGER(d) MOD 2) = 0:
            APPEND evens[evenIdx] TO result
            evenIdx ← evenIdx + 1
        ELSE:
            APPEND odds[oddIdx] TO result
            oddIdx ← oddIdx + 1
    RETURN INTEGER(JOIN(result))
```

---

## Examples

| num | output |
|-----|--------|
| 1234 | 4231 |
| 65875 | 87655 |
| 0 | 0 |

*Explanation*: In the first example, even digits `[2,4]` are sorted to `[4,2]` and placed back into even positions, odd digits `[1,3]` become `[3,1]`, yielding `4231`.

---

## Walkthrough

Take `num = 65875`:
1. Digits list: `[6,5,8,7,5]`.
2. Evens = `[6,8]` → sorted descending `[8,6]`.
3. Odds = `[5,7,5]` → sorted descending `[7,5,5]`.
4. Re‑assemble preserving parity:
   - Position 0 (even) → `8`
   - Position 1 (odd) → `7`
   - Position 2 (even) → `6`
   - Position 3 (odd) → `5`
   - Position 4 (odd) → `5`
5. Resulting number `87655`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n) – sorting each parity group | O(n) – storing groups and result |

---

## Follow-Up Questions

1. How would you solve the problem in O(n) time using counting sort for digits 0‑9?
2. What changes are needed if the parity constraint is replaced by a modulo‑k constraint?
3. Can you extend the approach to maximize the number after a limited number of swaps?

---

## Key Takeaway

> Even digits can be rearranged among even positions, odd among odd positions. Sort each group descending and fill back into their original parity slots.
