# 1542. Find Longest Awesome Substring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-longest-awesome-substring](https://leetcode.com/problems/find-longest-awesome-substring)
**Companies:** Directi

---

## Problem Description

Find the longest substring that can be rearranged into a palindrome (at most one character has odd frequency).

---

## Examples

| Input | Output |
|-------|--------|
| `"3242415"` | `5` |
| `"12345678"` | `1` |
| `"213123"` | `6` |

---

## Approach: Bitmask + HashMap — O(n) ✅

```text
FUNCTION longestAwesome(s):
    mask ← 0
    first ← MAP{0: -1}
    result ← 0
    FOR i, ch IN ENUMERATE(s):
        mask ← mask XOR (1 LEFT_SHIFT int(ch))
        // All even frequencies
        IF mask IN first:
            result ← MAX(result, i - first[mask])
        // Exactly one odd frequency
        FOR bit ← 0 TO 9:
            target ← mask XOR (1 LEFT_SHIFT bit)
            IF target IN first:
                result ← MAX(result, i - first[target])
        IF mask NOT IN first:
            first[mask] ← i
    RETURN result
```

---

## Walkthrough

Consider `s = "3242415"`.

1. Start with `mask = 0`, `first = {0: -1}`.
2. Process `'3'` (digit 3): toggle bit 3 → `mask = 1000b`. No previous occurrence, store `first[mask]=0`.
3. Process `'2'`: toggle bit 2 → `mask = 1100b`. Store `first[mask]=1`.
4. Process `'4'`: toggle bit 4 → `mask = 11100b`. Store `first[mask]=2`.
5. Process `'2'` again: toggle bit 2 → `mask = 10100b`. `mask` seen at index 1, length = `3-1 = 2`.
6. Process `'4'` again: toggle bit 4 → `mask = 00100b`. `mask` seen at index 2, length = `4-2 = 2`.
7. Process `'1'`: toggle bit 1 → `mask = 01100b`. Not seen, store `first[mask]=5`.
8. Process `'5'`: toggle bit 5 → `mask = 111100b`. Not seen, store `first[mask]=6`.

During each step we also check all single‑bit flips of `mask` to capture substrings with exactly one odd count. The maximum length found is `5` (substring `"32424"`).

---

## Complexity Analysis

- **Time:** O(N × 10) → O(N) where N is the length of the string (constant factor 10 for bit flips).
- **Space:** O(N) for the hashmap storing first occurrence of each bitmask (at most N+1 entries).

---

## Follow‑Up Questions

1. How would the solution change if the string contained lowercase letters a‑z instead of digits?
2. Can you adapt the algorithm to return the actual substring, not just its length?
3. What is the impact on performance if the alphabet size grows significantly?

---

## Key Takeaway

> **Bitmask parity + prefix trick. Palindrome rearrangeable iff ≤ 1 odd‑frequency character. Check same mask and all single‑bit‑flip variants.**