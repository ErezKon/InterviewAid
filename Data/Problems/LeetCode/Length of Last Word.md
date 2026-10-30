# 58. Length of Last Word

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/length-of-last-word](https://leetcode.com/problems/length-of-last-word)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Qualcomm, Tcs

---

## 1. Problem Description

Given a string `s` consisting of words and spaces, return *the length of the **last** word in the string.*

A **word** is a maximal substring consisting of non-space characters only.

**Constraints:**
- `1 <= s.length <= 10^4`
- `s` consists of only English letters and spaces `' '`.
- There will be at least one word in `s`.

---

## 2. Examples

```
Example 1:
  Input: s = "Hello World"
  Output: 5
  Explanation: The last word is "World" with length 5.
```

```
Example 2:
  Input: s = "   fly me   to   the moon  "
  Output: 4
  Explanation: The last word is "moon" with length 4.
```

```
Example 3:
  Input: s = "luffy is still joyboy"
  Output: 6
  Explanation: The last word is "joyboy" with length 6.
```

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
