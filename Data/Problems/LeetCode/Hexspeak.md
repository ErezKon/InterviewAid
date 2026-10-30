# 1271. Hexspeak

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/hexspeak](https://leetcode.com/problems/hexspeak)
**Companies:** Virtu

---

## 1. Problem Description

A decimal number can be converted to its **Hexspeak representation** by first converting it to an uppercase hexadecimal string, then replacing all occurrences of the digit `'0'` with the letter `'O'`, and the digit `'1'` with the letter `'I'`. Such a representation is valid if and only if it consists only of the letters in the set `{'A', 'B', 'C', 'D', 'E', 'F', 'I', 'O'}`.

Given a string `num` representing a decimal integer `n`, *return the **Hexspeak representation** of* `n` *if it is valid, otherwise return* `"ERROR"`.

**Constraints:**
- `1 <= num.length <= 12`
- `num` does not contain leading zeros.
- `num` represents an integer in the range `[1, 10^12]`.

## 2. Approach: Hex Conversion + Replace — O(n) ✅

```text
FUNCTION toHexspeak(numStr):
    // Convert decimal string to integer then to uppercase hex
    hexStr ← uppercase hex(int(numStr))
    // Replace 0→O and 1→I
    hexStr ← hexStr.replace('0', 'O').replace('1', 'I')
    // Validate no remaining digits
    FOR ch IN hexStr:
        IF ch IS DIGIT: RETURN "ERROR"
    RETURN hexStr
```

## 3. Examples

```
Example 1:
  Input: num = "257"
  Output: "IOI"
  Explanation: 257 is 101 in hexadecimal.
```
```
Example 2:
  Input: num = "3"
  Output: "ERROR"
```

## 4. Walkthrough

1. Input "16" → integer 16.
2. Hex of 16 is "10".
3. Replace '1'→'I' and '0'→'O' → "IO".
4. No digits remain, so return "IO".

## 5. Complexity Analysis

- **Time:** O(L) where L is the length of the input string (conversion and replacement).
- **Space:** O(L) for the resulting hex string.

## 6. Follow-Up Questions

- How would you handle extremely large numbers that cannot fit in built‑in integer types?
- Can you perform the conversion without using built‑in base conversion functions?
- How to adapt the algorithm for a different custom digit mapping?

## Key Takeaway

> Convert decimal → hex, replace 0/1 with letters, and ensure no other digits remain.
