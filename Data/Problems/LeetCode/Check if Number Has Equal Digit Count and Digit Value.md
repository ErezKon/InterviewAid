# 2283. Check if Number Has Equal Digit Count and Digit Value

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-number-has-equal-digit-count-and-digit-value](https://leetcode.com/problems/check-if-number-has-equal-digit-count-and-digit-value)
**Companies:** Google, Jpmorgan

---

## 1. Problem Description

Given a string `num` of length `n`, check if for every index `i`, the digit `num[i]` equals the count of times digit `i` appears in `num`.

---

## 2. Examples

**Example 1:**
```
num = "1210"
Output: true
```
*Explanation:* Digit 0 appears 1 time, digit 1 appears 2 times, digit 2 appears 1 time, digit 3 appears 0 times.

**Example 2:**
```
num = "030"
Output: false
```
*Explanation:* At index 0 the digit is 0 but digit 0 appears 2 times.

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

Consider **Example 1** (`"1210"`).
| Step | Action | freq after step |
|------|--------|----------------|
| 1 | Count characters: `1→2`, `2→1`, `0→1` | [1,2,1,0,0,0,0,0,0,0] |
| 2 | Verify index 0: expected 1, freq[0]=1 → ok |
| 3 | Verify index 1: expected 2, freq[1]=2 → ok |
| 4 | Verify index 2: expected 1, freq[2]=1 → ok |
| 5 | Verify index 3: expected 0, freq[3]=0 → ok |
All checks pass, return **true**.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) — single pass to count and verify | O(1) — fixed size array of 10 integers |

---

## 6. Follow‑Up Questions

1. How would you adapt the solution for Unicode digits beyond `0‑9`?
2. Can you solve the problem in a single pass without extra storage?
3. What changes are needed if the input is a list of integers instead of a string?

---

## Key Takeaway

> Count digit frequencies, then verify each position's digit matches the frequency of that index as a digit.
