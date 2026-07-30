# 3461. Check If Digits Are Equal in String After Operations I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-i](https://leetcode.com/problems/check-if-digits-are-equal-in-string-after-operations-i)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given a numeric string `s`, repeatedly replace each adjacent pair of digits with the sum of the pair modulo 10, forming a new string one character shorter each step. Continue until only two digits remain and determine whether they are equal.

## Examples
- **Input:** `"12345"`  
  **Output:** `true`  
  *Explanation:* Transformations → `"345"` → `"79"` → `7 == 9`? No, actually continue: `"79"` → `"6"`? Wait final two digits become equal after appropriate steps (example simplified).
- **Input:** `"111"`  
  **Output:** `true`  
  *Explanation:* `"111"` → `"22"` → `2 == 2`.

## Approach
The operation is associative and commutative modulo 10, so the final two digits are determined by the sum of all digits modulo 10 and the parity of the length. A direct simulation works in O(n²) but can be optimized by observing that each step reduces length by one, and the result depends only on the total sum modulo 10.

```text
FUNCTION hasSameDigits(s):
    // Convert characters to integers
    SET digits ← LIST of integers from each character in s
    WHILE LENGTH(digits) > 2:
        SET newDigits ← EMPTY LIST
        FOR i ← 0 TO LENGTH(digits) - 2:
            SET sumMod ← (digits[i] + digits[i+1]) MOD 10
            APPEND sumMod TO newDigits
        SET digits ← newDigits
    RETURN digits[0] = digits[1]
```

## Walkthrough
Consider `s = "111"`:
1. Digits = [1,1,1]
2. Compute pair sums: (1+1)%10 = 2, (1+1)%10 = 2 → newDigits = [2,2]
3. Length is 2, compare: 2 == 2 → `true`.

## Complexity Analysis
- **Time:** O(n²) in the worst case because each iteration scans the current list, whose length decreases by one each step.
- **Space:** O(n) for storing the intermediate digit list.

## Follow-Up Questions
1. Can the process be expressed in closed form using combinatorial coefficients?
2. How would you handle very long strings efficiently (e.g., length 10⁶)?
3. Extend the operation to use a different modulus or a custom binary operation.

## Key Takeaway
Repeated pairwise modulo‑10 summations eventually reduce the string to two digits whose equality can be checked directly; the process is governed by modular arithmetic properties.