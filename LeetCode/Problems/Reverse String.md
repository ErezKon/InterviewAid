# 344. Reverse String

**Difficulty:** 🟢 Easy
**Acceptance:** 79.0%
**LeetCode:** [https://leetcode.com/problems/reverse-string](https://leetcode.com/problems/reverse-string)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Epam Systems, Garmin, Goldman Sachs, Google, Hcl, Infosys, Meta, Microsoft, Nvidia, Qualcomm, Tcs

---

## 1. Problem Description

Write a function that reverses a character array in-place with O(1) extra memory.

---

## 2. Approach: Two Pointers — O(n) ✅

```text
FUNCTION reverseString(s):
    left, right ← 0, len(s) - 1
    WHILE left < right:
        // swap characters at both ends
        SET temp ← s[left]
        SET s[left] ← s[right]
        SET s[right] ← temp
        left ← left + 1
        right ← right - 1
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Examples

| Input | Output |
|-------|--------|
| ['h','e','l','l','o'] | ['o','l','l','e','h'] |
| ['H','a','n','n','a','h'] | ['h','a','n','n','a','H'] |

---

## 4. Walkthrough

Consider the array `['h','e','l','l','o']`.
1. Initialize `left = 0`, `right = 4`.
2. Swap `s[0]` and `s[4]` → `['o','e','l','l','h']`.
3. Increment `left` to 1, decrement `right` to 3.
4. Swap `s[1]` and `s[3]` → `['o','l','l','e','h']`.
5. Now `left = 2`, `right = 2`; loop ends.
Result is the reversed array.

---

## 5. Complexity Analysis

- **Time:** Each element is visited at most once, giving O(n) time.
- **Space:** Only a few pointers and a temporary variable are used, so O(1) extra space.

---

## Key Takeaway

> The simplest two-pointer problem. Swap from both ends toward the center.
