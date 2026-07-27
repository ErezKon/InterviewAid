# 2810. Faulty Keyboard

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/faulty-keyboard](https://leetcode.com/problems/faulty-keyboard)
**Companies:** Samsung

---

## Problem Description

A faulty keyboard types normally except when `'i'` is pressed — it reverses the entire string typed so far. Given a string `s`, return the final string after processing all characters.

---

## Approach: Simulate — O(n²) or O(n) with Deque ✅

```
FUNCTION finalString(s):
    result = []
    FOR char IN s:
        IF char == 'i':
            result.REVERSE()
        ELSE:
            result.ADD(char)
    RETURN "".JOIN(result)
```

**O(n) optimization:** Use a deque and track direction. Instead of reversing, alternate between appending to front/back and flip a direction flag on each `'i'`.

---

## Key Takeaway

> **Simulate the process. For O(n): use a deque with direction tracking to avoid actual reversals.**
