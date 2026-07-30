# 1271. Hexspeak

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/hexspeak](https://leetcode.com/problems/hexspeak)
**Companies:** Virtu

---

## 1. Problem Description

Convert a decimal string to a hexadecimal representation, then replace every '0' with 'O' and every '1' with 'I'. If any other digit (2‑9) appears after conversion, return "ERROR".

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

| Input | Output |
|-------|--------|
| "257" | "ERROR" |
| "3"   | "3" |
| "15"  | "F" |
| "16"  | "10" → "IO" |

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
