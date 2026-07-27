# 2138. Divide a String Into Groups of Size k

**Difficulty:** 🟢 Easy
**Companies:** Bloomberg, Canonical, Google

---

## Problem Description

Divide string `s` into groups of size `k`. If the last group is shorter, pad with `fill` character.

---

## Approach: Pad and Slice ✅

```
FUNCTION divideString(s, k, fill):
    WHILE len(s) % k != 0: s += fill
    RETURN [s[i:i+k] for i in range(0, len(s), k)]
```

---

## Key Takeaway

> **Pad the string to make its length divisible by k, then slice into chunks.**
