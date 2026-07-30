# 58. Length of Last Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/length-of-last-word](https://leetcode.com/problems/length-of-last-word)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Qualcomm, Tcs

---

## 1. Problem Description

Return the length of the last word in a string (words separated by spaces).

---

## 2. Examples

| s | expected |
|---|----------|
| "Hello World" | 5 |
| "   fly me   to   the moon  " | 4 |
| "luffy is still joyboy" | 6 |

*Explanation*: Trim trailing spaces, then count characters of the final word.

---

## 3. Approach — O(n) ✅

```text
FUNCTION lengthOfLastWord(s):
    // Remove trailing spaces
    SET i ← length(s) - 1
    WHILE i ≥ 0 AND s[i] == ' ':
        SET i ← i - 1
    // Count characters of last word
    SET length ← 0
    WHILE i ≥ 0 AND s[i] != ' ':
        SET length ← length + 1
        SET i ← i - 1
    RETURN length
```

---

## 4. Walkthrough

Consider `s = "Hello World"`:

1. Start from the end, skip no trailing spaces (`i = 10`).
2. Count characters until a space is hit: `d, l, r, o, W` → length = 5.
3. Stop when space at index 5 is reached. Return 5.

For a string with trailing spaces like `"fly me   "`:

1. Move `i` left past spaces to index of `e`.
2. Count `e, m` → length = 2.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass from the end.
- **Space:** O(1) – only a few integer variables.

---

## 6. Follow-Up Questions

- How would you handle Unicode whitespace characters?
- Could you solve it in a single pass from the start without extra space?
- What if the input were a stream of characters?

---

## 7. Key Takeaway

> Scan from the end, skip trailing spaces, then count until the next space. Simple O(1) space solution.
