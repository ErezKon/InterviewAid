# 2283. Check if Number Has Equal Digit Count and Digit Value

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-number-has-equal-digit-count-and-digit-value](https://leetcode.com/problems/check-if-number-has-equal-digit-count-and-digit-value)
**Companies:** Google, Jpmorgan

---

## 1. Problem Description

You are given a **0-indexed** string `num` of length `n` consisting of digits.

Return `true` *if for **every** index* `i` *in the range* `0 <= i < n`*, the digit* `i` *occurs* `num[i]` *times in* `num`*, otherwise return* `false`.

**Constraints:**
- `n == num.length`
- `1 <= n <= 10`
- `num` consists of digits.

---

## 2. Examples

```
Example 1:
  Input: num = "1210"
  Output: true
  Explanation:
  num[0] = '1'. The digit 0 occurs once in num.
  num[1] = '2'. The digit 1 occurs twice in num.
  num[2] = '1'. The digit 2 occurs once in num.
  num[3] = '0'. The digit 3 occurs zero times in num.
  The condition holds true for every index in "1210", so return true.
```

```
Example 2:
  Input: num = "030"
  Output: false
  Explanation:
  num[0] = '0'. The digit 0 should occur zero times, but actually occurs twice in num.
  num[1] = '3'. The digit 1 should occur three times, but actually occurs zero times in num.
  num[2] = '0'. The digit 2 occurs zero times in num.
  The indices 0 and 1 both violate the condition, so return false.
```

---

## 3. Approach: Frequency Count — O(n) ✅

```text
FUNCTION digitCount(num):
    freq ← array[10] initialized to 0
    FOR ch IN num:
        digit ← int(ch)
        freq[digit] ← freq[digit] + 1
    FOR i FROM 0 TO len(num) - 1:
        expected ← int(num[i])
        IF freq[i] ≠ expected:
            RETURN false
    RETURN true
```

---

## 4. Walkthrough

Consider **Example 1** (`"1210"`).
| Step | Action | freq after step |
|------|--------|----------------|
| 1 | Count characters: `1→2`, `2→1`, `0→1` | [1,2,1,0,0,0,0,0,0,0] |
| 2 | Verify index 0: expected 1, freq[0]=1 → ok |
| 3 | Verify index 1: expected 2, freq[1]=2 → ok |
| 4 | Verify index 2: expected 1, freq[2]=1 → ok |
| 5 | Verify index 3: expected 0, freq[3]=0 → ok |
All checks pass, return **true**.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) — single pass to count and verify | O(1) — fixed size array of 10 integers |

---

## 6. Follow-Up Questions

1. How would you adapt the solution for Unicode digits beyond `0-9`?
2. Can you solve the problem in a single pass without extra storage?
3. What changes are needed if the input is a list of integers instead of a string?

---

## Key Takeaway

> Count digit frequencies, then verify each position's digit matches the frequency of that index as a digit.
