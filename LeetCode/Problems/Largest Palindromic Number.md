# 2384. Largest Palindromic Number

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Geico, Microsoft

---

## 1. Problem Description

Given a string of digits, return the largest palindromic number (as a string) using a subset of the digits. No leading zeros (except "0" itself).

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| "444947137" | "744447447" | Use digits to form the largest palindrome, placing the highest odd digit "7" in the middle. |
| "00009" | "9" | Leading zeros are removed; the single digit "9" forms the palindrome. |
| "0000" | "0" | All zeros collapse to a single "0".

---

## 3. Approach: Greedy + Counter — O(n) ✅

```text
FUNCTION largestPalindromic(num):
    // Count frequency of each digit
    SET count ← Counter(num)
    SET half ← []
    SET mid ← ''
    // Build left half from highest digit to lowest
    FOR d ← 9 DOWN TO 0:
        SET pairCount ← count[str(d)] // 2
        APPEND [str(d)] * pairCount TO half
        IF count[str(d)] % 2 = 1 AND (mid = '' OR str(d) > mid):
            SET mid ← str(d)
    SET halfStr ← JOIN(half)
    // Remove leading zeros from the left half
    SET halfStr ← halfStr.lstrip('0')
    IF halfStr = '' AND mid = '':
        RETURN '0'
    RETURN halfStr + mid + REVERSE(halfStr)
```

---

## 4. Walkthrough

Consider the input "444947137":

1. Count digits → {"0":0, "1":1, "3":1, "4":4, "7":2, "9":1}.
2. Iterate from 9 to 0:
   - 9: one occurrence → mid = "9".
   - 7: two occurrences → add one "7" to half.
   - 4: four occurrences → add two "4"s to half.
   - 1 & 3: single occurrences, ignored for half.
3. half = ["7", "4", "4"] → halfStr = "744".
4. Remove leading zeros (none).
5. Result = "744" + "9" + REVERSE("744") = "7449 447" → "744447447".

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) where n is length of input string | O(1) extra (fixed size counter for 10 digits) |

---

## 6. Follow-Up Questions

- How would you modify the algorithm to return the *k*‑th largest palindromic number?
- Can the solution be adapted to work with alphanumeric characters?
- What changes are needed if the palindrome must use **all** digits exactly once?

---

## Key Takeaway

> Build the left half greedily from the highest digits using pairs, place the largest odd‑count digit in the middle, and strip leading zeros to obtain the maximal palindrome.
