# 1542. Find Longest Awesome Substring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-longest-awesome-substring](https://leetcode.com/problems/find-longest-awesome-substring)
**Companies:** Directi

---

## Problem Description

Find the longest substring that can be rearranged into a palindrome (at most one character has odd frequency).

---

## Key Insight

> Use a **bitmask** of 10 bits (digits 0-9) tracking parity of each digit's frequency. A substring is "awesome" if its bitmask is 0 (all even) or has exactly one bit set. Track earliest occurrence of each bitmask.

---

## Approach: Bitmask + HashMap — O(n) ✅

```
FUNCTION longestAwesome(s):
    mask = 0; first = {0: -1}; result = 0
    FOR i, ch IN enumerate(s):
        mask ^= (1 << int(ch))
        // Check all-even
        IF mask IN first: result = MAX(result, i - first[mask])
        // Check one-odd (toggle each bit)
        FOR bit ← 0 TO 9:
            target = mask ^ (1 << bit)
            IF target IN first: result = MAX(result, i - first[target])
        IF mask NOT IN first: first[mask] = i
    RETURN result
```

---

## Key Takeaway

> **Bitmask parity + prefix trick. Palindrome rearrangeable iff ≤ 1 odd-frequency character. Check same mask and all 10 single-bit-flip variants.**
